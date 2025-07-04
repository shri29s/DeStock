'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useDeStock } from '../lib/hooks/useDeStock';

interface LiquidityProviderProps {
  companyId: number;
  currentPrice?: number;
}

export default function LiquidityProvider({ companyId, currentPrice = 0 }: LiquidityProviderProps) {
  const { address } = useAccount();
  const { addLiquidity, removeLiquidity, getLPTokenBalance, isPending } = useDeStock();
  
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  const [tokenAmount, setTokenAmount] = useState('');
  const [shareAmount, setShareAmount] = useState('');
  const [lpTokenAmount, setLpTokenAmount] = useState('');

  const { data: lpBalance } = getLPTokenBalance(companyId);

  const handleTokenAmountChange = (value: string) => {
    setTokenAmount(value);
    if (currentPrice > 0) {
      const calculatedShares = (parseFloat(value) || 0) / currentPrice;
      setShareAmount(calculatedShares.toFixed(0));
    }
  };

  const handleShareAmountChange = (value: string) => {
    setShareAmount(value);
    if (currentPrice > 0) {
      const calculatedTokens = (parseFloat(value) || 0) * currentPrice;
      setTokenAmount(calculatedTokens.toFixed(4));
    }
  };

  const handleAddLiquidity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenAmount || !shareAmount) return;
    
    addLiquidity(companyId, tokenAmount, shareAmount);
    setTokenAmount('');
    setShareAmount('');
  };

  const handleRemoveLiquidity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lpTokenAmount) return;
    
    removeLiquidity(companyId, lpTokenAmount);
    setLpTokenAmount('');
  };

  const isAddFormValid = () => {
    return address && tokenAmount && shareAmount && parseFloat(tokenAmount) > 0 && parseFloat(shareAmount) > 0;
  };

  const isRemoveFormValid = () => {
    return address && lpTokenAmount && parseFloat(lpTokenAmount) > 0;
  };

  if (!address) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Liquidity Provider</h3>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Connect your wallet to provide liquidity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Liquidity Provider</h3>
        {lpBalance && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Your LP Tokens: {lpBalance.toString()}
          </p>
        )}
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex mb-6 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Add Liquidity
          </button>
          <button
            onClick={() => setActiveTab('remove')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'remove'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Remove Liquidity
          </button>
        </div>

        {/* Add Liquidity Form */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddLiquidity} className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Important Information
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• You'll receive LP tokens representing your share of the pool</li>
                <li>• LP tokens earn trading fees from the pool</li>
                <li>• Token amounts are automatically calculated based on current ratio</li>
                <li>• You're exposed to impermanent loss risk</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                DSTK Token Amount
              </label>
              <input
                type="number"
                value={tokenAmount}
                onChange={(e) => handleTokenAmountChange(e.target.value)}
                placeholder="0.0000"
                min="0"
                step="0.0001"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Share Amount
              </label>
              <input
                type="number"
                value={shareAmount}
                onChange={(e) => handleShareAmountChange(e.target.value)}
                placeholder="0"
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {currentPrice > 0 && tokenAmount && shareAmount && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Liquidity Summary</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">DSTK Tokens:</span>
                    <span className="text-gray-900 dark:text-white">{tokenAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shares:</span>
                    <span className="text-gray-900 dark:text-white">{shareAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rate:</span>
                    <span className="text-gray-900 dark:text-white">1 Share = {currentPrice.toFixed(4)} DSTK</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!isAddFormValid() || isPending}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Liquidity...
                </div>
              ) : (
                'Add Liquidity'
              )}
            </button>
          </form>
        )}

        {/* Remove Liquidity Form */}
        {activeTab === 'remove' && (
          <form onSubmit={handleRemoveLiquidity} className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Remove Liquidity
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                Removing liquidity will burn your LP tokens and return the underlying assets.
                You'll stop earning fees from this pool.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LP Token Amount
              </label>
              <input
                type="number"
                value={lpTokenAmount}
                onChange={(e) => setLpTokenAmount(e.target.value)}
                placeholder="0"
                min="0"
                max={lpBalance ? lpBalance.toString() : undefined}
                step="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {lpBalance && (
                <div className="mt-2 flex gap-2">
                  {['25%', '50%', '75%', '100%'].map((percentage) => (
                    <button
                      key={percentage}
                      type="button"
                      onClick={() => {
                        const balance = Number(lpBalance);
                        const percentageMap = { '25%': 0.25, '50%': 0.5, '75%': 0.75, '100%': 1 };
                        const amount = Math.floor(balance * percentageMap[percentage as keyof typeof percentageMap]);
                        setLpTokenAmount(amount.toString());
                      }}
                      className="py-1 px-3 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {percentage}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!isRemoveFormValid() || isPending}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Removing Liquidity...
                </div>
              ) : (
                'Remove Liquidity'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
