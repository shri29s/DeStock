'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, ColorType, UTCTimestamp } from 'lightweight-charts';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { TrendingUpIcon, TrendingDownIcon, BarChart3Icon, LineChartIcon } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface ChartDataPoint {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface TradingChartProps {
  symbol?: string;
  data?: ChartDataPoint[];
  height?: number;
  showTimeframes?: boolean;
  showIndicators?: boolean;
  className?: string;
}

type Timeframe = '1H' | '4H' | '1D' | '1W' | '1M';
type ChartType = 'candlestick' | 'line' | 'area';

export function TradingChart({
  symbol = 'DEMO',
  data = [],
  height = 400,
  showTimeframes = true,
  showIndicators = true,
  className = '',
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const { theme } = useTheme();

  const timeframes: Timeframe[] = ['1H', '4H', '1D', '1W', '1M'];

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = theme === 'dark';
    
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: isDark ? '#E5E7EB' : '#374151',
      },
      grid: {
        vertLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        horzLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      crosshair: {
        mode: 1, // Normal crosshair
      },
      timeScale: {
        borderColor: isDark ? '#374151' : '#D1D5DB',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: isDark ? '#374151' : '#D1D5DB',
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00D4AA',
      downColor: '#F6465D',
      borderDownColor: '#F6465D',
      borderUpColor: '#00D4AA',
      wickDownColor: '#F6465D',
      wickUpColor: '#00D4AA',
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
      }
    };
  }, [height, theme]);

  // Update chart theme
  useEffect(() => {
    if (!chartRef.current) return;

    const isDark = theme === 'dark';
    
    chartRef.current.applyOptions({
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: isDark ? '#E5E7EB' : '#374151',
      },
      grid: {
        vertLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        horzLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      timeScale: {
        borderColor: isDark ? '#374151' : '#D1D5DB',
      },
      rightPriceScale: {
        borderColor: isDark ? '#374151' : '#D1D5DB',
      },
    });
  }, [theme]);

  // Load chart data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // If data is provided directly, use it
        if (data.length > 0) {
          setChartData(data);
          setLoading(false);
        } else {
          // Fetch data from API
          const response = await fetch(`/api/market?type=chart&symbol=${symbol}&timeframe=${selectedTimeframe}&days=30`);
          const result = await response.json();
          
          if (result.success && result.data) {
            const apiData = result.data.ohlc || [];
            
            // Convert to proper format for Lightweight Charts
            const formattedData = apiData.map((item: any) => ({
              ...item,
              time: item.time as UTCTimestamp,
            }));
            
            setChartData(formattedData);
          } else {
            console.warn('Failed to fetch chart data:', result);
            // Set empty data to stop loading
            setChartData([]);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load chart data:', error);
        setChartData([]);
        setLoading(false);
      }
    };

    loadData();
  }, [symbol, selectedTimeframe, data]);

  // Update chart data
  useEffect(() => {
    if (!candlestickSeriesRef.current || chartData.length === 0) return;

    candlestickSeriesRef.current.setData(chartData);
    
    // Fit content after data is loaded
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [chartData]);

  const handleTimeframeChange = (timeframe: Timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].close : 0;
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].close : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  return (
    <div className={`glass-card ${className}`}>
      {/* Chart Header */}
      <div className="p-4 border-b border-white/10 dark:border-black/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {symbol}
            </h3>
            
            {/* Price Information */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-1 ${isPositive ? 'text-success' : 'text-danger'}`}>
                {isPositive ? (
                  <TrendingUpIcon className="w-4 h-4" />
                ) : (
                  <TrendingDownIcon className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setChartType('candlestick')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'candlestick'
                  ? 'bg-destock-primary text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3Icon className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'line'
                  ? 'bg-destock-primary text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <LineChartIcon className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Timeframe Selector */}
        {showTimeframes && (
          <div className="flex space-x-1">
            {timeframes.map((timeframe) => (
              <motion.button
                key={timeframe}
                onClick={() => handleTimeframeChange(timeframe)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedTimeframe === timeframe
                    ? 'bg-destock-primary text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {timeframe}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <LoadingSpinner />
          </div>
        )}
        
        <motion.div
          ref={chartContainerRef}
          className={`${loading ? 'opacity-30' : 'opacity-100'} transition-opacity duration-200`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: loading ? 0.3 : 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ height: `${height}px` }}
        />
      </div>

      {/* Chart Footer with Stats */}
      <div className="p-4 border-t border-white/10 dark:border-black/10">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400 block">Open</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              ${chartData.length > 0 ? chartData[chartData.length - 1].open.toFixed(2) : '0.00'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400 block">High</span>
            <span className="font-medium text-success">
              ${chartData.length > 0 ? chartData[chartData.length - 1].high.toFixed(2) : '0.00'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400 block">Low</span>
            <span className="font-medium text-danger">
              ${chartData.length > 0 ? chartData[chartData.length - 1].low.toFixed(2) : '0.00'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400 block">Volume</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {chartData.length > 0 ? (chartData[chartData.length - 1].volume || 0).toLocaleString() : '0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
