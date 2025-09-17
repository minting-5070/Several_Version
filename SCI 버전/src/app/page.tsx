'use client';

import { useChat } from 'ai/react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import PapersPanel from './components/PapersPanel';
import { useRef, useEffect, useState } from 'react';


export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({ streamProtocol: 'text' });
  
  const [displayMessages, setDisplayMessages] = useState(messages);
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'searching' | 'generating'>('idle');
  const [markerDriven, setMarkerDriven] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  


  // 새 메시지가 추가될 때 자동으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

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
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 헤더 */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="text-lg font-bold">RA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Research Assistant</h1>
                <div className="text-xs text-muted-foreground">
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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
            {displayMessages.length === 0 && !isThinking ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                <span className="text-2xl font-bold text-white">RA</span>
                </div>
              <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">
                Research Assistant
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-lg">Developed for Researchers</span>
              </div>
              <p className="text-lg text-muted-foreground mb-12">
                Professional assistant for academic literature discovery—finds top papers and delivers citation‑first summaries.
              </p>
              

              
              {/* 입력창 */}
              <div className="w-full">
                <ChatInput
                  input={input}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
              </div>
            ) : (
          <div className="flex-1 w-full px-2 md:px-6 py-6 flex flex-col">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
              {/* Left: Chat area (narrower) */}
              <div className="md:col-span-4 xl:col-span-3 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4">
                  <ChatMessages messages={displayMessages} />
                  {isThinking && (
                    <div className="flex justify-start mb-4">
                      <div className="flex max-w-[80%] flex-row items-end gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 bg-muted text-muted-foreground">
                          AI
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-muted text-foreground rounded-bl-md">
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              {phase === 'searching' ? 'Searching the web… Please wait.' : 'Generating the answer…'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
                <div className="border-t border-border pt-4">
                  <ChatInput
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Right: Papers panel (much wider) */}
              <div className="md:col-span-8 xl:col-span-9">
                <PapersPanel messages={displayMessages} />
              </div>
            </div>
          </div>
          )}
        )}
      </div>

    </div>
  );
}
