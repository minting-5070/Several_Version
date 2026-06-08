import { logLinkClick } from '@/app/api/_lib/server-logger';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // sendBeacon은 Content-Type을 보장하지 않으므로 raw text로 받아 파싱
    const raw = await req.text();
    const data = raw ? JSON.parse(raw) : {};

    const url = String(data?.url || '').slice(0, 2000);
    if (!url) {
      return new Response(null, { status: 204 });
    }

    await logLinkClick({
      sessionId: String(data?.sessionId || ''),
      prolificId: String(data?.prolificId || ''),
      appVersion: `${String(data?.appVersion || '')}-${(process.env.NEXT_PUBLIC_PAPER_DB || 'high').toLowerCase() === 'low' ? 'low' : 'high'}`,
      url,
      linkText: String(data?.linkText || '').slice(0, 500),
      messageId: String(data?.messageId || ''),
      tsClickIso: String(data?.tsClickIso || new Date().toISOString())
    });
  } catch {
    // 분석 로깅은 메인 흐름을 절대 막지 않음
  }
  return new Response(null, { status: 204 });
}
