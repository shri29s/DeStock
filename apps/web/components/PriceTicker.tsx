'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { getAllCompanies } from '@/lib/utils/companyUtils';

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface PriceTickerProps {
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export function PriceTicker({ 
  speed = 50, 
  direction = 'left', 
  className = '',
  pauseOnHover = true 
}: PriceTickerProps) {
  const [tickerData, setTickerData] = useState<TickerItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch('/api/market?type=ticker');
        const result = await response.json();
        setTickerData(result.ticker || []);
      } catch (error) {
        console.error('Failed to fetch ticker data:', error);
        // Fallback to real token data
        const companies = getAllCompanies().slice(0, 10);
        const fallbackData = companies.map(company => ({
          symbol: company.symbol,
          name: company.name,
          price: parseFloat(company.price.replace('$', '')),
          change: (Math.random() - 0.5) * 10,
          changePercent: (Math.random() - 0.5) * 15,
          volume: Math.floor(Math.random() * 1000000),
        }));
        setTickerData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchTickerData();

    // Update ticker data every 30 seconds
    const interval = setInterval(fetchTickerData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Real-time price updates simulation
  useEffect(() => {
    if (tickerData.length === 0) return;

    const interval = setInterval(() => {
      setTickerData(prev => prev.map(item => {
        const changePercent = (Math.random() - 0.5) * 0.5; // ±0.25%
        const newPrice = item.price * (1 + changePercent / 100);
        const priceChange = newPrice - item.price;
        
        return {
          ...item,
          price: Number(newPrice.toFixed(2)),
          change: Number(priceChange.toFixed(2)),
          changePercent: Number(((priceChange / item.price) * 100).toFixed(2)),
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [tickerData.length]);

  if (loading) {
    return (
      <div className={`glass-card h-16 flex items-center justify-center ${className}`}>
        <div className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex space-x-2 animate-pulse">
              <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`glass-card overflow-hidden relative ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="h-16 flex items-center">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: direction === 'left' ? '-50%' : '50%',
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* Duplicate the data to create seamless loop */}
          {[...tickerData, ...tickerData].map((item, index) => (
            <motion.div
              key={`${item.symbol}-${index}`}
              className="flex items-center space-x-3 min-w-fit"
              whileHover={pauseOnHover ? { scale: 1.05 } : {}}
            >
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {item.symbol}
              </span>
              
              <AnimatedCounter
                value={item.price}
                format="currency"
                decimals={2}
                className="font-medium text-gray-900 dark:text-gray-100"
              />
              
              <div className={`flex items-center space-x-1 ${
                item.change >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {item.change >= 0 ? (
                  <TrendingUpIcon className="w-3 h-3" />
                ) : (
                  <TrendingDownIcon className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                </span>
                <span className="text-sm">
                  ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </span>
              </div>
              
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Vol: {(item.volume / 1000000).toFixed(1)}M
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none" />
    </div>
  );
}
