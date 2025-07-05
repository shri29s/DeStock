"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDeStock } from "@/lib/hooks/useDeStock";
import { useDeStockToken } from "@/lib/hooks/useDeStockToken";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import lighthouse from "@lighthouse-web3/sdk";
import { useReadContract, useWriteContract } from "wagmi";
import { DSTK_TOKEN_ABI, getContractAddress } from "@/lib/contracts";

const schema = z.object({
  name: z.string().min(1, "Company name is required").max(50, "Name too long"),
  totalSupply: z.string().min(1, "Total supply is required"),
  initialLiquidity: z
    .string()
    .min(1, "Initial liquidity is required")
    .refine((val) => parseFloat(val) > 10, {
      message: "Initial liquidity must be greater than 10 DSTK",
    }),
});

type FormData = z.infer<typeof schema>;

export function CompanyRegistry() {
  const { isConnected, address, chainId } = useAccount();
  const { registerCompany, isPending, error } = useDeStock();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Get DSTK token address for current chain
  const dstkTokenAddress = getContractAddress("DSTK_TOKEN", chainId ?? 31337);
  // Fetch DSTK balance reactively
  const { data: balance } = useReadContract({
    abi: DSTK_TOKEN_ABI,
    address: dstkTokenAddress,
    functionName: "balanceOf",
    args: [address!],
    query: { enabled: !!address },
  });
  // Fetch DSTK allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: DSTK_TOKEN_ABI,
    address: dstkTokenAddress,
    functionName: "allowance",
    args: [address!, getContractAddress("DESTOCK", chainId ?? 31337)],
    query: { enabled: !!address },
  });
  // Write contract for approve
  const { writeContractAsync: approveDSTK, isPending: isApproving } =
    useWriteContract();

  // Calculate userBalance at the top level for use in JSX and onSubmit
  const userBalance = balance ? parseFloat(formatUnits(balance, 18)) : 0;

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

  // Helper: check if allowance is enough
  const initialLiquidityWei = watchedValues.initialLiquidity
    ? BigInt(Math.floor(Number(watchedValues.initialLiquidity) * 1e18))
    : BigInt(0);
  const hasEnoughAllowance =
    allowance && initialLiquidityWei > BigInt(0)
      ? BigInt(allowance) >= initialLiquidityWei
      : false;

  const onSubmit = async (data: FormData) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }
    if (!logoFile) {
      alert("Please upload a company logo.");
      return;
    }
    if (userBalance < parseFloat(data.initialLiquidity)) {
      alert("Insufficient DSTK balance.");
      return;
    }
    try {
      // 1. Upload logo to Lighthouse IPFS
      const logoRes = await lighthouse.upload(
        [logoFile],
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!
      );
      const logoUrl = `https://gateway.lighthouse.storage/ipfs/${logoRes.data.Hash}`;
      // 2. Create metadata JSON
      const metadata = {
        name: data.name,
        logo: logoUrl,
        totalSupply: data.totalSupply,
        initialLiquidity: data.initialLiquidity,
      };
      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File([metadataBlob], "metadata.json");
      // 3. Upload metadata to Lighthouse IPFS
      const metaRes = await lighthouse.upload(
        [metadataFile],
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!
      );
      const metadataUri = `ipfs://${metaRes.data.Hash}`;
      // 4. Call contract with metadataUri (ensure correct argument order)
      await registerCompany(
        data.name,
        data.initialLiquidity,
        data.totalSupply,
        metadataUri
      );
      reset();
      setLogoFile(null);
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (error?.message) alert(`Lighthouse upload error: ${error.message}`);
      else alert("Registration failed. See console for details.");
    }
  };

  // Approve handler
  const handleApprove = async () => {
    if (!address || !dstkTokenAddress) return;
    try {
      await approveDSTK({
        abi: DSTK_TOKEN_ABI,
        address: dstkTokenAddress,
        functionName: "approve",
        args: [
          getContractAddress("DESTOCK", chainId ?? 31337),
          initialLiquidityWei,
        ],
      });
      refetchAllowance();
    } catch (err) {
      alert("Approval failed. See console for details.");
      console.error(err);
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
              {...register("name")}
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
              {...register("totalSupply")}
              type="number"
              min="1"
              id="totalSupply"
              className="destock-input"
              placeholder="1000"
            />
            {errors.totalSupply && (
              <p className="mt-1 text-sm danger">
                {errors.totalSupply.message}
              </p>
            )}
          </div>

          <div>
            <label className="destock-label" htmlFor="initialLiquidity">
              Initial Liquidity (DSTK)
            </label>
            <input
              {...register("initialLiquidity")}
              type="number"
              step="0.01"
              min="10.01"
              id="initialLiquidity"
              className="destock-input"
              placeholder="10000"
            />
            {errors.initialLiquidity && (
              <p className="mt-1 text-sm danger">
                {errors.initialLiquidity.message}
              </p>
            )}
          </div>

          <div>
            <label className="destock-label" htmlFor="logo">
              Company Logo
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              className="destock-input"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="bg-high-visibility p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-high-contrast mb-2">
              Registration Requirements
            </h4>
            <div className="space-y-1 text-sm text-medium-contrast">
              <div className="flex justify-between">
                <span>Initial Liquidity:</span>
                <span>
                  {watchedValues.initialLiquidity
                    ? parseFloat(watchedValues.initialLiquidity).toFixed(2)
                    : "0.00"}{" "}
                  DSTK
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-low-contrast">
              Your Balance: {userBalance} DSTK
            </div>
            <div className="mt-2 text-xs text-low-contrast">
              * Minimum required: 10.01 DSTK
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm danger">
                Registration failed: {error.message}
              </p>
            </div>
          )}

          {!hasEnoughAllowance ? (
            <button
              type="button"
              onClick={handleApprove}
              disabled={isApproving || initialLiquidityWei <= 0n}
              className="w-full destock-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApproving ? "Approving..." : "Approve DSTK"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={
                isPending ||
                userBalance <
                  parseFloat(watchedValues.initialLiquidity || "0") ||
                !logoFile
              }
              className="w-full destock-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Processing..."
                : userBalance <
                    parseFloat(watchedValues.initialLiquidity || "0")
                  ? "Insufficient Balance"
                  : "Register Company"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
