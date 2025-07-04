'use client';

import { useParams } from 'next/navigation';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useDeStockToken } from '@/lib/hooks/useDeStockToken';
import { useAccount } from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TradeHistory } from '@/components/TradeHistory';
import { ShareholderList } from '@/components/ShareholderList';
import { getContractAddress, DESTOCK_ABI } from '@/lib/contracts';

const schema = z.object({
  amount: z.string().min(1, 'Amount is required'),
});

type FormData = z.infer<typeof schema>;

export default function CompanyPage() {
  const { id } = useParams();
  const companyId = parseInt(id as string);
  const { isConnected, address, chainId } = useAccount();
  const { getCompany, getSharePrice, getBuyPrice, getSellPrice, buyShares, sellShares } = useDeStock();
  const { balance, approve, allowance, isApproving } = useDeStockToken();

  // Get the contract address for the current chain
  const destockAddress = getContractAddress('DESTOCK', chainId ?? 31337);

  const { data: company } = getCompany(companyId);
  const { data: sharePrice } = getSharePrice(companyId);

  const [needsApproval, setNeedsApproval] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedAmount = watch('amount');

  // Use the hook results directly instead of treating them as promises
  const { data: buyPrice } = getBuyPrice(companyId, watchedAmount || '0');
  const { data: sellPrice } = getSellPrice(companyId, watchedAmount || '0');

  useEffect(() => {
    if (isConnected && address && allowance && buyPrice) {
      const currentAllowance = BigInt(allowance.toString());
      setNeedsApproval(currentAllowance < BigInt(buyPrice.toString()));
    }
  }, [isConnected, address, allowance, buyPrice]);

  const handleApprove = async () => {
    if (buyPrice) {
      approve(formatUnits(BigInt(buyPrice.toString()), 18));
    }
  };

  const handleBuy = async (data: FormData) => {
    // buyShares is writeContractAsync and needs full contract config
    await buyShares({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'buyShares',
      args: [BigInt(companyId), BigInt(data.amount)],
    });
  };

  const handleSell = async (data: FormData) => {
    // sellShares is writeContractAsync and needs full contract config
    await sellShares({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'sellShares',
      args: [BigInt(companyId), BigInt(data.amount)],
    });
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Company Details</h2>
          <p>Owner: {company.owner}</p>
          <p>Total Supply: {formatUnits(company.totalSupply, 0)}</p>
          <p>Share Price: {sharePrice ? formatUnits(sharePrice, 18) : 'N/A'} DSTK</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Trade</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                {...register('amount')}
                type="number"
                id="amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div>
            {buyPrice && <p>Estimated Cost: {formatUnits(BigInt(buyPrice.toString()), 18)} DSTK</p>}
            {sellPrice && <p>Estimated Proceeds: {formatUnits(BigInt(sellPrice.toString()), 18)} DSTK</p>}

            <div className="flex space-x-4">
              {needsApproval ? (
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="w-full destock-button-secondary"
                >
                  {isApproving ? 'Approving...' : 'Approve DSTK'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit(handleBuy)}
                  className="w-full destock-button-primary"
                >
                  Buy Shares
                </button>
              )}
              <button
                type="button"
                onClick={handleSubmit(handleSell)}
                className="w-full destock-button-danger"
              >
                Sell Shares
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8">
        <TradeHistory companyId={companyId} />
      </div>
      <div className="mt-8">
        <ShareholderList companyId={companyId} />
      </div>
    </div>
  );
}