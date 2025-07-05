'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '../lib/providers/WebSocketProvider';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface OrderBookProps {
  companyId: number;
  height?: number;
}

export default function OrderBook({ companyId, height = 400 }: OrderBookProps) {
  const { orderBooks, subscribe, unsubscribe, connectionStatus, error, reconnect } = useWebSocket();
  const [spread, setSpread] = useState<number>(0);
  const [spreadPercentage, setSpreadPercentage] = useState<number>(0);
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
    if (orderBookData?.asks.length && orderBookData?.bids.length) {
      const bestAsk = Math.min(...orderBookData.asks.map(a => a.price));
      const bestBid = Math.max(...orderBookData.bids.map(b => b.price));
      const currentSpread = bestAsk - bestBid;
      const midPrice = (bestAsk + bestBid) / 2;
      
      setSpread(currentSpread);
      setSpreadPercentage(midPrice > 0 ? (currentSpread / midPrice) * 100 : 0);
    }
  }, [orderBookData]);

  const formatPrice = (price: number) => price.toFixed(4);
  const formatAmount = (amount: number) => amount.toLocaleString();

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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
        </div>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <div className="text-center max-w-sm">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Order Book Unavailable
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {error || 'Unable to connect to real-time market data. Trading services may be offline.'}
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
        </div>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <div className="text-center">
            <WifiOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Real-time Data Disabled
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Order book requires WebSocket connection to display live data
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading order book...</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state (connected but no order book data)
  if (!orderBookData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
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
              <Wifi className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Orders Available
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Waiting for order book data for this company
            </p>
          </div>
        </div>
      </div>
    );
  }

  const maxTotal = Math.max(
    ...orderBookData.bids.map(b => b.total),
    ...orderBookData.asks.map(a => a.total)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${getConnectionStatusIndicator().color}`}></div>
              {getConnectionStatusIndicator().label}
            </span>
          </div>
        </div>
        
        {spread > 0 && (
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Spread: <span className="text-gray-900 dark:text-white font-medium">{formatPrice(spread)}</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              (<span className="text-gray-900 dark:text-white font-medium">{spreadPercentage.toFixed(2)}%</span>)
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
          <div className="text-right">Price</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Total</div>
        </div>

        <div className="space-y-1" style={{ height: height - 120, overflowY: 'auto' }}>
          {/* Asks (Sell Orders) */}
          <div className="space-y-1">
            {orderBookData.asks
              .sort((a, b) => b.price - a.price)
              .slice(0, 10)
              .map((ask, index) => (
                <div key={`ask-${index}`} className="relative">
                  <div
                    className="absolute inset-0 bg-red-50 dark:bg-red-900/20"
                    style={{
                      width: `${maxTotal > 0 ? (ask.total / maxTotal) * 100 : 0}%`,
                      right: 0,
                    }}
                  ></div>
                  <div className="relative grid grid-cols-3 gap-4 text-sm py-1 px-2">
                    <div className="text-right text-red-600 dark:text-red-400 font-medium">
                      {formatPrice(ask.price)}
                    </div>
                    <div className="text-right text-gray-900 dark:text-white">
                      {formatAmount(ask.amount)}
                    </div>
                    <div className="text-right text-gray-600 dark:text-gray-400">
                      {formatAmount(ask.total)}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Spread indicator */}
          {spread > 0 && (
            <div className="my-4 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Spread: {formatPrice(spread)} ({spreadPercentage.toFixed(2)}%)
              </span>
            </div>
          )}

          {/* Bids (Buy Orders) */}
          <div className="space-y-1">
            {orderBookData.bids
              .sort((a, b) => b.price - a.price)
              .slice(0, 10)
              .map((bid, index) => (
                <div key={`bid-${index}`} className="relative">
                  <div
                    className="absolute inset-0 bg-green-50 dark:bg-green-900/20"
                    style={{
                      width: `${maxTotal > 0 ? (bid.total / maxTotal) * 100 : 0}%`,
                      right: 0,
                    }}
                  ></div>
                  <div className="relative grid grid-cols-3 gap-4 text-sm py-1 px-2">
                    <div className="text-right text-green-600 dark:text-green-400 font-medium">
                      {formatPrice(bid.price)}
                    </div>
                    <div className="text-right text-gray-900 dark:text-white">
                      {formatAmount(bid.amount)}
                    </div>
                    <div className="text-right text-gray-600 dark:text-gray-400">
                      {formatAmount(bid.total)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
