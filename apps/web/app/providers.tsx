'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { config } from '@/lib/wagmi';
import { WebSocketProvider } from '@/lib/providers/WebSocketProvider';
import { getWebSocketUrl } from '@/lib/constants/shared';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  // Get WebSocket configuration from shared constants
  const webSocketUrl = getWebSocketUrl();
  
  // Enable WebSocket if URL is properly configured
  const webSocketEnabled = !!webSocketUrl && webSocketUrl !== '';

  console.log('WebSocket configuration:', {
    url: webSocketUrl,
    enabled: webSocketEnabled,
    env: process.env.NODE_ENV
  });

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange={false}
    >
      <LazyMotion features={domAnimation}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <WebSocketProvider url={webSocketUrl} enabled={webSocketEnabled}>
              {children}
              <Toaster 
                position="top-right"
                toastOptions={{
                  className: 'glass-card',
                  style: {
                    background: 'var(--glass-bg)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(12px)',
                  },
                }}
              />
            </WebSocketProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </LazyMotion>
    </ThemeProvider>
  );
}
