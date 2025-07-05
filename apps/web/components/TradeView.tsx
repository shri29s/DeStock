"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useDeStock } from "@/lib/hooks/useDeStock";
import { useDSTK } from "@/lib/hooks/useDSTK";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";
import {
  ShoppingCartIcon,
  DollarSignIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  getContractAddress,
  DESTOCK_ABI,
  DSTK_TOKEN_ABI,
} from "@/lib/contracts";
import { formatUnits } from "viem";
import { fetchShareholderBalance } from "@/lib/api";

const schema = z.object({
  companyId: z.string().min(1, "Please select a company"),
  amount: z.string().min(1, "Amount is required"),
});

type FormData = z.infer<typeof schema>;

interface Company {
  id: number;
  name: string;
  price: string;
  owner?: string;
  totalSupply?: string;
  ipfsMetadataUri?: string;
}

export function TradeView() {
  const { address, chainId, isConnected } = useAccount();
  const {
    buyShares,
    sellShares,
    getSharePrice,
    getShareBalance,
    nextCompanyId,
    isPending,
    error,
  } = useDeStock();
  const { balance } = useDSTK();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [userShares, setUserShares] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const publicClient = usePublicClient();

  // Fix hydration by ensuring client-side rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const watchedCompanyId = watch("companyId");
  const watchedAmount = watch("amount");

  // Fetch companies from contract (safe, not using hooks in a loop)
  const loadCompanies = useCallback(async () => {
    try {
      if (!publicClient) return setCompanies([]);
      const companiesData: Company[] = [];
      for (let i = 0; i < nextCompanyId; i++) {
        // Fetch company struct
        const companyData: any = await publicClient.readContract({
          abi: DESTOCK_ABI,
          address: getContractAddress("DESTOCK", chainId ?? 31337),
          functionName: "companies",
          args: [BigInt(i)],
        });
        let name = companyData?.[1] || "";
        let owner = companyData?.[2] || "";
        let totalSupply = companyData?.[3]?.toString() || "";
        let ipfsMetadataUri = companyData?.[6] || "";
        // Fetch price
        let price = "0";
        try {
          const priceData: any = await publicClient.readContract({
            abi: DESTOCK_ABI,
            address: getContractAddress("DESTOCK", chainId ?? 31337),
            functionName: "getSharePrice",
            args: [BigInt(i)],
          });
          if (priceData) price = formatUnits(priceData, 18);
        } catch {}
        companiesData.push({
          id: i,
          name,
          price,
          owner,
          totalSupply,
          ipfsMetadataUri,
        });
      }
      setCompanies(companiesData);
    } catch (error) {
      console.error("Failed to load companies:", error);
      setCompanies([]);
    }
  }, [publicClient, chainId, nextCompanyId]);

  // Fetch companies when connected or nextCompanyId changes
  useEffect(() => {
    if (isConnected && nextCompanyId > 0) {
      loadCompanies();
    } else {
      setCompanies([]);
    }
  }, [isConnected, nextCompanyId, loadCompanies]);

  // Fetch user share balance for selected company (use publicClient)
  const loadUserShares = useCallback(
    async (companyId: number) => {
      try {
        if (!address || !publicClient) return setUserShares("0");
        const shareResult = await publicClient.readContract({
          abi: DESTOCK_ABI,
          address: getContractAddress("DESTOCK", chainId ?? 31337),
          functionName: "balanceOf",
          args: [address, BigInt(companyId)],
        });
        if (shareResult) {
          setUserShares(formatUnits(shareResult, 0));
        } else {
          setUserShares("0");
        }
      } catch (error) {
        console.error("Failed to load user shares:", error);
        setUserShares("0");
      }
    },
    [address, publicClient, chainId]
  );

  // Update selected company and user shares when companies or selection changes
  useEffect(() => {
    if (watchedCompanyId && companies.length > 0) {
      const company = companies.find(
        (c) => c.id.toString() === watchedCompanyId
      );
      if (company) {
        setSelectedCompany(company);
        loadUserShares(company.id);
      } else {
        setSelectedCompany(null);
        setUserShares("0");
      }
    } else {
      setSelectedCompany(null);
      setUserShares("0");
    }
  }, [watchedCompanyId, companies, loadUserShares]);

  // Dynamically update userShares ONLY when selectedCompany, address, or chainId changes (from backend)
  useEffect(() => {
    if (selectedCompany && address) {
      (async () => {
        try {
          const balance = await fetchShareholderBalance(
            selectedCompany.id,
            address
          );
          setUserShares(balance.toString());
        } catch (error) {
          setUserShares("0");
        }
      })();
    } else {
      setUserShares("0");
    }
  }, [selectedCompany, address, chainId]);

  const calculateCost = () => {
    if (!selectedCompany || !watchedAmount) return "0";
    return (
      parseFloat(selectedCompany.price) * parseFloat(watchedAmount)
    ).toFixed(2);
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedCompany) return;

    setLoading(true);
    try {
      const destockAddress = getContractAddress("DESTOCK", chainId ?? 31337);
      if (tradeType === "buy") {
        await buyShares({
          abi: DESTOCK_ABI,
          address: destockAddress,
          functionName: "buyShares",
          args: [BigInt(selectedCompany.id), BigInt(data.amount)],
        });
      } else {
        await sellShares({
          abi: DESTOCK_ABI,
          address: destockAddress,
          functionName: "sellShares",
          args: [BigInt(selectedCompany.id), BigInt(data.amount)],
        });
      }
      reset();
    } catch (error) {
      console.error("Trade failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const canTrade = () => {
    if (!selectedCompany || !watchedAmount) return false;

    const amount = parseFloat(watchedAmount);
    if (amount <= 0) return false;

    if (tradeType === "buy") {
      const cost = parseFloat(calculateCost());
      return parseFloat(balance) >= cost;
    } else {
      return parseFloat(userShares) >= amount;
    }
  };

  const dstkTokenAddress = getContractAddress("DSTK_TOKEN", chainId ?? 31337);
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

  // Helper: check if allowance is enough for buy
  const safeAddress = address || "0x0000000000000000000000000000000000000000";
  const safeChainId = chainId ?? 31337;
  const safeSelectedCompany = selectedCompany || {
    id: 0,
    name: "",
    price: "0",
  };
  const safeWatchedAmount = watchedAmount || "0";

  const buyAmountDSTK =
    safeSelectedCompany && safeWatchedAmount
      ? BigInt(
          Math.floor(
            Number(safeSelectedCompany.price) * Number(safeWatchedAmount) * 1e18
          )
        )
      : BigInt(0);
  const hasEnoughAllowance =
    allowance && buyAmountDSTK > BigInt(0)
      ? BigInt(allowance) >= buyAmountDSTK
      : false;

  // Approve handler
  const handleApprove = async () => {
    if (!address || !dstkTokenAddress) return;
    try {
      await approveDSTK({
        abi: DSTK_TOKEN_ABI,
        address: dstkTokenAddress,
        functionName: "approve",
        args: [getContractAddress("DESTOCK", chainId ?? 31337), buyAmountDSTK],
      });
      refetchAllowance();
    } catch (err) {
      alert("Approval failed. See console for details.");
      console.error(err);
    }
  };

  // Debug logging
  console.log("TradeView Debug:", {
    tradeType,
    canTrade: canTrade(),
    hasEnoughAllowance,
    selectedCompany: !!selectedCompany,
    watchedAmount,
    isPending,
    loading,
    buyAmountDSTK: buyAmountDSTK.toString(),
    allowance: allowance?.toString(),
    balance,
    userShares,
  });

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

  // Render simple version before hydration to prevent mismatch
  if (!mounted) {
    return (
      <div className="trading-card text-center">
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

  return (
    <motion.div
      className="glass-card p-8"
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
            onClick={() => setTradeType("buy")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              tradeType === "buy"
                ? "bg-success text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-1">
              <TrendingUpIcon className="w-4 h-4" />
              <span>Buy</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => setTradeType("sell")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              tradeType === "sell"
                ? "bg-danger text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
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
            {...register("companyId")}
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
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {selectedCompany.name}
                </span>
                <motion.span
                  className="text-lg font-bold text-destock-primary"
                  key={selectedCompany.price} // Trigger animation on price change
                  initial={{ scale: 1.2, color: "#10B981" }}
                  animate={{ scale: 1, color: "#3B82F6" }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedCounter
                    value={parseFloat(selectedCompany.price)}
                    suffix=" DSTK"
                    decimals={2}
                  />
                </motion.span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                <span>Your Holdings:</span>
                <AnimatedCounter
                  value={parseFloat(userShares)}
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
            {...register("amount")}
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
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                  <span className="font-medium">
                    {selectedCompany.price} DSTK
                  </span>
                </div>
                <div className="flex justify-between font-semibold border-t border-white/10 dark:border-black/10 pt-2 text-gray-900 dark:text-gray-100">
                  <span>
                    Total {tradeType === "buy" ? "Cost" : "Proceeds"}:
                  </span>
                  <AnimatedCounter
                    value={parseFloat(calculateCost())}
                    suffix=" DSTK"
                    decimals={2}
                    className={
                      tradeType === "buy" ? "text-danger" : "text-success"
                    }
                  />
                </div>
              </div>
              {tradeType === "buy" && (
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Your DSTK Balance:</span>
                  <AnimatedCounter
                    value={parseFloat(balance || "0")}
                    suffix=" DSTK"
                    decimals={2}
                    className="font-medium"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FIXED: Approve/Submit Button Area */}
        <div className="flex flex-col gap-3 mt-6">
          {/* Approve Button - Only show when needed for buy trades */}
          {tradeType === "buy" &&
            selectedCompany &&
            watchedAmount &&
            !hasEnoughAllowance &&
            buyAmountDSTK > 0n && (
              <motion.button
                type="button"
                onClick={handleApprove}
                disabled={isApproving}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {isApproving && <LoadingSpinner size="small" />}
                <span>{isApproving ? "Approving..." : "Approve DSTK"}</span>
              </motion.button>
            )}

          {/* Main Trade Button - Always visible when there's a selected company */}
          {selectedCompany && (
            <motion.button
              type="submit"
              disabled={
                !canTrade() ||
                isPending ||
                loading ||
                (tradeType === "buy" && !hasEnoughAllowance)
              }
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                tradeType === "buy"
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-lg"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isPending || loading ? (
                <LoadingSpinner size="small" />
              ) : tradeType === "buy" ? (
                <TrendingUpIcon className="w-5 h-5" />
              ) : (
                <TrendingDownIcon className="w-5 h-5" />
              )}
              <span>
                {isPending || loading
                  ? "Processing..."
                  : !canTrade()
                    ? tradeType === "buy"
                      ? "Insufficient Balance"
                      : "Insufficient Shares"
                    : tradeType === "buy" && !hasEnoughAllowance
                      ? "Need Approval First"
                      : `${tradeType === "buy" ? "Buy" : "Sell"} Shares`}
              </span>
            </motion.button>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
}
