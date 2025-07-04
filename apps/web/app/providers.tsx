'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { config } from '@/lib/wagmi';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

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
          </QueryClientProvider>
        </WagmiProvider>
      </LazyMotion>
    </ThemeProvider>
  );
}
