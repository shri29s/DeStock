'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '../lib/providers/WebSocketProvider';
import { useDeStock } from '../lib/hooks/useDeStock';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  companyId: number;
  height?: number;
}

export default function OrderBook({ companyId, height = 400 }: OrderBookProps) {
  const { orderBooks, subscribe, unsubscribe, isConnected } = useWebSocket();
  const { getSharePrice } = useDeStock();
  const [spread, setSpread] = useState<number>(0);
  const [spreadPercentage, setSpreadPercentage] = useState<number>(0);

  const orderBookData = orderBooks.get(companyId);

  useEffect(() => {
    subscribe(companyId);
    return () => unsubscribe(companyId);
  }, [companyId, subscribe, unsubscribe]);

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

  if (!isConnected) {
    return (
      <div className="h-96 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Connecting to market data...</p>
        </div>
      </div>
    );
  }

  if (!orderBookData) {
    return (
      <div className="h-96 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading order book...</p>
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
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {isConnected ? 'Live' : 'Disconnected'}
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
                      width: `${(ask.total / maxTotal) * 100}%`,
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
                      width: `${(bid.total / maxTotal) * 100}%`,
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
