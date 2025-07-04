"use client";

import { useParams } from "next/navigation";
import { useDeStock } from "@/lib/hooks/useDeStock";
import { useDeStockToken } from "@/lib/hooks/useDeStockToken";
import { useAccount } from "wagmi";
import { formatUnits, parseEther } from "viem";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TradeHistory } from "@/components/TradeHistory";
import { ShareholderList } from "@/components/ShareholderList";
import { getContractAddress, DESTOCK_ABI } from "@/lib/contracts";

const schema = z.object({
  amount: z.string().min(1, "Amount is required"),
});

type FormData = z.infer<typeof schema>;

// Define the Company interface matching the contract struct
interface Company {
  id: bigint;
  name: string;
  owner: string;
  initialPrice: bigint;
  totalSupply: bigint;
}

export default function CompanyPage() {
  const { id } = useParams();
  const companyId = parseInt(id as string);
  const { isConnected, address, chainId } = useAccount();
  const { getCompany, getSharePrice, buyShares, sellShares } = useDeStock();
  const { balance, approve, allowance, isApproving } = useDeStockToken();

  // Get the contract address for the current chain
  const destockAddress = getContractAddress("DESTOCK", chainId ?? 31337);

  const { data: companyRaw } = getCompany(companyId);
  const { data: sharePrice } = getSharePrice(companyId);

  // Defensive mapping from contract result to Company interface
  function mapCompany(raw: any): Company | undefined {
    if (
      Array.isArray(raw) &&
      raw.length >= 5 &&
      typeof raw[0] === "bigint" &&
      typeof raw[1] === "string" &&
      typeof raw[2] === "string" &&
      typeof raw[3] === "bigint" &&
      typeof raw[4] === "bigint"
    ) {
      return {
        id: raw[0],
        name: raw[1],
        owner: raw[2],
        initialPrice: raw[3],
        totalSupply: raw[4],
      };
    }
    return undefined;
  }

  const company = mapCompany(companyRaw);

  const [needsApproval, setNeedsApproval] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedAmount = watch("amount");

  // Calculate estimated cost/proceeds using sharePrice
  const estimatedCost =
    sharePrice && watchedAmount
      ? (BigInt(sharePrice) * BigInt(watchedAmount)).toString()
      : "0";

  useEffect(() => {
    if (isConnected && address && allowance && sharePrice && watchedAmount) {
      const currentAllowance = BigInt(allowance.toString());
      const cost = BigInt(sharePrice) * BigInt(watchedAmount);
      setNeedsApproval(currentAllowance < cost);
    }
  }, [isConnected, address, allowance, sharePrice, watchedAmount]);

  const handleApprove = async () => {
    if (sharePrice && watchedAmount) {
      const cost = BigInt(sharePrice) * BigInt(watchedAmount);
      approve(formatUnits(cost, 18));
    }
  };

  const handleBuy = async (data: FormData) => {
    // buyShares is writeContractAsync and needs full contract config
    await buyShares({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "buyShares",
      args: [BigInt(companyId), BigInt(data.amount)],
    });
  };

  const handleSell = async (data: FormData) => {
    // sellShares is writeContractAsync and needs full contract config
    await sellShares({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "sellShares",
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
          <p>Total Supply: {company.totalSupply.toString()}</p>
          <p>
            Share Price: {sharePrice ? formatUnits(sharePrice, 18) : "N/A"} DSTK
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Trade</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                {...register("amount")}
                type="number"
                id="amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>
            {sharePrice && watchedAmount && (
              <p>
                Estimated Cost:{" "}
                {formatUnits(BigInt(sharePrice) * BigInt(watchedAmount), 18)}{" "}
                DSTK
              </p>
            )}
            {/* You can add a similar block for proceeds if needed */}
            <div className="flex space-x-4">
              {needsApproval ? (
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="w-full destock-button-secondary"
                >
                  {isApproving ? "Approving..." : "Approve DSTK"}
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
