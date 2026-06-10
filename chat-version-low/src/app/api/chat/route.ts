// Edge runtime provides native fetch
import { SYSTEM_MESSAGE, GENERAL_MESSAGE } from './system-message';
import { logChatStart, logChatEnd } from '@/app/api/_lib/server-logger';
import { ALL_PAPERS, searchPapersByQuery, rankPapersByQuery, isPaperSearchRequest, type PaperRecord } from '@/data/papers';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// low 버전: 정상 응답 시간에 이 시간만큼을 추가로 지연 (시간 이동)
const ARTIFICIAL_DELAY_MS = 30000;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body as { messages: any[] };
  const sessionId = String((body as any)?.sessionId || '') || '';
  const prolificId = String((body as any)?.prolificId || '') || '';
  const appVersion = String((body as any)?.appVersion || 'chat-version-low');

  // 환경변수 확인
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response('OpenAI API key is not configured', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  if (ALL_PAPERS.length === 0) {
    return new Response('Paper database failed to load.', {
      status: 500,
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

  // 최신 사용자 쿼리 추출 및 "논문 찾기 요청" 여부 판별
  const latestUser = [...mergedMessages].reverse().find((m: any) => m.role === 'user');
  const query = String(latestUser?.content || '').slice(0, 2000);
  // 논문을 찾아달라는 요청일 때만 10개 논문 모드, 그 외엔 일반 비서 모드
  const paperRequest = isPaperSearchRequest(query);

  // 로컬 논문 후보 선정
  let candidates = (query ? rankPapersByQuery(query) : []).slice(0, 20);
  if (query && candidates.length === 0) {
    candidates = searchPapersByQuery(query).slice(0, 20);
  }

  const systemMessage = {
    role: 'system' as const,
    content: paperRequest ? SYSTEM_MESSAGE : GENERAL_MESSAGE
  };

  const ensureTen = (arr: PaperRecord[]) => {
    if (arr.length >= 10) return arr.slice(0, 10);
    const need = 10 - arr.length;
    const more = ALL_PAPERS.filter(p => !arr.includes(p)).slice(0, need);
    return [...arr, ...more].slice(0, 10);
  };
  const selected = ensureTen(candidates);

  const formattedInput = (() => {
    if (paperRequest) {
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
    model: 'gpt-5.4-mini',
    // Responses API: specify text.format as an object
    text: { format: { type: 'text' } },
    input: formattedInput
  } as const;

  // 분석 로깅: 질문/시작시각 기록 (Supabase 미설정 시 자동 skip)
  const logId = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const tsStartIso = new Date().toISOString();
  try {
    await logChatStart({
      logId,
      sessionId,
      prolificId,
      appVersion,
      questionText: query,
      questionLength: query.length,
      tsStartIso
    });
  } catch {}

  // 1차: 스트리밍 시도
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { ...headers, 'Accept': 'text/event-stream' },
    body: JSON.stringify({
      ...requestBodyBase,
      stream: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    // 스트리밍이 제한된 경우 자동으로 비스트리밍 모드로 재시도
    const shouldRetryWithoutStream =
      errorText.includes('must be verified to stream') ||
      (errorText.includes('param') && errorText.includes('stream')) ||
      errorText.includes('unsupported_value');

    if (shouldRetryWithoutStream) {
      const nonStreamResp = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...requestBodyBase,
          stream: false
        })
      });

      if (!nonStreamResp.ok) {
        const nonStreamErr = await nonStreamResp.text();
        const msg = `Request to OpenAI failed (${nonStreamResp.status}): ${nonStreamErr}`;
        return new Response(msg, {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }

      // 비스트리밍 응답 파싱 후 텍스트로 반환
      const data = await nonStreamResp.json();

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
                  // Common block shapes: { type: 'output_text', text }, { type: 'text', text }
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

      await sleep(ARTIFICIAL_DELAY_MS);

      try {
        await logChatEnd({
          logId,
          answerText: outputText,
          answerLength: outputText.length,
          tsEndIso: new Date().toISOString(),
          responseMs: Date.now() - Date.parse(tsStartIso)
        });
      } catch {}

      return new Response(outputText, {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const msg = `Request to OpenAI failed (${response.status}): ${errorText}`;
    return new Response(msg, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // 스트리밍 응답 처리 (간소화)
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let remainder = '';
  let answerBuffer = '';

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      const text = remainder + decoder.decode(chunk, { stream: true });
      const parts = text.split('\n');
      remainder = parts.pop() ?? '';

      for (const line of parts) {
        if (line.startsWith('data:')) {
          if (line.trim() === 'data:[DONE]' || line.trim() === 'data: [DONE]') {
            continue;
          }

          try {
            const jsonStr = line.slice(5).trimStart();
            const event = JSON.parse(jsonStr);

            if (event.type === 'response.output_text.delta' && event.delta) {
              controller.enqueue(encoder.encode(event.delta));
              answerBuffer += String(event.delta);
            }
            else if (event.delta?.content) {
              controller.enqueue(encoder.encode(event.delta.content));
              answerBuffer += String(event.delta.content);
            }
            else if (event.content) {
              controller.enqueue(encoder.encode(event.content));
              answerBuffer += String(event.content);
            }
            else if (event.choices?.[0]?.delta?.content) {
              controller.enqueue(encoder.encode(event.choices[0].delta.content));
              answerBuffer += String(event.choices[0].delta.content);
            }

          } catch {
            // ignore parse errors
          }
        }
      }
    },

    async flush(controller) {
      if (remainder.startsWith('data:')) {
        try {
          const event = JSON.parse(remainder.slice(5).trimStart());
          if (event.type === 'response.output_text.delta' && event.delta) {
            controller.enqueue(encoder.encode(event.delta));
            answerBuffer += String(event.delta);
          }
          else if (event.delta?.content) {
            controller.enqueue(encoder.encode(event.delta.content));
            answerBuffer += String(event.delta.content);
          }
          else if (event.content) {
            controller.enqueue(encoder.encode(event.content));
            answerBuffer += String(event.content);
          }
          else if (event.choices?.[0]?.delta?.content) {
            controller.enqueue(encoder.encode(event.choices[0].delta.content));
            answerBuffer += String(event.choices[0].delta.content);
          }
        } catch {}
      }

      try {
        // Must await: Edge runtime kills pending requests once the stream closes.
        await logChatEnd({
          logId,
          answerText: answerBuffer,
          answerLength: answerBuffer.length,
          // 사용자 체감 기준: 인위적 지연을 포함해 기록
          tsEndIso: new Date(Date.now() + ARTIFICIAL_DELAY_MS).toISOString(),
          responseMs: Date.now() - Date.parse(tsStartIso) + ARTIFICIAL_DELAY_MS
        });
      } catch {}
    },
  });

  const parsedStream = response.body!.pipeThrough(transformStream);

  // 각 청크를 "도착 시각 + ARTIFICIAL_DELAY_MS"에 내보내는 시간 이동 스트림:
  // 평소와 같은 속도로 스트리밍되되, 전체 응답이 정확히 그만큼 늦게 도착한다.
  const delayedStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = parsedStream.getReader();
      const queue: { at: number; value: Uint8Array }[] = [];
      let upstreamDone = false;

      const producer = (async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) { upstreamDone = true; break; }
          queue.push({ at: Date.now(), value });
        }
      })();

      while (true) {
        if (queue.length > 0) {
          const item = queue[0];
          const wait = item.at + ARTIFICIAL_DELAY_MS - Date.now();
          if (wait > 0) await sleep(wait);
          queue.shift();
          controller.enqueue(item.value);
        } else if (upstreamDone) {
          break;
        } else {
          await sleep(100);
        }
      }

      await producer;
      controller.close();
    }
  });

  return new Response(delayedStream, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}