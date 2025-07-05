'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useAccount } from 'wagmi';
import { ShoppingCartIcon, DollarSignIcon, TrendingUpIcon, TrendingDownIcon, AlertCircleIcon } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { LoadingSpinner } from './LoadingSpinner';

const schema = z.object({
  companyId: z.string().min(1, 'Please select a company'),
  amount: z.string().min(1, 'Amount is required'),
});

type FormData = z.infer<typeof schema>;

interface Company {
  id: number;
  name: string;
  price: string;
}

export function TradeView() {
  const { isConnected } = useAccount();
  const { buyShares, sellShares, nextCompanyId, isPending, isConfirming, isConfirmed, error } = useDeStock();
  const { balance } = useDSTK();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [userShares, setUserShares] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration by ensuring client-side rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedCompanyId = watch('companyId');
  const watchedAmount = watch('amount');

  useEffect(() => {
    if (isConnected && nextCompanyId > 0) {
      loadCompanies();
    }
  }, [isConnected, nextCompanyId]);

  useEffect(() => {
    if (watchedCompanyId) {
      const company = companies.find(c => c.id.toString() === watchedCompanyId);
      if (company) {
        setSelectedCompany(company);
        loadUserShares();
      }
    }
  }, [watchedCompanyId, companies]);

  const loadCompanies = async () => {
    try {
      // Placeholder implementation - would need real contract calls
      const companiesData: Company[] = [];
      for (let i = 0; i < nextCompanyId; i++) {
        companiesData.push({
          id: i,
          name: `Company ${i + 1}`,
          price: '12.5',
        });
      }
      setCompanies(companiesData);
    } catch (error) {
      console.error('Failed to load companies:', error);
    }
  };

  const loadUserShares = async () => {
    try {
      // TODO: Implement actual contract call using companyId
      // Placeholder implementation - would need real contract calls
      setUserShares('100');
    } catch (error) {
      console.error('Failed to load user shares:', error);
      setUserShares('0');
    }
  };

  const calculateCost = () => {
    if (!selectedCompany || !watchedAmount) return '0';
    const price = parseFloat(selectedCompany.price) || 0;
    const amount = parseFloat(watchedAmount) || 0;
    return (price * amount).toFixed(2);
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedCompany) return;

    setLoading(true);
    try {
      if (tradeType === 'buy') {
        await buyShares(selectedCompany.id, data.amount);
      } else {
        await sellShares(selectedCompany.id, data.amount);
      }
      reset();
    } catch (error) {
      console.error('Trade failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const canTrade = () => {
    if (!selectedCompany || !watchedAmount) return false;
    
    const amount = parseFloat(watchedAmount) || 0;
    if (amount <= 0) return false;

    if (tradeType === 'buy') {
      const cost = parseFloat(calculateCost()) || 0;
      const userBalance = parseFloat(balance) || 0;
      return userBalance >= cost;
    } else {
      const userSharesAmount = parseFloat(userShares) || 0;
      return userSharesAmount >= amount;
    }
  };

  // Prevent hydration mismatch by only rendering after client-side mount
  if (!mounted) {
    return (
      <div className="trading-card text-center" suppressHydrationWarning={true}>
        <ShoppingCartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Trade Shares
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Loading trading interface...
        </p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="trading-card text-center">
        <ShoppingCartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to start trading shares.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      suppressHydrationWarning={true}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.h3 
          className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Trade Shares
        </motion.h3>
        
        {/* Buy/Sell Toggle */}
        <motion.div 
          className="flex glass-button rounded-lg p-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.button
            onClick={() => setTradeType('buy')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              tradeType === 'buy'
                ? 'bg-success text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-1">
              <TrendingUpIcon className="w-4 h-4" />
              <span>Buy</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => setTradeType('sell')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              tradeType === 'sell'
                ? 'bg-danger text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-1">
              <TrendingDownIcon className="w-4 h-4" />
              <span>Sell</span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Company Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="destock-label" htmlFor="companyId">
            Select Company
          </label>
          <select
            {...register('companyId')}
            id="companyId"
            className="destock-input"
          >
            <option value="">Choose a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id.toString()}>
                {company.name} - {company.price} DSTK
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.companyId && (
              <motion.p 
                className="mt-1 text-sm text-danger flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircleIcon className="w-4 h-4" />
                <span>{errors.companyId.message}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Company Info Card */}
        <AnimatePresence>
          {selectedCompany && (
            <motion.div 
              className="glass-card p-4"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {selectedCompany.name}
                </span>
                <motion.span 
                  className="text-lg font-bold text-destock-primary"
                  key={selectedCompany.price} // Trigger animation on price change
                  initial={{ scale: 1.2, color: '#10B981' }}
                  animate={{ scale: 1, color: '#3B82F6' }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedCounter 
                    value={parseFloat(selectedCompany.price) || 0} 
                    suffix=" DSTK"
                    decimals={2}
                  />
                </motion.span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                <span>Your Holdings:</span>
                <AnimatedCounter 
                  value={parseFloat(userShares) || 0} 
                  suffix=" shares"
                  decimals={0}
                  className="font-medium"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="destock-label" htmlFor="amount">
            Amount
          </label>
          <input
            {...register('amount')}
            type="number"
            step="1"
            min="1"
            id="amount"
            className="destock-input"
            placeholder="Number of shares"
          />
          <AnimatePresence>
            {errors.amount && (
              <motion.p 
                className="mt-1 text-sm text-danger flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircleIcon className="w-4 h-4" />
                <span>{errors.amount.message}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Transaction Summary */}
        <AnimatePresence>
          {selectedCompany && watchedAmount && (
            <motion.div 
              className="glass-card p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
                <DollarSignIcon className="w-4 h-4" />
                <span>Transaction Summary</span>
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Shares:</span>
                  <span className="font-medium">{watchedAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per share:</span>
                  <span className="font-medium">{selectedCompany.price} DSTK</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-white/10 dark:border-black/10 pt-2 text-gray-900 dark:text-gray-100">
                  <span>Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}:</span>
                  <AnimatedCounter 
                    value={parseFloat(calculateCost()) || 0} 
                    suffix=" DSTK"
                    decimals={2}
                    className={tradeType === 'buy' ? 'text-danger' : 'text-success'}
                  />
                </div>
              </div>
              {tradeType === 'buy' && (
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Your DSTK Balance:</span>
                  <AnimatedCounter 
                    value={parseFloat(balance || '0') || 0} 
                    suffix=" DSTK"
                    decimals={2}
                    className="font-medium"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="glass-card p-4 border border-danger/30 bg-danger/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <p className="text-sm text-danger flex items-center space-x-2">
                <AlertCircleIcon className="w-4 h-4" />
                <span>Transaction failed: {error.message}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!canTrade() || isPending || isConfirming || loading}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            tradeType === 'buy'
              ? 'bg-success hover:bg-success/80 text-white shadow-lg'
              : 'bg-danger hover:bg-danger/80 text-white shadow-lg'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {(isPending || isConfirming || loading) ? (
            <LoadingSpinner size="small" />
          ) : tradeType === 'buy' ? (
            <TrendingUpIcon className="w-5 h-5" />
          ) : (
            <TrendingDownIcon className="w-5 h-5" />
          )}
          <span>
            {isPending || isConfirming || loading
              ? 'Processing...'
              : !canTrade()
              ? tradeType === 'buy' 
                ? 'Insufficient Balance' 
                : 'Insufficient Shares'
              : `${tradeType === 'buy' ? 'Buy' : 'Sell'} Shares`}
          </span>
        </motion.button>

        {/* Success Display */}
        <AnimatePresence>
          {isConfirmed && (
            <motion.div 
              className="glass-card p-4 border border-success/30 bg-success/10"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <p className="text-sm text-success flex items-center space-x-2">
                <TrendingUpIcon className="w-4 h-4" />
                <span>Transaction completed successfully! 🎉</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
}
