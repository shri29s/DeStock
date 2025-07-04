'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useAccount } from 'wagmi';
import { ShoppingCartIcon, DollarSignIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

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
  const { buyShares, sellShares, getSharePrice, getShareBalance, nextCompanyId, isPending, isConfirming, isConfirmed, error } = useDeStock();
  const { balance } = useDSTK();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [userShares, setUserShares] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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
        loadUserShares(company.id);
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

  const loadUserShares = async (companyId: number) => {
    try {
      // Placeholder implementation - would need real contract calls
      setUserShares('100');
    } catch (error) {
      console.error('Failed to load user shares:', error);
      setUserShares('0');
    }
  };

  const calculateCost = () => {
    if (!selectedCompany || !watchedAmount) return '0';
    return (parseFloat(selectedCompany.price) * parseFloat(watchedAmount)).toFixed(2);
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
    
    const amount = parseFloat(watchedAmount);
    if (amount <= 0) return false;

    if (tradeType === 'buy') {
      const cost = parseFloat(calculateCost());
      return parseFloat(balance) >= cost;
    } else {
      return parseFloat(userShares) >= amount;
    }
  };

  if (!isConnected) {
    return (
      <div className="trading-card text-center">
        <ShoppingCartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-gray-600">
          Connect your wallet to start trading shares.
        </p>
      </div>
    );
  }

  return (
    <div className="trading-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Trade Shares</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTradeType('buy')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              tradeType === 'buy'
                ? 'bg-white text-destock-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType('sell')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              tradeType === 'sell'
                ? 'bg-white text-destock-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
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
          {errors.companyId && (
            <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>
          )}
        </div>

        {selectedCompany && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {selectedCompany.name}
              </span>
              <span className="text-lg font-semibold text-destock-primary">
                {selectedCompany.price} DSTK
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Your Balance: {userShares} shares
            </div>
          </div>
        )}

        <div>
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
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        {selectedCompany && watchedAmount && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Transaction Summary</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Shares:</span>
                <span>{watchedAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per share:</span>
                <span>{selectedCompany.price} DSTK</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}:</span>
                <span>{calculateCost()} DSTK</span>
              </div>
            </div>
            {tradeType === 'buy' && (
              <div className="mt-2 text-xs text-gray-500">
                Your DSTK Balance: {balance} DSTK
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800">
              Transaction failed: {error.message}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!canTrade() || isPending || isConfirming || loading}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            tradeType === 'buy'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {tradeType === 'buy' ? (
            <TrendingUpIcon className="w-4 h-4" />
          ) : (
            <TrendingDownIcon className="w-4 h-4" />
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
        </button>

        {isConfirmed && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              Transaction completed successfully! 🎉
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
