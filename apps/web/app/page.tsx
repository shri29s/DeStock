'use client';

import { DashboardGrid } from '@/components/DashboardGrid';
import { TradeView } from '@/components/TradeView';
import { CompanyList } from '@/components/CompanyList';
import { TradingChart } from '@/components/TradingChart';
import { MarketHeatMap } from '@/components/MarketHeatMap';
import { PriceTicker } from '@/components/PriceTicker';
import { motion } from 'framer-motion';

export default function HomePage() {
  const widgets = [
    {
      id: 'trading',
      title: 'Trading Interface',
      component: <TradeView />,
      defaultSize: 40,
      minSize: 30,
    },
    {
      id: 'chart',
      title: 'Price Chart',
      component: <TradingChart symbol="DSTK" height={350} />,
      defaultSize: 60,
      minSize: 40,
    },
  ];

  const bottomWidgets = [
    {
      id: 'companies',
      title: 'Market Overview',
      component: <CompanyList />,
      defaultSize: 60,
      minSize: 50,
    },
    {
      id: 'heatmap',
      title: 'Market Heat Map',
      component: <MarketHeatMap />,
      defaultSize: 40,
      minSize: 30,
    },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div 
        className="text-center glass-card p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to DeStock
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          The professional decentralized trading platform with advanced charting, 
          real-time analytics, and seamless Web3 integration. Trade company shares 
          using DSTK tokens with institutional-grade tools.
        </p>
      </motion.div>

      {/* Price Ticker */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <PriceTicker />
      </motion.div>

      {/* Main Dashboard Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <DashboardGrid widgets={widgets} />
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <DashboardGrid widgets={bottomWidgets} layout="grid" />
      </motion.div>
    </motion.div>
  );
}
