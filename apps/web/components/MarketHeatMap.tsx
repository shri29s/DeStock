'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeatMapData {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  size: number;
}

interface MarketHeatMapProps {
  className?: string;
}

export function MarketHeatMap({ className }: MarketHeatMapProps) {
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeatMapData();
  }, []);

  const loadHeatMapData = async () => {
    try {
      const response = await fetch('/api/market?type=heatmap');
      const result = await response.json();
      setHeatMapData(result.heatmap || []);
    } catch (error) {
      console.error('Failed to load heatmap data:', error);
      // Fallback mock data
      setHeatMapData(generateMockHeatMapData());
    } finally {
      setLoading(false);
    }
  };

  const generateMockHeatMapData = (): HeatMapData[] => {
    const companies = [
      { name: 'TechCorp', symbol: 'TECH' },
      { name: 'FinanceInc', symbol: 'FIN' },
      { name: 'HealthCare Ltd', symbol: 'HEAL' },
      { name: 'Energy Solutions', symbol: 'NRGY' },
      { name: 'Retail Giant', symbol: 'RTGN' },
      { name: 'Manufacturing Co', symbol: 'MANU' },
      { name: 'Transport Hub', symbol: 'TRNS' },
      { name: 'Media Group', symbol: 'MEDA' },
      { name: 'Real Estate', symbol: 'REST' },
      { name: 'Biotech Inc', symbol: 'BIOT' },
      { name: 'Aerospace Ltd', symbol: 'AERO' },
      { name: 'Telecom Corp', symbol: 'TCOM' }
    ];

    return companies.map((company, index) => ({
      id: index.toString(),
      name: company.name,
      symbol: company.symbol,
      value: Math.random() * 1000 + 100,
      change: (Math.random() - 0.5) * 20,
      size: Math.random() * 80 + 40
    }));
  };

  const getColorByChange = (change: number) => {
    if (change > 5) return 'from-green-500 to-green-600';
    if (change > 2) return 'from-green-400 to-green-500';
    if (change > 0) return 'from-green-300 to-green-400';
    if (change > -2) return 'from-red-300 to-red-400';
    if (change > -5) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  const getTextColor = (change: number) => {
    return Math.abs(change) > 3 ? 'text-white' : 'text-gray-800';
  };

  if (loading) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Market Heat Map
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gray-700/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`glass-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Market Heat Map
      </h3>
      
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {heatMapData.map((item, index) => (
          <motion.div
            key={item.id}
            className={`
              aspect-square rounded-lg p-2 cursor-pointer
              bg-gradient-to-br ${getColorByChange(item.change)}
              hover:scale-105 transition-all duration-200
              flex flex-col justify-between
              ${getTextColor(item.change)}
            `}
            style={{
              minHeight: `${Math.max(item.size, 60)}px`,
              opacity: 0.8 + (Math.abs(item.change) / 20) * 0.2
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8 + (Math.abs(item.change) / 20) * 0.2, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.05,
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            title={`${item.name} (${item.symbol}): ${item.change > 0 ? '+' : ''}${item.change.toFixed(2)}%`}
          >
            <div className="text-xs font-semibold truncate">
              {item.symbol}
            </div>
            <div className="text-xs font-bold">
              {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-green-400 to-green-500"></div>
            <span>Positive</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-red-400 to-red-500"></div>
            <span>Negative</span>
          </div>
        </div>
        <div className="text-xs">
          Size = Market Cap | Color = 24h Change
        </div>
      </div>
    </motion.div>
  );
}
