'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useAccount } from 'wagmi';

const schema = z.object({
  name: z.string().min(1, 'Company name is required').max(50, 'Name too long'),
  initialPrice: z.string().min(1, 'Initial price is required'),
  totalSupply: z.string().min(1, 'Total supply is required'),
});

type FormData = z.infer<typeof schema>;

export function CompanyRegistry() {
  const { isConnected, address } = useAccount();
  const { registerCompany, isPending, isConfirming, isConfirmed, error, contractAddress } = useDeStock();
  const { balance, approve } = useDSTK();
  const [needsApproval, setNeedsApproval] = useState(true);
  const [isApproving, setIsApproving] = useState(false);

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

  // Get current allowance for DeStock contract
  // TODO: Fix allowance checking after hook refactor
  const currentAllowance = 0;

  const checkApproval = async () => {
    if (!isConnected || !address || !contractAddress) return;
    
    // Check if user has enough balance
    const userBalance = parseFloat(balance);
    const requiredBalance = parseFloat(estimatedCost);
    
    if (userBalance < requiredBalance) {
      setNeedsApproval(true);
      return;
    }

    // Check allowance against estimated cost
    const sufficient = currentAllowance >= parseFloat(estimatedCost);
    setNeedsApproval(!sufficient);
  };

  // Check approval whenever values change
  useEffect(() => {
    checkApproval();
  }, [estimatedCost, currentAllowance, isConnected, address, contractAddress]);

  const handleApprove = async () => {
    if (!address || !contractAddress) return;
    
    setIsApproving(true);
    try {
      // Approve a bit more than estimated to account for gas and rounding
      const approvalAmount = (parseFloat(estimatedCost) * 1.1).toString();
      await approve(contractAddress, approvalAmount);
      // Note: approval hash would be available from the approve function return value
      // Wait a moment for approval to be confirmed
      setTimeout(() => {
        checkApproval();
      }, 2000);
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Approval failed. Please try again or check your wallet.');
    } finally {
      setIsApproving(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    const userBalance = parseFloat(balance);
    const requiredBalance = parseFloat(estimatedCost);
    
    if (userBalance < requiredBalance) {
      alert(`Insufficient DSTK balance. You need at least ${requiredBalance} DSTK to register this company.`);
      return;
    }

    if (needsApproval) {
      alert('Please approve DSTK spending first by clicking the "Approve" button above.');
      return;
    }

    try {
      console.log('Registering company with params:', {
        name: data.name,
        totalSupply: data.totalSupply,
        initialPrice: data.initialPrice,
        estimatedCost: estimatedCost
      });

      // Pass parameters in correct order: name, totalSupply, initialPrice
      await registerCompany(data.name, data.totalSupply, data.initialPrice);
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Registration failed. ';
      
      if (error?.message?.includes('insufficient allowance')) {
        errorMessage += 'Please approve DSTK spending first.';
        setNeedsApproval(true);
      } else if (error?.message?.includes('user rejected')) {
        errorMessage += 'Transaction was rejected. Please try again and confirm the transaction in your wallet.';
      } else if (error?.message?.includes('gas')) {
        errorMessage += 'Transaction failed due to gas issues. Please try again with higher gas limit.';
      } else if (error?.message?.includes('insufficient funds')) {
        errorMessage += 'Insufficient funds for gas. Please ensure you have enough ETH for transaction fees.';
      } else {
        errorMessage += error?.message || 'Unknown error occurred.';
      }
      
      alert(errorMessage);
    }
  };

  // Reset form when registration is confirmed
  useEffect(() => {
    if (isConfirmed) {
      reset();
      setNeedsApproval(true);
    }
  }, [isConfirmed, reset]);

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
            <div className="mt-2 space-y-1 text-xs text-low-contrast">
              <div>Your Balance: {balance} DSTK</div>
              <div>Current Allowance: {currentAllowance.toFixed(2)} DSTK</div>
            </div>
          </div>

          {needsApproval && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Approval Required
              </h4>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                You need to approve DSTK spending for the DeStock contract before registering a company.
              </p>
              <button
                type="button"
                onClick={handleApprove}
                disabled={isApproving || parseFloat(balance) < parseFloat(estimatedCost)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApproving ? 'Approving...' : `Approve ${estimatedCost} DSTK`}
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Registration Failed
              </h4>
              <p className="text-sm danger mb-2">
                {error.message}
              </p>
              <div className="text-xs text-red-600 dark:text-red-400">
                <p><strong>Common solutions:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Ensure you have approved sufficient DSTK tokens</li>
                  <li>Check that you have enough ETH for gas fees</li>
                  <li>Try increasing gas limit in your wallet</li>
                  <li>Make sure the company name is unique</li>
                  <li>Refresh and try again if the approval was recent</li>
                </ul>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || isConfirming || parseFloat(balance) < parseFloat(estimatedCost) || needsApproval}
            className="w-full destock-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending || isConfirming
              ? 'Processing...'
              : parseFloat(balance) < parseFloat(estimatedCost)
              ? 'Insufficient Balance'
              : needsApproval
              ? 'Approval Required'
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
