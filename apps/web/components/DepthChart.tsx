'use client';

import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '../lib/providers/WebSocketProvider';
import { AlertTriangle, RefreshCw, WifiOff, TrendingUp } from 'lucide-react';

interface DepthChartProps {
  companyId: number;
  height?: number;
}

interface ChartData {
  price: number;
  cumulativeAmount: number;
  side: 'bid' | 'ask';
}

export default function DepthChart({ companyId, height = 300 }: DepthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { orderBooks, subscribe, unsubscribe, connectionStatus, error, reconnect } = useWebSocket();
  const [chartData, setChartData] = useState<{ bids: ChartData[]; asks: ChartData[] }>({ bids: [], asks: [] });
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const orderBookData = orderBooks.get(companyId);

  useEffect(() => {
    if (connectionStatus !== 'disabled') {
      subscribe(companyId);
    }
    return () => unsubscribe(companyId);
  }, [companyId, subscribe, unsubscribe, connectionStatus]);

  // Set loading timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeout);
  }, []);

  // Reset timeout when data loads
  useEffect(() => {
    if (orderBookData) {
      setLoadingTimeout(false);
    }
  }, [orderBookData]);

  useEffect(() => {
    if (!orderBookData) return;

    // Process bids (buy orders)
    const sortedBids = [...orderBookData.bids].sort((a, b) => b.price - a.price);
    let cumulativeBid = 0;
    const bidData: ChartData[] = sortedBids.map(bid => {
      cumulativeBid += bid.amount;
      return {
        price: bid.price,
        cumulativeAmount: cumulativeBid,
        side: 'bid' as const
      };
    });

    // Process asks (sell orders)
    const sortedAsks = [...orderBookData.asks].sort((a, b) => a.price - b.price);
    let cumulativeAsk = 0;
    const askData: ChartData[] = sortedAsks.map(ask => {
      cumulativeAsk += ask.amount;
      return {
        price: ask.price,
        cumulativeAmount: cumulativeAsk,
        side: 'ask' as const
      };
    });

    setChartData({ bids: bidData, asks: askData });
  }, [orderBookData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.bids.length === 0 || chartData.asks.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Calculate bounds
    const allData = [...chartData.bids, ...chartData.asks];
    const minPrice = Math.min(...allData.map(d => d.price));
    const maxPrice = Math.max(...allData.map(d => d.price));
    const maxAmount = Math.max(...allData.map(d => d.cumulativeAmount));

    const padding = 40;
    const chartWidth = rect.width - 2 * padding;
    const chartHeight = rect.height - 2 * padding;

    // Helper functions
    const scaleX = (price: number) => padding + ((price - minPrice) / (maxPrice - minPrice)) * chartWidth;
    const scaleY = (amount: number) => rect.height - padding - (amount / maxAmount) * chartHeight;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (i / 5) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Draw bid area (green)
    if (chartData.bids.length > 0) {
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(scaleX(chartData.bids[0].price), scaleY(0));
      
      chartData.bids.forEach((bid, i) => {
        const x = scaleX(bid.price);
        const y = scaleY(bid.cumulativeAmount);
        
        if (i === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, scaleY(chartData.bids[i - 1].cumulativeAmount));
          ctx.lineTo(x, y);
        }
      });
      
      const lastBid = chartData.bids[chartData.bids.length - 1];
      ctx.lineTo(scaleX(lastBid.price), scaleY(0));
      ctx.closePath();
      ctx.fill();
      
      // Draw bid line
      ctx.beginPath();
      ctx.moveTo(scaleX(chartData.bids[0].price), scaleY(chartData.bids[0].cumulativeAmount));
      chartData.bids.forEach((bid, i) => {
        if (i > 0) {
          const x = scaleX(bid.price);
          const y = scaleY(bid.cumulativeAmount);
          ctx.lineTo(x, scaleY(chartData.bids[i - 1].cumulativeAmount));
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Draw ask area (red)
    if (chartData.asks.length > 0) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(scaleX(chartData.asks[0].price), scaleY(0));
      
      chartData.asks.forEach((ask, i) => {
        const x = scaleX(ask.price);
        const y = scaleY(ask.cumulativeAmount);
        
        if (i === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, scaleY(chartData.asks[i - 1].cumulativeAmount));
          ctx.lineTo(x, y);
        }
      });
      
      const lastAsk = chartData.asks[chartData.asks.length - 1];
      ctx.lineTo(scaleX(lastAsk.price), scaleY(0));
      ctx.closePath();
      ctx.fill();
      
      // Draw ask line
      ctx.beginPath();
      ctx.moveTo(scaleX(chartData.asks[0].price), scaleY(chartData.asks[0].cumulativeAmount));
      chartData.asks.forEach((ask, i) => {
        if (i > 0) {
          const x = scaleX(ask.price);
          const y = scaleY(ask.cumulativeAmount);
          ctx.lineTo(x, scaleY(chartData.asks[i - 1].cumulativeAmount));
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Draw axes labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels (prices)
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (i / 5) * (maxPrice - minPrice);
      const x = padding + (i / 5) * chartWidth;
      ctx.fillText(price.toFixed(4), x, rect.height - 10);
    }
    
    // Y-axis labels (amounts)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const amount = (i / 5) * maxAmount;
      const y = rect.height - padding - (i / 5) * chartHeight + 4;
      ctx.fillText(amount.toLocaleString(), padding - 10, y);
    }

  }, [chartData]);

  // Helper function to get connection status indicator  
  const getConnectionStatusIndicator = () => {
    const statusColors = {
      connected: 'bg-green-500',
      connecting: 'bg-yellow-500 animate-pulse',
      disconnected: 'bg-gray-500',
      error: 'bg-red-500',
      disabled: 'bg-gray-400'
    };
    
    const statusLabels = {
      connected: 'Live',
      connecting: 'Connecting',
      disconnected: 'Disconnected',
      error: 'Error',
      disabled: 'Disabled'
    };
    
    return {
      color: statusColors[connectionStatus] || 'bg-gray-400',
      label: statusLabels[connectionStatus] || 'Unknown'
    };
  };

  // Error state
  if (connectionStatus === 'error' || (loadingTimeout && !orderBookData)) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Depth</h3>
        </div>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <div className="text-center max-w-sm">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Chart Unavailable
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {error || 'Unable to load market depth chart. Real-time data connection failed.'}
            </p>
            <button
              onClick={reconnect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Disabled state
  if (connectionStatus === 'disabled') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Depth</h3>
        </div>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <div className="text-center">
            <WifiOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Real-time Data Disabled
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Market depth chart requires WebSocket connection
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (connectionStatus === 'connecting' || (!orderBookData && !loadingTimeout)) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Depth</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-yellow-500 animate-pulse"></div>
                Connecting
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading depth chart...</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!orderBookData || chartData.bids.length === 0 || chartData.asks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Depth</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                Connected
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Market Depth
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Waiting for order book data to generate depth chart
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Depth</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Bids</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Asks</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${getConnectionStatusIndicator().color}`}></div>
                {getConnectionStatusIndicator().label}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: height - 80 }}
        />
      </div>
    </div>
  );
}
