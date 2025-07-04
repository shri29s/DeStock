'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useDeStock } from '../lib/hooks/useDeStock';

interface TradingFormProps {
  companyId: number;
  currentPrice?: number;
}

type OrderType = 'market' | 'limit';
type OrderSide = 'buy' | 'sell';

export default function TradingForm({ companyId, currentPrice = 0 }: TradingFormProps) {
  const { address } = useAccount();
  const { buyShares, sellShares, placeOrder, isPending } = useDeStock();
  
  const [orderSide, setOrderSide] = useState<OrderSide>('buy');
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');

  // Calculate total when amount or price changes
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (orderType === 'limit' && price) {
      const calculatedTotal = (parseFloat(value) || 0) * (parseFloat(price) || 0);
      setTotal(calculatedTotal.toFixed(4));
    } else if (orderType === 'market' && currentPrice) {
      const calculatedTotal = (parseFloat(value) || 0) * currentPrice;
      setTotal(calculatedTotal.toFixed(4));
    }
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    if (amount) {
      const calculatedTotal = (parseFloat(amount) || 0) * (parseFloat(value) || 0);
      setTotal(calculatedTotal.toFixed(4));
    }
  };

  const handleTotalChange = (value: string) => {
    setTotal(value);
    if (orderType === 'limit' && price) {
      const calculatedAmount = (parseFloat(value) || 0) / (parseFloat(price) || 0);
      setAmount(calculatedAmount.toFixed(0));
    } else if (orderType === 'market' && currentPrice) {
      const calculatedAmount = (parseFloat(value) || 0) / currentPrice;
      setAmount(calculatedAmount.toFixed(0));
    }
  };

  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType(type);
    if (type === 'market') {
      setPrice(currentPrice.toString());
      if (amount && currentPrice) {
        const calculatedTotal = (parseFloat(amount) || 0) * currentPrice;
        setTotal(calculatedTotal.toFixed(4));
      }
    } else {
      setPrice('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !amount || (!price && orderType === 'limit')) {
      return;
    }

    if (orderType === 'market') {
      if (orderSide === 'buy') {
        buyShares(companyId, amount);
      } else {
        sellShares(companyId, amount);
      }
    } else {
      placeOrder(companyId, orderSide === 'buy', amount, price);
    }

    // Reset form
    setAmount('');
    setPrice('');
    setTotal('');
  };

  const isFormValid = () => {
    if (!address || !amount) return false;
    if (orderType === 'limit' && !price) return false;
    return true;
  };

  if (!address) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Place Order</h3>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Connect your wallet to start trading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Place Order</h3>
        {currentPrice > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Current Price: {currentPrice.toFixed(4)} DSTK
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Order Side */}
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
          <button
            type="button"
            onClick={() => setOrderSide('buy')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              orderSide === 'buy'
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setOrderSide('sell')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              orderSide === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Sell
          </button>
        </div>

        {/* Order Type */}
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
          <button
            type="button"
            onClick={() => handleOrderTypeChange('market')}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
              orderType === 'market'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Market
          </button>
          <button
            type="button"
            onClick={() => handleOrderTypeChange('limit')}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
              orderType === 'limit'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Limit
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount (Shares)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0"
            min="0"
            step="1"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Price Input (for limit orders) */}
        {orderType === 'limit' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price (DSTK per share)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="0.0000"
              min="0"
              step="0.0001"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        {/* Total Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total (DSTK)
          </label>
          <input
            type="number"
            value={total}
            onChange={(e) => handleTotalChange(e.target.value)}
            placeholder="0.0000"
            min="0"
            step="0.0001"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {['25%', '50%', '75%', '100%'].map((percentage) => (
            <button
              key={percentage}
              type="button"
              onClick={() => {
                // This would calculate based on available balance
                // For now, just set example amounts
                const amounts = { '25%': '25', '50%': '50', '75%': '75', '100%': '100' };
                handleAmountChange(amounts[percentage as keyof typeof amounts]);
              }}
              className="py-2 px-3 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {percentage}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid() || isPending}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            orderSide === 'buy'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            `${orderSide === 'buy' ? 'Buy' : 'Sell'} ${orderType === 'market' ? 'Market' : 'Limit'}`
          )}
        </button>

        {/* Order Summary */}
        {amount && (orderType === 'market' || price) && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Order Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Side:</span>
                <span className={`font-medium ${orderSide === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {orderSide.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type:</span>
                <span className="text-gray-900 dark:text-white">{orderType.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="text-gray-900 dark:text-white">{amount} shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Price:</span>
                <span className="text-gray-900 dark:text-white">
                  {orderType === 'market' ? `${currentPrice.toFixed(4)} (Market)` : price} DSTK
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                <span className="text-gray-600 dark:text-gray-400">Total:</span>
                <span className="font-medium text-gray-900 dark:text-white">{total} DSTK</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
