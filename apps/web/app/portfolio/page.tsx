'use client';

import { useAccount } from 'wagmi';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletIcon, TrendingUpIcon, TrendingDownIcon, PieChartIcon, DollarSignIcon, BarChart3Icon, Activity, Eye, EyeOff } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { TradingChart } from '@/components/TradingChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface HoldingItem {
  companyId: number;
  companyName: string;
  symbol: string;
  shares: string;
  currentPrice: string;
  totalValue: string;
  change: number;
  changePercent: number;
  avgBuyPrice: string;
  pnl: number;
  pnlPercent: number;
  allocation: number;
}

interface PortfolioStats {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayChange: number;
  dayChangePercent: number;
  bestPerformer: string;
  worstPerformer: string;
}

export default function PortfolioPage() {
  const { isConnected, address } = useAccount();
  const { balance } = useDSTK();
  const { getShareBalance, nextCompanyId } = useDeStock();
  const [holdings, setHoldings] = useState<HoldingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<PortfolioStats>({
    totalValue: 0,
    totalPnL: 0,
    totalPnLPercent: 0,
    dayChange: 0,
    dayChangePercent: 0,
    bestPerformer: '',
    worstPerformer: ''
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [showValues, setShowValues] = useState(true);
  const [sortBy, setSortBy] = useState<'value' | 'pnl' | 'change'>('value');

  useEffect(() => {
    if (isConnected) {
      loadPortfolio();
      const interval = setInterval(loadPortfolio, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isConnected, nextCompanyId]);

  // Fix hydration by ensuring client-side rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio');
      const result = await response.json();
      
      if (result.portfolio) {
        setHoldings(result.portfolio.holdings || []);
        setStats(result.portfolio.stats || stats);
      } else {
        // Fallback mock data
        const mockHoldings: HoldingItem[] = [
          {
            companyId: 0,
            companyName: 'TechCorp Inc.',
            symbol: 'TECH',
            shares: '150',
            currentPrice: '85.42',
            totalValue: '12813',
            change: 2.34,
            changePercent: 2.8,
            avgBuyPrice: '78.90',
            pnl: 978,
            pnlPercent: 8.26,
            allocation: 45.2
          },
          {
            companyId: 1,
            companyName: 'Green Energy Solutions',
            symbol: 'GREN',
            shares: '200',
            currentPrice: '34.76',
            totalValue: '6952',
            change: -1.12,
            changePercent: -3.1,
            avgBuyPrice: '36.80',
            pnl: -408,
            pnlPercent: -5.56,
            allocation: 24.5
          },
          {
            companyId: 2,
            companyName: 'FinTech Innovations',
            symbol: 'FINX',
            shares: '80',
            currentPrice: '92.15',
            totalValue: '7372',
            change: 4.67,
            changePercent: 5.3,
            avgBuyPrice: '88.20',
            pnl: 316,
            pnlPercent: 4.48,
            allocation: 26.0
          },
          {
            companyId: 3,
            companyName: 'BioMed Research',
            symbol: 'BIOM',
            shares: '45',
            currentPrice: '25.80',
            totalValue: '1161',
            change: 0.85,
            changePercent: 3.4,
            avgBuyPrice: '27.30',
            pnl: -67.5,
            pnlPercent: -5.49,
            allocation: 4.1
          }
        ];
        
        setHoldings(mockHoldings);
        
        const totalValue = mockHoldings.reduce((sum, h) => sum + parseFloat(h.totalValue), 0);
        const totalPnL = mockHoldings.reduce((sum, h) => sum + h.pnl, 0);
        const dayChange = mockHoldings.reduce((sum, h) => sum + (parseFloat(h.totalValue) * h.changePercent / 100), 0);
        
        setStats({
          totalValue,
          totalPnL,
          totalPnLPercent: (totalPnL / (totalValue - totalPnL)) * 100,
          dayChange,
          dayChangePercent: (dayChange / totalValue) * 100,
          bestPerformer: mockHoldings.reduce((best, h) => h.changePercent > best.changePercent ? h : best).symbol,
          worstPerformer: mockHoldings.reduce((worst, h) => h.changePercent < worst.changePercent ? h : worst).symbol
        });
      }
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return parseFloat(b.totalValue) - parseFloat(a.totalValue);
      case 'pnl':
        return b.pnl - a.pnl;
      case 'change':
        return b.changePercent - a.changePercent;
      default:
        return 0;
    }
  });

  if (!isConnected) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="glass-card text-center py-16">
          <WalletIcon className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-400 text-lg">
            Connect your wallet to view your portfolio and track your investments.
          </p>
        </div>
      </div>
    );
  }

  // Render simple version before hydration to prevent mismatch
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="glass-card text-center py-16">
          <WalletIcon className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Portfolio Analytics
          </h1>
          <p className="text-gray-400 text-lg">
            Loading your portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      suppressHydrationWarning={true}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Portfolio Analytics
          </h1>
          <p className="text-gray-400 text-lg">
            Advanced portfolio tracking with real-time analytics and insights.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowValues(!showValues)}
            className="glass-card p-3 hover:bg-gray-700/30 transition-all duration-200"
          >
            {showValues ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
          
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="glass-card p-3 bg-transparent border-0 focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="1D">1 Day</option>
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
      </motion.div>

      {/* Portfolio Overview Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          {
            title: 'Total Portfolio Value',
            value: showValues ? stats.totalValue : '****',
            suffix: showValues ? ' DSTK' : '',
            icon: DollarSignIcon,
            color: 'text-blue-400',
            bgColor: 'from-blue-500/20 to-blue-600/20'
          },
          {
            title: 'Total P&L',
            value: showValues ? (stats.totalPnL >= 0 ? '+' : '') + stats.totalPnL.toFixed(2) : '****',
            suffix: showValues ? ' DSTK' : '',
            icon: TrendingUpIcon,
            color: stats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400',
            bgColor: stats.totalPnL >= 0 ? 'from-green-500/20 to-green-600/20' : 'from-red-500/20 to-red-600/20'
          },
          {
            title: '24h Change',
            value: showValues ? (stats.dayChange >= 0 ? '+' : '') + stats.dayChange.toFixed(2) : '****',
            suffix: showValues ? ` (${stats.dayChangePercent.toFixed(2)}%)` : '',
            icon: stats.dayChange >= 0 ? TrendingUpIcon : TrendingDownIcon,
            color: stats.dayChange >= 0 ? 'text-green-400' : 'text-red-400',
            bgColor: stats.dayChange >= 0 ? 'from-green-500/20 to-green-600/20' : 'from-red-500/20 to-red-600/20'
          },
          {
            title: 'DSTK Balance',
            value: showValues ? balance : '****',
            suffix: showValues ? ' DSTK' : '',
            icon: WalletIcon,
            color: 'text-purple-400',
            bgColor: 'from-purple-500/20 to-purple-600/20'
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            className={`glass-card p-6 bg-gradient-to-br ${card.bgColor}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">{card.title}</h3>
                <div className={`text-2xl font-bold ${card.color}`}>
                  <AnimatedCounter 
                    value={typeof card.value === 'string' && card.value.includes('*') ? 0 : parseFloat(card.value.toString().replace(/[^0-9.-]/g, ''))} 
                    decimals={2}
                    duration={1000}
                  />
                  {card.suffix}
                </div>
              </div>
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Portfolio Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TradingChart symbol="PORTFOLIO" height={400} />
      </motion.div>

      {/* Holdings Table */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Holdings Overview
          </h2>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass-card p-2 bg-transparent border-0 focus:ring-2 focus:ring-blue-500/50 text-sm"
            >
              <option value="value">Value</option>
              <option value="pnl">P&L</option>
              <option value="change">Change</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : holdings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              No Holdings Yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start trading to build your portfolio and track your investments.
            </p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  {[
                    'Company',
                    'Holdings',
                    'Current Price',
                    'Total Value',
                    'P&L',
                    '24h Change',
                    'Allocation'
                  ].map((header) => (
                    <th key={header} className="text-left py-4 px-4 text-gray-300 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sortedHoldings.map((holding, index) => (
                    <motion.tr
                      key={holding.companyId}
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                                        flex items-center justify-center text-white font-bold text-sm">
                            {holding.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{holding.companyName}</div>
                            <div className="text-sm text-gray-400">{holding.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">{holding.shares} shares</div>
                        <div className="text-sm text-gray-400">
                          Avg: {showValues ? holding.avgBuyPrice : '***'} DSTK
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">
                          {showValues ? holding.currentPrice : '***'} DSTK
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">
                          {showValues ? holding.totalValue : '***'} DSTK
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`font-semibold ${holding.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {showValues ? (holding.pnl >= 0 ? '+' : '') + holding.pnl.toFixed(2) : '***'} DSTK
                        </div>
                        <div className={`text-sm ${holding.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`font-semibold ${holding.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${holding.allocation}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 min-w-[3rem]">
                            {holding.allocation.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
