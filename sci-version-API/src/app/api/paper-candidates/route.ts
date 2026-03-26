import { ALL_PAPERS, rankPapersByQuery, searchPapersByQuery, type PaperRecord } from '@/data/papers';

export const runtime = 'edge';

function ensureTen(arr: PaperRecord[]): PaperRecord[] {
  if (arr.length >= 10) return arr.slice(0, 10);
  const need = 10 - arr.length;
  const more = ALL_PAPERS.filter((p) => !arr.includes(p)).slice(0, need);
  return [...arr, ...more].slice(0, 10);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const query = String((body as { query?: string })?.query || '').slice(0, 2000);

  let candidates = (query ? rankPapersByQuery(query) : []).slice(0, 20);
  if (query && candidates.length === 0) {
    candidates = searchPapersByQuery(query).slice(0, 20);
  }
  const selected = ensureTen(candidates);
  const byId = new Map(ALL_PAPERS.map((p) => [p.id, p]));
  const papers = selected.map((p) => byId.get(p.id) ?? p);

  return Response.json({ papers });
}
