'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useAccount } from 'wagmi';
import { REGISTRATION_FEE } from '@/lib/contracts';
import { formatUnits } from 'viem';

const schema = z.object({
  name: z.string().min(1, 'Company name is required').max(50, 'Name too long'),
  initialPrice: z.string().min(1, 'Initial price is required'),
  totalSupply: z.string().min(1, 'Total supply is required'),
});

type FormData = z.infer<typeof schema>;

export function CompanyRegistry() {
  const { isConnected, address } = useAccount();
  const { registerCompany, isPending, isConfirming, isConfirmed, error } = useDeStock();
  const { balance, approve, getAllowance } = useDSTK();
  const [needsApproval, setNeedsApproval] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedValues = watch();
  const estimatedCost = watchedValues.initialPrice && watchedValues.totalSupply 
    ? (parseFloat(watchedValues.initialPrice) * parseFloat(watchedValues.totalSupply) + 100).toString()
    : '100';

  const checkApproval = async () => {
    if (!isConnected || !address) return;
    
    // Check if user has enough balance
    const userBalance = parseFloat(balance);
    const requiredBalance = parseFloat(estimatedCost);
    
    if (userBalance < requiredBalance) {
      setNeedsApproval(true);
      return;
    }

    // Check allowance (this would need to be implemented properly with contract address)
    setNeedsApproval(false);
  };

  const handleApprove = async () => {
    if (!address) return;
    
    // This would need the DeStock contract address
    // approve(destockContractAddress, estimatedCost);
  };

  const onSubmit = async (data: FormData) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    const userBalance = parseFloat(balance);
    if (userBalance < 100) {
      alert('Insufficient DSTK balance. You need at least 100 DSTK to register a company.');
      return;
    }

    try {
      await registerCompany(data.name, data.initialPrice, data.totalSupply);
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="destock-card text-center py-8">
        <h3 className="text-lg font-medium text-high-contrast mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-medium-contrast">
          Please connect your wallet to register a company.
        </p>
      </div>
    );
  }

  return (
    <div className="destock-card">
      <div className="p-6">
        <h3 className="text-lg font-medium text-high-contrast mb-6">
          Register Your Company
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="destock-label" htmlFor="name">
              Company Name
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="destock-input"
              placeholder="Enter company name"
            />
            {errors.name && (
              <p className="mt-1 text-sm danger">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="destock-label" htmlFor="initialPrice">
              Initial Share Price (DSTK)
            </label>
            <input
              {...register('initialPrice')}
              type="number"
              step="0.01"
              min="0.01"
              id="initialPrice"
              className="destock-input"
              placeholder="10.00"
            />
            {errors.initialPrice && (
              <p className="mt-1 text-sm danger">{errors.initialPrice.message}</p>
            )}
          </div>

          <div>
            <label className="destock-label" htmlFor="totalSupply">
              Total Share Supply
            </label>
            <input
              {...register('totalSupply')}
              type="number"
              min="1"
              id="totalSupply"
              className="destock-input"
              placeholder="1000"
            />
            {errors.totalSupply && (
              <p className="mt-1 text-sm danger">{errors.totalSupply.message}</p>
            )}
          </div>

          <div className="bg-high-visibility p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-high-contrast mb-2">Cost Breakdown</h4>
            <div className="space-y-1 text-sm text-medium-contrast">
              <div className="flex justify-between">
                <span>Registration Fee:</span>
                <span>100 DSTK</span>
              </div>
              {watchedValues.initialPrice && watchedValues.totalSupply && (
                <div className="flex justify-between">
                  <span>Initial Liquidity:</span>
                  <span>
                    {(parseFloat(watchedValues.initialPrice) * parseFloat(watchedValues.totalSupply)).toFixed(2)} DSTK
                  </span>
                </div>
              )}
              <div className="flex justify-between font-medium border-t border-gray-300 dark:border-gray-600 pt-1 text-high-contrast">
                <span>Total Cost:</span>
                <span>{estimatedCost} DSTK</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-low-contrast">
              Your Balance: {balance} DSTK
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm danger">
                Registration failed: {error.message}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || isConfirming || parseFloat(balance) < parseFloat(estimatedCost)}
            className="w-full destock-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending || isConfirming
              ? 'Processing...'
              : parseFloat(balance) < parseFloat(estimatedCost)
              ? 'Insufficient Balance'
              : 'Register Company'}
          </button>

          {isConfirmed && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm success">
                Company registered successfully! 🎉
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
