'use client';

import { useEffect, useMemo, useState } from 'react';
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

type PaperRecordDto = {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  link: string;
  abstract: string;
};

type Props = {
  messages: Message[];
  /** When true, skip DB fallback fetch (streaming in progress). */
  isLoading?: boolean;
};

function splitSentences(text: string): string[] {
  const t = text.replace(/\s+/g, ' ').trim();
  if (!t) return [];
  // Simple heuristic: split on sentence-ending punctuation.
  const parts = t.split(/(?<=[.!?])\s+/g).map((s) => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [t];
}

function looksLikeBibliographicCitation(s: string): boolean {
  const t = s.trim();
  if (t.length < 25) return false;
  if (/^(We |This |I |The |Our |Here |Problem |Generative |Artificial |Voluntary |Emerging |Owing |Since |I study |Large |Abstract:?)/i.test(t)) {
    return false;
  }
  if (/^Problem definition:/i.test(t)) return false;
  return /^[A-Z][a-zA-Z\-]+,\s+[A-Z]\./.test(t) && /\(\d{4}\)/.test(t) && t.length < 480;
}

function summarizeAbstract23(text?: string): string {
  const cleaned = sanitizeAbstractText(text);
  if (!cleaned) return '';
  if (looksLikeBibliographicCitation(cleaned)) return '';
  const sentences = splitSentences(cleaned);
  const take = Math.min(3, Math.max(2, sentences.length));
  const summary = sentences.slice(0, take).join(' ');
  // Guard against extremely long “sentences” (no punctuation).
  return summary.length > 520 ? summary.slice(0, 520).trimEnd() + '…' : summary;
}

function buildLimitation(p: { venue?: string; link?: string; abstract?: string }): string {
  const venue = (p.venue || '').toLowerCase();
  const link = (p.link || '').toLowerCase();
  const bullets: string[] = [];

  if (link.includes('arxiv.org') || venue.includes('arxiv')) {
    bullets.push('• Preprint (arXiv): may not be peer‑reviewed yet.');
  } else if (link.includes('ssrn.com') || venue.includes('ssrn')) {
    bullets.push('• Working paper (SSRN): may be preliminary / not peer‑reviewed.');
  } else if (venue.includes('available at')) {
    bullets.push('• Availability note suggests it may be a working paper; verify publication status.');
  }

  if ((p.abstract || '').trim().length > 0) {
    bullets.push('• Based on abstract only: methods, sample, and limitations may differ in full text.');
  } else {
    bullets.push('• Abstract unavailable: verify methods/limitations from the full paper.');
  }

  // Always return at least one bullet, and keep it short.
  return bullets.slice(0, 2).join('\n');
}

function messageContentToString(m: Message): string | null {
  const c = m.content as unknown;
  if (typeof c === 'string' && c.trim().length > 0) return c;
  if (Array.isArray(c)) {
    const parts: string[] = [];
    for (const part of c) {
      if (typeof part === 'string') parts.push(part);
      else if (
        part &&
        typeof part === 'object' &&
        'text' in part &&
        typeof (part as { text?: string }).text === 'string'
      ) {
        parts.push((part as { text: string }).text);
      }
    }
    const joined = parts.join('\n').trim();
    return joined.length > 0 ? joined : null;
  }
  return null;
}

function extractLatestAssistantContent(messages: Message[]): string | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const m = messages[i];
    if (m.role !== 'assistant') continue;
    const text = messageContentToString(m);
    if (text) return text;
  }
  return null;
}

/** Avoid parsing streaming partials — right-hand table updates once when generation finishes. */
function assistantContentForPaperTable(messages: Message[], isLoading: boolean): string | null {
  if (!isLoading) {
    return extractLatestAssistantContent(messages);
  }
  const last = messages[messages.length - 1];
  if (last?.role === 'assistant') {
    return null;
  }
  return extractLatestAssistantContent(messages);
}

/** User message that prompted the latest non-empty assistant reply. */
function queryForLatestAssistantTurn(messages: Message[]): string {
  let lastAssistantIdx = -1;
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role !== 'assistant') continue;
    const t = messageContentToString(messages[i]);
    if (t) {
      lastAssistantIdx = i;
      break;
    }
  }
  if (lastAssistantIdx < 0) return '';
  for (let i = lastAssistantIdx - 1; i >= 0; i -= 1) {
    if (messages[i].role !== 'user') continue;
    const q = messageContentToString(messages[i]);
    return (q || '').trim();
  }
  return '';
}

function recordsToTablePapers(records: PaperRecordDto[]): Paper[] {
  return records.slice(0, 10).map((p, i) => ({
    index: i + 1,
    title: p.title,
    authors: p.authors,
    venue: `${p.year} • ${p.journal}`,
    link: p.link,
    abstract: summarizeAbstract23(p.abstract),
    relevance:
      '• The model reply had no parseable 10-paper card block. These rows are the same top-10 candidates ranked for your question (identical logic to the chat API).',
    extra: buildLimitation({ venue: `${p.year} • ${p.journal}`, link: p.link, abstract: p.abstract }),
  }));
}

function safeHostname(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

function sanitizeAbstractText(text?: string): string {
  if (!text) return '';
  let t = text;
  t = t.replace(/\[([^\]]+)\]\((?:https?:\/\/|www\.)[^)]+\)/gi, '$1');
  t = t.replace(/https?:\/\/[^\s)]+/gi, '');
  t = t.replace(/\bwww\.[^\s)]+/gi, '');
  t = t.replace(
    /\((?:arxiv\.org|doi\.org|ieee\.org|acm\.org|nature\.com|science\.org|springer\.com|wiley\.com|elsevier\.com|medrxiv\.org|biorxiv\.org|pnas\.org)[^)]*\)/gi,
    ''
  );
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
    break;
  }
  return kept.join('\n').trim();
}

function parsePapersFromContent(raw: string): Paper[] {
  const content = raw
    .replace(/\r\n/g, '\n')
    .replace(/[\uFF08\uFF09]/g, (ch) => (ch === '\uFF08' ? '(' : ')'))
    .replace(
      /[\uFF3B\uFF3D\u3010\u3011]/g,
      (ch) => ({ '\uFF3B': '[', '\uFF3D': ']', '\u3010': '[', '\u3011': ']' }[ch] || ch)
    )
    .replace(/[\uFF10-\uFF19]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xff10 + 0x30));

  const markers = [
    '## 📚 **Supporting Research Papers**',
    '## 📚 Supporting Research Papers',
    '## Supporting Research Papers',
    '## 📚 **Supporting Research Papers (10)**',
    '## 📚 Supporting Research Papers (10)',
    '### 📚 **Supporting Research Papers**',
  ];
  let idx = -1;
  for (const m of markers) {
    const i = content.indexOf(m);
    if (i !== -1) {
      idx = i;
      break;
    }
  }
  if (idx === -1) {
    const fuzzy = content.match(
      /^#{2,3}\s*(?:📚\s*)?(?:\*\*)?\s*Supporting Research Papers(?:\s*\(\s*10\s*\))?(?:\*\*)?/im
    );
    if (fuzzy?.index !== undefined) idx = fuzzy.index;
  }
  const hasExplicitSection = idx !== -1;

  let section = hasExplicitSection ? content.slice(idx) : content;
  if (hasExplicitSection) {
    const nextIdx = section.indexOf('\n## ');
    if (nextIdx > 0) section = section.slice(0, nextIdx);
  }

  const lines = section.split('\n');
  const starts: number[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trimStart();
    if (!/^#{3,6}\s/.test(line)) continue;
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
    const heading = lines[r.s].trim();

    let index = 0;
    const idxMatch = heading.match(/\[(\d{1,2})\]/);
    if (idxMatch) index = Number(idxMatch[1]);

    let title = '';
    const cardHeading =
      /^###\s*(?:📄\s*)?\*\*\[(\d{1,2})\]\s*(.+?)\*\*\s*$/i.exec(heading.trim());
    if (cardHeading) title = cardHeading[2].trim();
    if (!title) {
      const boldTitleMatch = heading.match(/\]\s*\*\*(.*?)\*\*\s*$/);
      if (boldTitleMatch) title = boldTitleMatch[1].trim();
    }
    if (!title) {
      const plainTitleMatch = heading.match(/\]\s*(.*)$/);
      if (plainTitleMatch) title = plainTitleMatch[1].replace(/\*+$/, '').trim();
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

  return papers.sort((a, b) => a.index - b.index).slice(0, 10);
}

export default function PapersPanel({ messages, isLoading = false }: Props) {
  const parsedPapers = useMemo(() => {
    const last = assistantContentForPaperTable(messages, isLoading);
    if (!last) return [];
    return parsePapersFromContent(last);
  }, [messages, isLoading]);

  const pairQuery = useMemo(() => queryForLatestAssistantTurn(messages), [messages]);

  const [fallbackPapers, setFallbackPapers] = useState<Paper[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (isLoading) {
      return () => {
        cancelled = true;
      };
    }

    if (parsedPapers.length > 0) {
      setFallbackPapers(null);
      return () => {
        cancelled = true;
      };
    }

    const q = pairQuery.trim();
    if (!q) {
      setFallbackPapers(null);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        const res = await fetch('/api/paper-candidates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q }),
        });
        if (!res.ok) {
          if (!cancelled) setFallbackPapers(null);
          return;
        }
        const data = (await res.json()) as { papers?: PaperRecordDto[] };
        const rows = Array.isArray(data.papers) ? data.papers : [];
        if (!cancelled) setFallbackPapers(rows.length > 0 ? recordsToTablePapers(rows) : null);
      } catch {
        if (!cancelled) setFallbackPapers(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [messages, isLoading, parsedPapers.length, pairQuery]);

  const papersRaw = parsedPapers.length > 0 ? parsedPapers : fallbackPapers ?? [];
  const fromFallback = parsedPapers.length === 0 && (fallbackPapers?.length ?? 0) > 0;

  const papers = useMemo(() => {
    return papersRaw.map((p) => {
      const abstractSummary = summarizeAbstract23(p.abstract);
      const limitation = (p.extra && p.extra.trim().length > 0) ? p.extra : buildLimitation(p);
      const relevance = (p.relevance && p.relevance.trim().length > 0)
        ? p.relevance
        : (fromFallback ? p.relevance : '• Relevance inferred from query–paper keyword overlap (see abstract).');
      return { ...p, abstract: abstractSummary, relevance, extra: limitation } satisfies Paper;
    });
  }, [papersRaw, fromFallback]);

  return (
    <aside className="w-full md:sticky md:top-20 self-start">
      <div className="border border-border rounded-2xl bg-background shadow-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-primary/10 text-primary font-semibold">
          Supporting Research Papers {papers.length > 0 ? `(${papers.length})` : ''}
        </div>
        {fromFallback && (
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border bg-muted/20">
            Filled from the session paper database: the model did not return a parseable 10-card block, so the table
            shows the same ranked candidates used for this question.
          </div>
        )}
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
                      <div className="space-y-2">
                        <div>
                          <div className="font-semibold text-primary mb-1">Relevance</div>
                          <div>{p.relevance || '-'}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-primary mb-1">Limitation</div>
                          <div>{p.extra || '-'}</div>
                        </div>
                      </div>
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
