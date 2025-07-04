import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeStock - Decentralized Stock Trading Platform',
  description: 'Trade company shares using DSTK tokens on the blockchain',
  keywords: ['DeFi', 'Trading', 'Blockchain', 'Ethereum', 'Stocks'],
  authors: [{ name: 'DeStock Team' }],
  openGraph: {
    title: 'DeStock - Decentralized Stock Trading Platform',
    description: 'Trade company shares using DSTK tokens on the blockchain',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <div className="min-h-full bg-gray-50">
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
