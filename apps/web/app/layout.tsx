import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeStock - Professional Decentralized Trading Platform',
  description: 'Advanced trading platform for company shares using DSTK tokens with professional charting, analytics, and dark mode support',
  keywords: ['DeFi', 'Trading', 'Blockchain', 'Ethereum', 'Stocks', 'Charts', 'Analytics', 'Professional Trading'],
  authors: [{ name: 'DeStock Team' }],
  openGraph: {
    title: 'DeStock - Professional Decentralized Trading Platform',
    description: 'Advanced trading platform with professional charting and analytics',
    type: 'website',
  },
  other: {
    'theme-color': '#3B82F6',
    'color-scheme': 'light dark',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full`}>
        <Providers>
          <div className="min-h-full bg-background transition-colors duration-300 theme-transition">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
