'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useDeStockToken } from '@/lib/hooks/useDeStockToken';
import { useAccount } from 'wagmi';
import { REGISTRATION_FEE, getContractAddress } from '@/lib/contracts';
import { formatUnits, parseEther } from 'viem';

const schema = z.object({
  name: z.string().min(1, 'Company name is required').max(50, 'Name too long'),
  totalSupply: z.string().min(1, 'Total supply is required'),
  initialLiquidity: z.string().min(1, 'Initial liquidity is required'),
  ipfsMetadataUri: z.string().min(1, 'IPFS Metadata URI is required'),
});

type FormData = z.infer<typeof schema>;

export function CompanyRegistry() {
  const { isConnected, address, chainId } = useAccount();
  const { registerCompany, isPending, isConfirming, isConfirmed, error } = useDeStock();
  const { balance, approve, allowance, isApproving } = useDeStockToken();
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
  const estimatedCost = watchedValues.initialLiquidity
    ? (parseFloat(watchedValues.initialLiquidity) + 100).toString()
    : '100';

  const checkApproval = async () => {
    if (!isConnected || !address || !allowance) return;

    const userBalance = balance ? parseFloat(formatUnits(balance, 18)) : 0;
    const requiredBalance = parseFloat(estimatedCost);

    if (userBalance < requiredBalance) {
      setNeedsApproval(true);
      return;
    }

    const currentAllowance = parseFloat(formatUnits(allowance, 18));
    setNeedsApproval(currentAllowance < requiredBalance);
  };

  useState(() => {
    checkApproval();
  });

  const handleApprove = async () => {
    if (!address) return;
    approve(estimatedCost);
  };

  const onSubmit = async (data: FormData) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    const userBalance = balance ? parseFloat(formatUnits(balance, 18)) : 0;
    if (userBalance < parseFloat(estimatedCost)) {
      alert('Insufficient DSTK balance.');
      return;
    }

    try {
      await registerCompany(data.name, data.totalSupply, data.initialLiquidity, data.ipfsMetadataUri);
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

          <div>
            <label className="destock-label" htmlFor="initialLiquidity">
              Initial Liquidity (DSTK)
            </label>
            <input
              {...register('initialLiquidity')}
              type="number"
              step="0.01"
              min="10"
              id="initialLiquidity"
              className="destock-input"
              placeholder="10000"
            />
            {errors.initialLiquidity && (
              <p className="mt-1 text-sm danger">{errors.initialLiquidity.message}</p>
            )}
          </div>

          <div>
            <label className="destock-label" htmlFor="ipfsMetadataUri">
              IPFS Metadata URI
            </label>
            <input
              {...register('ipfsMetadataUri')}
              type="text"
              id="ipfsMetadataUri"
              className="destock-input"
              placeholder="ipfs://..."
            />
            {errors.ipfsMetadataUri && (
              <p className="mt-1 text-sm danger">{errors.ipfsMetadataUri.message}</p>
            )}
          </div>

          <div className="bg-high-visibility p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-high-contrast mb-2">Cost Breakdown</h4>
            <div className="space-y-1 text-sm text-medium-contrast">
              <div className="flex justify-between">
                <span>Registration Fee:</span>
                <span>100 DSTK</span>
              </div>
              {watchedValues.initialLiquidity && (
                <div className="flex justify-between">
                  <span>Initial Liquidity:</span>
                  <span>
                    {parseFloat(watchedValues.initialLiquidity).toFixed(2)} DSTK
                  </span>
                </div>
              )}
              <div className="flex justify-between font-medium border-t border-gray-300 dark:border-gray-600 pt-1 text-high-contrast">
                <span>Total Cost:</span>
                <span>{estimatedCost} DSTK</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-low-contrast">
              Your Balance: {balance ? formatUnits(balance, 18) : 0} DSTK
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm danger">
                Registration failed: {error.message}
              </p>
            </div>
          )}

          {needsApproval ? (
            <button
              type="button"
              onClick={handleApprove}
              disabled={isApproving || isPending || isConfirming}
              className="w-full destock-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApproving ? 'Approving...' : 'Approve DSTK'}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending || isConfirming || (balance ? parseFloat(formatUnits(balance, 18)) : 0) < parseFloat(estimatedCost)}
              className="w-full destock-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming
                ? 'Processing...'
                : (balance ? parseFloat(formatUnits(balance, 18)) : 0) < parseFloat(estimatedCost)
                ? 'Insufficient Balance'
                : 'Register Company'}
            </button>
          )}

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
