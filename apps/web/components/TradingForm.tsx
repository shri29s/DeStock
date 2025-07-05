'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useDeStock } from '../lib/hooks/useDeStock';
import { useDSTK } from '../lib/hooks/useDSTK';
import { handleFaucetRequest, type FaucetRequestOptions } from '../lib/utils/faucetUtils';
import { GiftIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface TradingFormProps {
  companyId: number;
  currentPrice?: number;
}

type OrderType = 'market' | 'limit';
type OrderSide = 'buy' | 'sell';

export default function TradingForm({ companyId, currentPrice = 0 }: TradingFormProps) {
  const { address, chain } = useAccount();
  const { buyShares, sellShares, placeOrder, isPending, isConfirming, isConfirmed, error, contractAddress } = useDeStock();
  const { balance, refetchBalance, approve } = useDSTK();
  const queryClient = useQueryClient();
  
  const [orderSide, setOrderSide] = useState<OrderSide>('buy');
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  // Get current allowance for DeStock contract
  // TODO: Fix allowance checking after hook refactor
  const currentAllowance = 0;

  // Check if approval is needed for buy orders
  const checkApproval = () => {
    if (orderSide !== 'buy' || !total || !contractAddress) {
      setNeedsApproval(false);
      return;
    }
    
    const totalCost = parseFloat(total) || 0;
    const sufficient = currentAllowance >= totalCost;
    setNeedsApproval(!sufficient);
  };

  // Check approval whenever values change
  useEffect(() => {
    checkApproval();
  }, [orderSide, total, currentAllowance, contractAddress]);

  const handleApprove = async () => {
    if (!contractAddress || !total) return;
    
    setIsApproving(true);
    try {
      await approve(contractAddress, total);
      toast.success('DSTK approval confirmed!');
    } catch (error) {
      console.error('Approval failed:', error);
      toast.error('Approval failed. Please try again.');
    } finally {
      setIsApproving(false);
    }
  };

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

  const handleFaucetClick = async () => {
    if (!address || !chain?.id) return;
    
    const requestOptions: FaucetRequestOptions = {
      address,
      chainId: chain.id,
      onSuccess: () => {
        // On success, refetch balance
        refetchBalance();
      },
      onError: (error) => {
        // Error handling is already done in handleFaucetRequest
        console.error('Faucet request failed:', error);
      },
      onLoading: setIsFaucetLoading
    };

    await handleFaucetRequest(requestOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !amount || (!price && orderType === 'limit')) {
      return;
    }

    if (orderSide === 'buy' && needsApproval) {
      toast.error('Please approve DSTK spending first.');
      return;
    }

    try {
      if (orderType === 'market') {
        if (orderSide === 'buy') {
          buyShares(companyId, amount);
        } else {
          sellShares(companyId, amount);
        }
      } else {
        placeOrder(companyId, orderSide === 'buy', amount, price);
      }
    } catch (error) {
      console.error('Trade failed:', error);
      toast.error('Trade failed. Please try again.');
    }
  };

  // Reset form and refresh portfolio after successful trade
  useEffect(() => {
    if (isConfirmed) {
      // Reset form
      setAmount('');
      setPrice('');
      setTotal('');
      
      // Refresh portfolio data
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      
      // Show success message
      toast.success('Trade executed successfully! 🎉');
      
      // Refresh balance
      refetchBalance();
    }
  }, [isConfirmed, queryClient, refetchBalance]);

  // Show error messages
  useEffect(() => {
    if (error) {
      toast.error(`Transaction failed: ${error.message}`);
    }
  }, [error]);

  const isFormValid = () => {
    if (!address || !amount) return false;
    if (orderType === 'limit' && !price) return false;
    
    // Check DSTK balance for buy orders
    if (orderSide === 'buy') {
      const totalCost = parseFloat(total) || 0;
      const userBalance = parseFloat(balance) || 0;
      if (totalCost > userBalance) return false;
      if (needsApproval) return false; // Can't submit if approval is needed
    }
    
    return true;
  };

  const hasInsufficientBalance = () => {
    if (!address || orderSide !== 'buy' || !total) return false;
    const totalCost = parseFloat(total) || 0;
    const userBalance = parseFloat(balance) || 0;
    return totalCost > userBalance;
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

        {/* Approval Required Warning */}
        {needsApproval && orderSide === 'buy' && !hasInsufficientBalance() && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Approval Required
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  You need to approve {total} DSTK spending for the DeStock contract. Current allowance: {currentAllowance.toFixed(4)} DSTK
                </p>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {isApproving ? 'Approving...' : `Approve ${total} DSTK`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Insufficient Balance Warning and Faucet Option */}
        {hasInsufficientBalance() && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Insufficient DSTK Balance
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  You need {total} DSTK but only have {balance} DSTK. Get test tokens to continue trading.
                </p>
                <button
                  type="button"
                  onClick={handleFaucetClick}
                  disabled={isFaucetLoading}
                  className="mt-3 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <GiftIcon className="w-4 h-4" />
                  <span>{isFaucetLoading ? 'Getting Tokens...' : 'Get Test Tokens'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid() || isPending || isConfirming}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            orderSide === 'buy'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isPending || isConfirming ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {isPending ? 'Submitting...' : 'Confirming...'}
            </div>
          ) : needsApproval && orderSide === 'buy' ? (
            'Approval Required'
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
