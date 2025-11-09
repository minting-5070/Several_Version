import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "General Assistant",
  description: "AI-powered general assistant ready to help with questions, tasks, explanations, and whatever you need assistance with",
  keywords: ["AI", "assistant", "General Assistant", "help", "questions", "tasks", "chatbot"],
  authors: [{ name: "General Assistant" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K48NML75');`}
        </Script>
        
        {/* Active Tab Time Tracking - GTM Version */}
        <Script id="tab-time-tracking-gtm" strategy="afterInteractive">
          {`
            (function() {
              let startTime = Date.now();
              let totalActiveTime = 0;
              let isVisible = !document.hidden;

              function getOrCreateSessionId() {
                try {
                  const existing = localStorage.getItem('ra_session_id');
                  if (existing) return existing;
                  const created = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                  localStorage.setItem('ra_session_id', created);
                  return created;
                } catch (_) {
                  return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                }
              }
              function getProlificId() {
                try { return localStorage.getItem('mturk_id') || ''; } catch (_) { return ''; }
              }

              const sessionId = getOrCreateSessionId();
              window.dataLayer = window.dataLayer || [];
              
              function sendTimeEvent(eventType, timeSpent) {
                const prolificId = getProlificId();
                window.dataLayer.push({
                  event: 'tab_engagement',
                  event_category: 'user_engagement',
                  event_action: eventType,
                  event_label: 'active_time',
                  value: Math.round(timeSpent / 1000),
                  session_id: sessionId,
                  user_id: prolificId || undefined,
                  mturk_id: prolificId || undefined,
                  timestamp: new Date().toISOString(),
                  total_active_time: Math.round(totalActiveTime / 1000),
                  app_version: 'chat-version-api'
                });
              }
              
              function handleVisibilityChange() {
                const currentTime = Date.now();
                if (document.hidden) {
                  if (isVisible) {
                    const sessionTime = currentTime - startTime;
                    totalActiveTime += sessionTime;
                    sendTimeEvent('tab_hidden', sessionTime);
                    isVisible = false;
                  }
                } else {
                  if (!isVisible) {
                    startTime = currentTime;
                    sendTimeEvent('tab_visible', 0);
                    isVisible = true;
                  }
                }
              }
              
              function sendPeriodicUpdate() {
                if (!document.hidden) {
                  const currentTime = Date.now();
                  const currentSessionTime = currentTime - startTime;
                  const currentTotalTime = totalActiveTime + currentSessionTime;
                  sendTimeEvent('periodic_update', currentTotalTime);
                }
              }
              
              function sendFinalTime() {
                if (!document.hidden) {
                  const currentTime = Date.now();
                  const sessionTime = currentTime - startTime;
                  totalActiveTime += sessionTime;
                }
                sendTimeEvent('session_end', totalActiveTime);
              }
              
              document.addEventListener('visibilitychange', handleVisibilityChange);
              setInterval(sendPeriodicUpdate, 30000);
              window.addEventListener('beforeunload', sendFinalTime);
              window.addEventListener('pagehide', sendFinalTime);
              sendTimeEvent('session_start', 0);
            })();
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} antialiased font-medium`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K48NML75"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
