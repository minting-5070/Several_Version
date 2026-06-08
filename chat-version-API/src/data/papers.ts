import { RAW_HIGH } from './raw-high';
import { RAW_LOW } from './raw-low';

export type PaperRecord = {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  link: string;
  abstract: string;
};

// DB quality is fixed per deployment via NEXT_PUBLIC_PAPER_DB ('high' | 'low').
// Defaults to the high-quality database when unset.
const PAPER_DB = (process.env.NEXT_PUBLIC_PAPER_DB || 'high').toLowerCase();
export const PASTED_ENTRIES_RAW: string = PAPER_DB === 'low' ? RAW_LOW : RAW_HIGH;

// Normalize various publisher/portal URLs to a canonical key so that
// the same paper (e.g., Wiley abs/full, Science abs/doi) dedupes cleanly.
function canonicalKeyFromLink(link: string, fallbackTitle?: string, fallbackYear?: number): string {
  const safe = (link || '').trim();
  if (!safe) return `${(fallbackTitle || '').toLowerCase()}-${fallbackYear || ''}`.replace(/[^a-z0-9]+/g, '-');
  try {
    const url = new URL(safe);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const path = url.pathname;
    const full = `${host}${path}${url.search}`;

    // Prefer DOI when present anywhere
    const doiMatch = full.match(/10\.\d{4,9}\/[A-Za-z0-9._;()/:\-]+/);
    if (doiMatch) return `doi:${doiMatch[0].toLowerCase()}`;

    // SSRN abstract id
    if (host.includes('ssrn.com')) {
      const id = url.searchParams.get('abstract_id');
      if (id) return `ssrn:${id}`;
    }

    // arXiv id
    if (host.includes('arxiv.org')) {
      const m = path.match(/\/(abs|pdf)\/(\d{4}\.\d{4,5})(v\d+)?/);
      if (m) return `arxiv:${m[2]}`;
    }

    // Nature article id
    if (host.includes('nature.com')) {
      const m = path.match(/\/articles\/([A-Za-z0-9._\-]+)/);
      if (m) return `nature:${m[1].toLowerCase()}`;
    }

    // Fallback to host+clean path
    return full.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  } catch {
    return safe.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}

function parsePastedEntries(raw: string): PaperRecord[] {
  const input = (raw || '').trim();
  if (!input) return [];

  const results: PaperRecord[] = [];
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  const acc: string[] = [];

  const pushRecord = (linkRaw: string) => {
    const link = String(linkRaw || '')
      .trim()
      .replace(/^@/, '');
    const body = acc.join('\n').trim();
    acc.length = 0;
    if (!body || !/^https?:\/\//i.test(link)) return;

    const paras = body
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    if (paras.length === 0) return;

    const citation = paras[0];
    const abstract = paras.length > 1 ? paras.slice(1).join('\n\n').trim() : '';

    let authors = '';
    let yearNum = new Date().getFullYear();
    let title = '';
    let journal = '';

    const yearMatch = citation.match(/\((\d{4})\)/);
    if (yearMatch) {
      yearNum = Number(yearMatch[1]);
    }
    const authorsPart = citation.split('(')[0] || '';
    authors = authorsPart.trim().replace(/[\s.]+$/, '');

    let rest = citation.replace(/^.*?\)\.\s*/, '');
    const firstDot = rest.indexOf('.');
    if (firstDot >= 0) {
      title = rest.slice(0, firstDot).trim();
      rest = rest.slice(firstDot + 1).trim();
    } else {
      title = rest.trim();
      rest = '';
    }
    if (!title) title = citation;

    const journalCandidate = rest.split('.')[0] || rest;
    journal = (journalCandidate.split(',')[0] || journalCandidate).trim();
    journal = journal.replace(/[\s.]+$/, '');

    const id = canonicalKeyFromLink(link, title, yearNum);

    results.push({
      id,
      title,
      authors,
      year: yearNum,
      journal,
      link,
      abstract,
    });
  };

  for (const line of lines) {
    const t = line.trim();
    if (/^@?https?:\/\/\S+$/i.test(t)) {
      pushRecord(t);
    } else {
      acc.push(line);
    }
  }

  return results;
}

// Deduplicate by canonical key
function dedupePapers(list: PaperRecord[]): PaperRecord[] {
  const seen = new Set<string>();
  const out: PaperRecord[] = [];
  for (const p of list) {
    const key = canonicalKeyFromLink(p.link, p.title, p.year);
    if (seen.has(key)) continue;
    seen.add(key);
    // ensure id aligns with canonical key
    out.push({ ...p, id: key });
  }
  return out;
}

const PASTED_PAPERS: PaperRecord[] = dedupePapers(parsePastedEntries(PASTED_ENTRIES_RAW));

// No hard-coded examples; use pasted entries only.
export const PAPERS: PaperRecord[] = [];

export const ALL_PAPERS: PaperRecord[] = [...PAPERS, ...PASTED_PAPERS];

export function searchPapersByQuery(query: string): PaperRecord[] {
  const q = query.toLowerCase();
	return ALL_PAPERS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.journal.toLowerCase().includes(q) ||
      p.abstract.toLowerCase().includes(q)
    );
  });
}

// Lightweight fuzzy ranking for "앵간하면" 매칭을 위함
function tokenize(text: string): string[] {
  return (text || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter(Boolean)
    .filter((t) => t.length >= 3);
}

function computeRelevanceScore(query: string, paper: PaperRecord): number {
  const qTokens = new Set(tokenize(query));
  if (qTokens.size === 0) return 0;

  const titleTokens = tokenize(paper.title);
  const authorsTokens = tokenize(paper.authors);
  const journalTokens = tokenize(paper.journal);
  const abstractTokens = tokenize(paper.abstract);

  let overlap = 0;
  let titleOverlap = 0;

  for (const t of qTokens) {
    // exact token overlap
    if (titleTokens.includes(t)) titleOverlap += 1;
    if (titleTokens.includes(t) || authorsTokens.includes(t) || journalTokens.includes(t) || abstractTokens.includes(t)) {
      overlap += 1;
      continue;
    }
    // partial prefix match (3+ chars)
    const prefix = t.slice(0, 4);
    if (!prefix) continue;
    const anyPartial = [titleTokens, authorsTokens, journalTokens, abstractTokens].some(arr => arr.some(tok => tok.startsWith(prefix)));
    if (anyPartial) overlap += 0.5;
  }

  // Weight title hits higher
  const score = overlap + titleOverlap * 0.5;
  // Normalize by query token count to keep within a reasonable range
  return score / Math.max(1, qTokens.size);
}

export function rankPapersByQuery(query: string): PaperRecord[] {
  const scored = ALL_PAPERS.map(p => ({ p, s: computeRelevanceScore(query, p) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.map(x => x.p);
}
