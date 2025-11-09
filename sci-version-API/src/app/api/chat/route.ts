// Edge runtime provides native fetch
import { SYSTEM_MESSAGE, SMALL_TALK_MESSAGE } from './system-message';
import { ALL_PAPERS, searchPapersByQuery, rankPapersByQuery, type PaperRecord } from '@/data/papers';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 환경변수 확인
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return new Response('OpenAI API key is not configured', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // 메시지 병합 로직
  const mergedMessages = [] as typeof messages;
  for (const msg of messages) {
    if (mergedMessages.length > 0 && mergedMessages[mergedMessages.length - 1].role === msg.role) {
      mergedMessages[mergedMessages.length - 1].content += '\n' + msg.content;
    } else {
      mergedMessages.push({ ...msg });
    }
  }

  // 최신 사용자 쿼리 추출 및 스몰토크 판별
  const latestUser = [...mergedMessages].reverse().find((m: any) => m.role === 'user');
  const query = String(latestUser?.content || '').slice(0, 2000);
  const q = query.toLowerCase().trim();
  const isSmallTalk = (
    q.length <= 80 && (
      /^\s*(hi|hello|hey|안녕|ㅎㅇ|헬로)\b/.test(q) ||
      /(who\s+are\s+you|누구|너는\s*누구|what\s+are\s+you)/.test(q) ||
      /(thanks|thank\s+you|고마워|감사)/.test(q) ||
      /(bye|goodbye|잘가|감사합니다)/.test(q)
    )
  );

  // 로컬 논문 후보 선정
  let candidates = (query ? rankPapersByQuery(query) : []).slice(0, 20);
  if (query && candidates.length === 0) {
    candidates = searchPapersByQuery(query).slice(0, 20);
  }

  const systemMessage = {
    role: 'system' as const,
    content: isSmallTalk ? SMALL_TALK_MESSAGE : SYSTEM_MESSAGE
  };

  const ensureTen = (arr: PaperRecord[]) => {
    if (arr.length >= 10) return arr.slice(0, 10);
    const need = 10 - arr.length;
    const more = ALL_PAPERS.filter(p => !arr.includes(p)).slice(0, need);
    return [...arr, ...more].slice(0, 10);
  };
  const selected = ensureTen(candidates);

  const formattedInput = (() => {
    if (!isSmallTalk) {
      const localDbBlock = selected.map((p, i) => (
        `${i + 1}. Title: ${p.title}\nAuthors: ${p.authors}\nYear: ${p.year} • Journal: ${p.journal}\nLink: ${p.link}\nAbstract: ${p.abstract}`
      )).join('\n\n');

      const localDbMessage = {
        role: 'system' as const,
        content: `LOCAL PAPERS DATABASE (Top candidates for this query):\n\n${localDbBlock}`
      };

      return [
        systemMessage,
        localDbMessage,
        ...mergedMessages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content
        }))
      ];
    }

    return [
      systemMessage,
      ...mergedMessages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content
      }))
    ];
  })();

  // 요청 헤더 구성 (조직/프로젝트 헤더는 선택)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'OpenAI-Beta': 'responses=1'
  };
  const orgId = process.env.OPENAI_ORG_ID;
  if (orgId) headers['OpenAI-Organization'] = orgId;
  const projectId = process.env.OPENAI_PROJECT;
  if (projectId) headers['OpenAI-Project'] = projectId;

  // 요청 바디 공통 부분
  const requestBodyBase = {
    model: 'gpt-5',
    // Responses API: specify text.format as an object
    text: { format: { type: 'text' } },
    input: formattedInput
  } as const;

  // 비스트리밍 모드로 요청 (조직 인증 문제 해결)
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...requestBodyBase,
      stream: false
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    const msg = `Request to OpenAI failed (${response.status}): ${errorText}`;
    return new Response(msg, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // 비스트리밍 응답 파싱
  const data = await response.json();

  const extractText = (d: any): string => {
    try {
      // 1) Preferred Responses API field
      if (typeof d?.output_text === 'string') return d.output_text;
      if (Array.isArray(d?.output_text)) return d.output_text.join('');

      // 2) Responses API structured output array
      if (Array.isArray(d?.output)) {
        let buf = '';
        for (const item of d.output) {
          if (item?.type === 'message' && Array.isArray(item.content)) {
            for (const block of item.content) {
              if (typeof block?.text === 'string') buf += block.text;
              else if (typeof block?.content === 'string') buf += block.content;
            }
          } else if (item?.type === 'message' && typeof item?.content === 'string') {
            buf += item.content;
          }
        }
        if (buf) return buf;
      }

      // 3) Chat Completions compatibility
      if (typeof d?.content === 'string') return d.content;
      if (d?.choices?.[0]?.message?.content) return d.choices[0].message.content;

      // 4) Fallback
      return typeof d === 'string' ? d : JSON.stringify(d);
    } catch {
      return typeof d === 'string' ? d : JSON.stringify(d);
    }
  };

  const outputText = extractText(data);

  return new Response(outputText, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}