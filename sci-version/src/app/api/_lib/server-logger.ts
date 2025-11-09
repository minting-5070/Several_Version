export type ChatLogStart = {
  logId: string;
  sessionId: string;
  prolificId: string;
  appVersion: string;
  questionText: string;
  questionLength: number;
  tsStartIso: string;
};

export type ChatLogEnd = {
  logId: string;
  answerText: string;
  answerLength: number;
  tsEndIso: string;
};

const DEBUG = (process.env.ENABLE_LOG_DEBUG || '').toString() === '1';

function supabaseHeaders() {
  const apiKey = process.env.SUPABASE_SERVICE_ROLE;
  return {
    'Content-Type': 'application/json',
    'apikey': apiKey || '',
    'Authorization': `Bearer ${apiKey || ''}`,
    'Prefer': 'return=minimal'
  } as Record<string, string>;
}

function supabaseUrl(path: string) {
  const base = process.env.SUPABASE_URL || '';
  if (!base) return '';
  return `${base.replace(/\/$/, '')}${path}`;
}

export async function logChatStart(row: ChatLogStart) {
  try {
    const url = supabaseUrl('/rest/v1/chat_logs');
    if (!url) return; // logging disabled if not configured
    const res = await fetch(url, {
      method: 'POST',
      headers: supabaseHeaders(),
      body: JSON.stringify({
        log_id: row.logId,
        session_id: row.sessionId,
        prolific_id: row.prolificId || null,
        app_version: row.appVersion,
        question_text: row.questionText,
        question_length: row.questionLength,
        ts_start: row.tsStartIso,
      })
    });
    if (DEBUG) {
      if (!res.ok) {
        const txt = await res.text().catch(()=>'');
        console.log('[chat-logger] start failed', res.status, txt.slice(0, 500));
      } else {
        console.log('[chat-logger] start ok', res.status);
      }
    }
  } catch (_) {
    // swallow – analytics should never break the main flow
    if (DEBUG) {
      console.log('[chat-logger] start threw error');
    }
  }
}

export async function logChatEnd(row: ChatLogEnd) {
  try {
    const base = supabaseUrl('/rest/v1/chat_logs');
    if (!base) return;
    const url = `${base}?log_id=eq.${encodeURIComponent(row.logId)}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: supabaseHeaders(),
      body: JSON.stringify({
        answer_text: row.answerText,
        answer_length: row.answerLength,
        ts_end: row.tsEndIso,
      })
    });
    if (DEBUG) {
      if (!res.ok) {
        const txt = await res.text().catch(()=>'');
        console.log('[chat-logger] end failed', res.status, txt.slice(0, 500));
      } else {
        console.log('[chat-logger] end ok', res.status);
      }
    }
  } catch (_) {
    // ignore
    if (DEBUG) {
      console.log('[chat-logger] end threw error');
    }
  }
}


