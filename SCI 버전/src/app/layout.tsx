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
              let sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
              
              // Initialize dataLayer if not exists
              window.dataLayer = window.dataLayer || [];
              
              function sendTimeEvent(eventType, timeSpent) {
                window.dataLayer.push({
                  event: 'tab_engagement',
                  event_category: 'user_engagement',
                  event_action: eventType,
                  event_label: 'active_time',
                  value: Math.round(timeSpent / 1000), // seconds
                  session_id: sessionId,
                  timestamp: new Date().toISOString(),
                  total_active_time: Math.round(totalActiveTime / 1000),
                  app_version: 'sci-version'
                });
              }
              
              function handleVisibilityChange() {
                const currentTime = Date.now();
                
                if (document.hidden) {
                  // Tab became hidden - stop counting
                  if (isVisible) {
                    const sessionTime = currentTime - startTime;
                    totalActiveTime += sessionTime;
                    sendTimeEvent('tab_hidden', sessionTime);
                    isVisible = false;
                  }
                } else {
                  // Tab became visible - start counting
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
              
              // Event listeners
              document.addEventListener('visibilitychange', handleVisibilityChange);
              
              // Send periodic updates every 30 seconds while tab is active
              setInterval(sendPeriodicUpdate, 30000);
              
              // Send final time on page unload
              window.addEventListener('beforeunload', sendFinalTime);
              window.addEventListener('pagehide', sendFinalTime);
              
              // Initial event
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
