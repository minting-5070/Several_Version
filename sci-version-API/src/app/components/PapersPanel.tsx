'use client';

import { useMemo } from 'react';
import type { Message } from 'ai/react';

type Paper = {
  index: number;
  title: string;
  authors?: string;
  venue?: string;
  link?: string;
  abstract?: string;
  relevance?: string;
  extra?: string;
};

type Props = {
  messages: Message[];
};

function extractLatestAssistantContent(messages: Message[]): string | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const m = messages[i];
    if (m.role === 'assistant' && typeof m.content === 'string' && m.content.trim().length > 0) {
      return m.content;
    }
  }
  return null;
}

function safeHostname(url?: string) {
  if (!url) return undefined;
  try { return new URL(url).hostname; } catch { return undefined; }
}

function sanitizeAbstractText(text?: string): string {
  if (!text) return '';
  let t = text;
  // Remove markdown links but keep the label
  t = t.replace(/\[([^\]]+)\]\((?:https?:\/\/|www\.)[^)]+\)/gi, '$1');
  // Remove naked URLs
  t = t.replace(/https?:\/\/[^\s)]+/gi, '');
  t = t.replace(/\bwww\.[^\s)]+/gi, '');
  // Remove domain-only parentheses like (arxiv.org/...) (doi.org/...)
  t = t.replace(/\((?:arxiv\.org|doi\.org|ieee\.org|acm\.org|nature\.com|science\.org|springer\.com|wiley\.com|elsevier\.com|medrxiv\.org|biorxiv\.org|pnas\.org)[^)]*\)/gi, '');
  // Collapse extra spaces/line breaks
  t = t.replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
  return t;
}

function trimToBulletSection(text?: string): string | undefined {
  if (!text) return undefined;
  const lines = text.split('\n');
  const kept: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (line === '' || line.startsWith('•') || line.startsWith('-')) {
      kept.push(raw);
      continue;
    }
    // Stop at the first non-bullet line to avoid trailing chat-like prose
    break;
  }
  return kept.join('\n').trim();
}

function parsePapersFromContent(content: string): Paper[] {
  // Find the Supporting Research Papers section.
  const markers = [
    '## 📚 **Supporting Research Papers**',
    '## 📚 Supporting Research Papers',
    '## Supporting Research Papers'
  ];
  let idx = -1;
  for (const m of markers) {
    const i = content.indexOf(m);
    if (i !== -1) {
      idx = i;
      break;
    }
  }
  if (idx === -1) return [];

  let section = content.slice(idx);
  // If there is another top-level heading after this section, cut there.
  const nextIdx = section.indexOf('\n## ');
  if (nextIdx > 0) section = section.slice(0, nextIdx);

  // Build blocks only for headings that contain a numeric [N] marker (our cards)
  const lines = section.split('\n');
  const starts: number[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.startsWith('###')) continue;
    // Only accept headings that contain [number]
    const hasIndex = /\[(\d{1,2})\]/.test(line);
    if (hasIndex) starts.push(i);
  }
  if (starts.length === 0) return [];

  const ranges: { s: number; e: number }[] = [];
  for (let i = 0; i < starts.length; i += 1) {
    const s = starts[i];
    const e = i + 1 < starts.length ? starts[i + 1] : lines.length;
    ranges.push({ s, e });
  }

  const papers: Paper[] = [];
  for (const r of ranges) {
    const block = lines.slice(r.s, r.e).join('\n').trim();
    const heading = lines[r.s];

    // Extract index and title from heading. Support bold/non-bold.
    let index = 0;
    const idxMatch = heading.match(/\[(\d{1,2})\]/);
    if (idxMatch) index = Number(idxMatch[1]);

    let title = '';
    const boldTitleMatch = heading.match(/\]\s*\*\*(.*?)\*\*\s*$/);
    if (boldTitleMatch) title = boldTitleMatch[1].trim();
    if (!title) {
      const plainTitleMatch = heading.match(/\]\s*(.*)$/);
      if (plainTitleMatch) title = plainTitleMatch[1].trim();
    }

    const authorsMatch = block.match(/\*\*Authors:\*\*\s*(.*)/);
    const venueMatch = block.match(/\*\*Year\/Journal:\*\*\s*(.*)/);
    const linkMatch = block.match(/\*\*Link:\*\*\s*([^\s\n]+)/);

    const abstractMatch = block.match(/####\s*[^\n]*Abstract[^\n]*\n([\s\S]*?)(?=\n####|$)/i);
    const relevanceMatch = block.match(/####\s*[^\n]*Relevance[^\n]*\n([\s\S]*?)(?=\n####|$)/i);
    const extraMatch = block.match(/####\s*[^\n]*Lower[^\n]*\n([\s\S]*?)(?=\n####|$)/i);

    const link = linkMatch?.[1]?.trim();
    if (!title || title.toLowerCase() === 'untitled') {
      const host = safeHostname(link);
      title = host ? `(${host})` : 'Unknown';
    }

    papers.push({
      index: index || papers.length + 1,
      title,
      authors: authorsMatch?.[1]?.trim(),
      venue: venueMatch?.[1]?.trim(),
      link,
      abstract: abstractMatch?.[1]?.trim(),
      relevance: trimToBulletSection(relevanceMatch?.[1]?.trim()),
      extra: trimToBulletSection(extraMatch?.[1]?.trim()),
    });
  }

  // Sort and cap to 10
  return papers.sort((a, b) => a.index - b.index).slice(0, 10);
}

export default function PapersPanel({ messages }: Props) {

  const papers = useMemo(() => {
    const last = extractLatestAssistantContent(messages);
    if (!last) return [];
    return parsePapersFromContent(last);
  }, [messages]);

  return (
    <aside className="w-full md:sticky md:top-20 self-start">
      <div className="border border-border rounded-2xl bg-background shadow-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-primary/10 text-primary font-semibold">
          Supporting Research Papers {papers.length > 0 ? `(${papers.length})` : ''}
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto">
          {papers.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              When the assistant lists 10 papers, they will appear here.
            </div>
          ) : (
            <table className="w-full min-w-[900px] border-collapse table-fixed">
              <thead>
                <tr className="bg-muted/30 sticky top-0 z-10">
                  <th className="text-left px-3 py-2 border-b border-border w-[40%]">Paper</th>
                  <th className="text-left px-3 py-2 border-b border-border w-[35%]">Abstract</th>
                  <th className="text-left px-3 py-2 border-b border-border w-[25%]">Relevant Point</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((p) => (
                  <tr key={`row-${p.index}`} className="hover:bg-muted/20 align-top">
                    <td className="align-top px-3 py-2 border-b border-border">
                      <div className="text-foreground font-medium">
                        {p.link ? (
                          <a
                            className="hover:text-primary underline decoration-transparent hover:decoration-inherit"
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-muted-foreground mr-2">{p.index}.</span>
                            {p.title}
                          </a>
                        ) : (
                          <>
                            <span className="text-muted-foreground mr-2">{p.index}.</span>
                            {p.title}
                          </>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 truncate">{p.authors || '-'}</div>
                      <div className="text-sm text-muted-foreground">{p.venue || '-'}</div>
                      <div className="text-sm mt-1">
                        {p.link ? (
                          <a
                            className="text-blue-400 hover:text-blue-300 underline break-all"
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Link
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="align-top px-3 py-2 border-b border-border text-sm text-foreground whitespace-pre-wrap">
                      {sanitizeAbstractText(p.abstract) || '-'}
                    </td>
                    <td className="align-top px-3 py-2 border-b border-border text-sm text-foreground whitespace-pre-wrap">
                      {p.relevance || p.extra ? (
                        <div className="space-y-2">
                          {p.relevance && (
                            <div>
                              <div className="font-semibold text-primary mb-1">Relevance</div>
                              <div>{p.relevance}</div>
                            </div>
                          )}
                          {p.extra && (
                            <div>
                              <div className="font-semibold text-primary mb-1">Limitation</div>
                              <div>{p.extra}</div>
                            </div>
                          )}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </aside>
  );
}


