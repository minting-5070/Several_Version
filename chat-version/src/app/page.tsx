'use client';

import { useChat } from 'ai/react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { useRef, useEffect, useState } from 'react';
// Genyva watermark is applied in the modal background; no inline logo component needed


export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    streamProtocol: 'text',
    body: typeof window === 'undefined' ? {} : {
      sessionId: ((): string => {
        try {
          const existing = localStorage.getItem('ra_session_id');
          if (existing) return existing;
          const created = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('ra_session_id', created);
          return created;
        } catch { return Math.random().toString(36).slice(2); }
      })(),
      prolificId: ((): string => {
        try { return localStorage.getItem('prolific_id') || ''; } catch { return ''; }
      })(),
      appVersion: 'chat-version'
    }
  });
  
  const [displayMessages, setDisplayMessages] = useState(messages);
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'searching' | 'generating'>('idle');
  const [markerDriven, setMarkerDriven] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [prolificId, setProlificId] = useState('');
  const [prolificInput, setProlificInput] = useState('');
  const [logoUrl, setLogoUrl] = useState<string>('/branding/genyva-logo.svg');
  const [inlineLogoReady, setInlineLogoReady] = useState<boolean>(false);
  


  // 새 메시지가 추가될 때 자동으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  // 브랜드 로고 프리로드 (헤더 옆 마크 + 모달 워터마크 공용)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const candidate = '/branding/genyva-logo.svg';
    const img = new Image();
    img.onload = () => {
      setLogoUrl(candidate);
      setInlineLogoReady(true);
    };
    img.onerror = () => setInlineLogoReady(false);
    img.src = candidate;
  }, []);

  // 메시지 상태 관리 + 페이즈 감지
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (isLoading) {
      setIsThinking(true);
      // 마커가 있을 때만 상태 표시
      const temp = lastMessage?.content || '';
      const hasSearching = lastMessage?.role === 'assistant' && temp.includes('<!--SEARCHING-->');
      const hasGenerating = lastMessage?.role === 'assistant' && temp.includes('<!--GENERATING-->');
      if (hasSearching) setPhase('searching');
      else if (hasGenerating) setPhase('generating');
      else if (phase === 'idle') setPhase('searching'); // 사이클 시작 기본값
      setMarkerDriven(hasSearching || hasGenerating);

      // 스트리밍 중인 마지막 assistant 메시지는 숨김, 없으면 전체 표시
      if (lastMessage?.role === 'assistant') {
        setDisplayMessages(messages.slice(0, -1));
      } else {
        setDisplayMessages(messages);
      }
    } else {
      setIsThinking(false);
      setPhase('idle');
      setMarkerDriven(false);
      setTimeout(() => {
        setDisplayMessages(messages);
      }, 200);
    }
  }, [messages, isLoading]);

  // 마커가 없을 때만 검색↔생성 상태를 번갈아 표시
  useEffect(() => {
    if (!isThinking || markerDriven) return;
    const id = setInterval(() => {
      setPhase((p) => (p === 'searching' ? 'generating' : 'searching'));
    }, 3000);
    return () => clearInterval(id);
  }, [isThinking, markerDriven]);

  // 자동 전환 제거: 마커가 있을 때만 상태 표시

  const clearChat = () => {
    setMessages([]);
    setDisplayMessages([]);
    setIsThinking(false);
  };
  
  // 최초 방문 팝업 노티스 + Prolific ID 저장
  const [showNotice, setShowNotice] = useState(false);
  useEffect(() => {
    try {
      const STORAGE_KEY = 'cvt_marketing_seen_chat_v2';
      const qs = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const forceShow = qs?.get('showBanner') === '1';
      const storedId = typeof window !== 'undefined' ? localStorage.getItem('prolific_id') : '';
      if (storedId) {
        setProlificId(storedId);
        setProlificInput(storedId);
      }
      // Align behavior with sci-version: show when no Prolific ID or when forced
      if (forceShow || !storedId) setShowNotice(true);
    } catch {}
  }, []);
  const dismissNotice = () => {
    try { localStorage.setItem('cvt_marketing_seen_chat_v2', '1'); } catch {}
    setShowNotice(false);
  };
  const saveProlificAndDismiss = () => {
    const id = prolificInput.trim();
    if (!id) return;
    try {
      localStorage.setItem('prolific_id', id);
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'prolific_id_set', prolific_id: id });
      localStorage.setItem('cvt_marketing_seen_chat_v2', '1');
    } catch {}
    setProlificId(id);
    setShowNotice(false);
  };
  const changeProlificId = () => {
    if (typeof window === 'undefined') return;
    const next = window.prompt('Enter your Prolific ID', prolificId || '') || '';
    const trimmed = next.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem('prolific_id', trimmed);
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'prolific_id_set', prolific_id: trimmed });
    } catch {}
    setProlificId(trimmed);
  };
  
  // Helpers for analytics
  const getSessionId = () => {
    try {
      const existing = typeof window !== 'undefined' ? localStorage.getItem('ra_session_id') : '';
      if (existing) return existing;
      const created = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      if (typeof window !== 'undefined') localStorage.setItem('ra_session_id', created);
      return created;
    } catch {
      return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  };
  const getProlificId = () => {
    try { return typeof window !== 'undefined' ? (localStorage.getItem('prolific_id') || '') : ''; } catch { return ''; }
  };

  // 생성 중에는 새 프롬프트 전송 금지
  const handleSubmitGuarded = (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    try {
      const q = (input || '').trim();
      const sessionId = getSessionId();
      const prolific = getProlificId();
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'chat_question_submitted',
        session_id: sessionId,
        user_id: prolific || undefined,
        prolific_id: prolific || undefined,
        question_text: q.length > 500 ? q.slice(0, 500) : q,
        question_length: q.length,
        timestamp: new Date().toISOString(),
        app_version: 'chat-version'
      });
    } catch {}
    handleSubmit(e);
  };

  // Emit event when a new assistant answer arrives
  const lastAnswerIdRef = useRef<string>('');
  useEffect(() => {
    if (isLoading) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== 'assistant') return;
    if (last.id === lastAnswerIdRef.current) return;
    lastAnswerIdRef.current = last.id;
    try {
      const answer = (last.content || '').trim();
      const sessionId = getSessionId();
      const prolific = getProlificId();
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'chat_answer_received',
        session_id: sessionId,
        user_id: prolific || undefined,
        prolific_id: prolific || undefined,
        answer_excerpt: answer.length > 500 ? answer.slice(0, 500) : answer,
        answer_length: answer.length,
        timestamp: new Date().toISOString(),
        app_version: 'chat-version'
      });
    } catch {}
  }, [messages, isLoading]);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 헤더 */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2 shadow-sm"
                   style={{
                     borderColor: 'transparent',
                     background: 'linear-gradient(135deg, #2563eb, #60a5fa) padding-box, linear-gradient(135deg, #4de8ff, #5aa0ff 40%, #c084fc 100%) border-box',
                     boxShadow: 'inset 0 1px 0 rgba(255,255,255,.45)'
                   }}>
                {inlineLogoReady ? (
                  <img src={logoUrl} alt="Genyva" className="w-7 h-7" style={{ filter: 'brightness(1.08) saturate(1.2) contrast(1.05) drop-shadow(0 1px 1px rgba(0,0,0,.25))' }} />
                ) : (
                  <span className="text-lg font-bold">GY</span>
                )}
              </div>
              <div className="flex items-center flex-wrap gap-2 md:gap-3">
                <span className="text-lg md:text-2xl font-bold tracking-tight">General Assistant</span>
                <span className="text-foreground/40">—</span>
                <span className="text-base md:text-2xl font-semibold">Powered by</span>
                <span className="text-base md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 tracking-wide">Genyva AI</span>
                {inlineLogoReady && (
                  <img src={logoUrl} alt="Genyva" className="h-5 w-5 md:h-7 md:w-7 opacity-80" />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {prolificId ? (
                <div className="px-2 py-1 rounded-md bg-muted text-xs text-foreground">Prolific ID: <span className="font-semibold">{prolificId}</span></div>
              ) : (
                <button onClick={() => setShowNotice(true)} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20">Set Prolific ID</button>
              )}
              <button onClick={changeProlificId} className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground">Change</button>
              {displayMessages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear Chat
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex-grow flex flex-col">
            {showNotice && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="w-[94%] max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden relative">
                  {/* sci-version-API와 유사한 대각선 그라디언트 배경 */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-blue-500/40" />
                  {/* Genyva 로고 워터마크 (중앙 배경) */}
                  <div
                    className="absolute inset-0 pointer-events-none select-none z-10"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.28)',
                      WebkitMaskImage: `url(${logoUrl})`,
                      maskImage: `url(${logoUrl})`,
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: '50% 50%',
                      maskPosition: '50% 50%',
                      WebkitMaskSize: 'auto 86%',
                      maskSize: 'auto 86%'
                    }}
                  />
                  <div className="relative z-20 px-6 py-7 bg-gradient-to-br from-white/95 via-violet-50/85 to-blue-50/80 dark:from-neutral-900/90 dark:via-violet-900/40 dark:to-blue-900/40 ring-1 ring-white/30">
                    <div className="flex items-start justify-between">
                      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
                        <span className="text-sm md:text-base font-semibold align-middle mr-2 text-foreground/80">Powered by</span>
                        <span className="align-middle text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 font-extrabold">Genyva AI</span>
                        {inlineLogoReady && (
                          <img src={logoUrl} alt="Genyva" className="inline-block h-8 w-8 md:h-10 md:w-10 ml-2 align-[-6px] opacity-80" style={{ filter: 'grayscale(1) contrast(1.2)' }} />
                        )}
                        <span className="block text-2xl md:text-3xl font-semibold text-foreground/90">The general‑purpose assistant</span>
                      </h2>
                    </div>
                    <p className="mt-5 text-lg md:text-xl text-foreground">Genyva AI provides accurate, crisp answers for work, study, and everyday tasks.</p>
                    <div className="mt-7 flex items-center justify-end gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2 text-foreground/90">Prolific ID</label>
                        <input
                          value={prolificInput}
                          onChange={(e) => setProlificInput(e.target.value)}
                          placeholder="Enter your Prolific ID"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <button onClick={saveProlificAndDismiss} disabled={!prolificInput.trim()} className={`px-5 py-2.5 text-sm md:text-base rounded-lg ${prolificInput.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>Start now</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {displayMessages.length === 0 && !isThinking ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 mx-auto border-2 shadow-sm"
                   style={{
                     borderColor: 'transparent',
                     background: 'linear-gradient(135deg, #2563eb, #5aa0ff) padding-box, linear-gradient(135deg, #4de8ff, #5aa0ff 40%, #c084fc 100%) border-box',
                     boxShadow: 'inset 0 1px 0 rgba(255,255,255,.45)'
                   }}>
                {inlineLogoReady ? (
                  <img src={logoUrl} alt="Genyva" className="w-12 h-12" style={{ filter: 'brightness(1.08) saturate(1.2) contrast(1.05) drop-shadow(0 1.5px 1.5px rgba(0,0,0,.28))' }} />
                ) : (
                  <span className="text-2xl font-bold text-white">GY</span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">
                Genyva AI
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-lg">Genyva Pro</span>
              </div>
              <p className="text-lg text-muted-foreground mb-12">
                Ask me anything! I'm here to help with questions, tasks, explanations, and whatever you need assistance with.
              </p>
              
              {/* 기능 설명 제거: API 버전과 동일한 심플 레이아웃 */}
              

              
              {/* 입력창 */}
              <div className="w-full">
                <ChatInput
                  input={input}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmitGuarded}
                  isLoading={isLoading}
                />
              </div>
            </div>
              </div>
            ) : (
          <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4">
                <ChatMessages messages={displayMessages} />
                {isThinking && (
                  <div className="flex justify-start mt-6 md:mt-10 mb-4">
                    <div className="flex max-w-[80%] flex-row items-end gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 bg-muted text-muted-foreground">
                        AI
                      </div>
                      <div className="px-5 py-4 rounded-2xl bg-muted text-foreground rounded-bl-md shadow-sm">
                        <div className="flex items-center">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full ra-dot" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full ra-dot" style={{ animationDelay: '140ms' }}></div>
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full ra-dot" style={{ animationDelay: '280ms' }}></div>
                          </div>
                          <div className="ml-3">
                            <div className="text-base md:text-lg font-semibold">
                              {phase === 'searching' ? 'Searching the literature…' : 'Generating the answer…'}
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground">
                              This may take a few minutes — please wait.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-border pt-4">
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmitGuarded}
              isLoading={isLoading}
            />
          </div>
          </div>
        )}
      </div>

      {/* Local animation for energetic dots */}
      <style jsx>{`
        @keyframes raDotWave {
          0% { transform: translateY(0) scale(1); opacity: .85; }
          20% { transform: translateY(-6px) scale(1.1); opacity: 1; }
          50% { transform: translateY(0) scale(.95); opacity: .9; }
          80% { transform: translateY(6px) scale(1.05); opacity: .95; }
          100% { transform: translateY(0) scale(1); opacity: .85; }
        }
        .ra-dot { animation: raDotWave 0.9s ease-in-out infinite; }
      `}</style>

    </div>
  );
}
