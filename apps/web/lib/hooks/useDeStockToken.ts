import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { getContractAddress, DSTK_TOKEN_ABI } from "../contracts";
import { parseEther } from "viem";

export function useDeStockToken() {
  const { address, chainId } = useAccount();
  const destockTokenAddress = getContractAddress(
    "DSTK_TOKEN",
    chainId ?? 31337
  );
  const destockAddress = getContractAddress("DESTOCK", chainId ?? 31337);

  const safeAddress = address ?? "0x0000000000000000000000000000000000000000";

  const { data: balance, refetch: refetchBalance } = useReadContract({
    abi: DSTK_TOKEN_ABI,
    address: destockTokenAddress,
    functionName: "balanceOf",
    args: [safeAddress],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: DSTK_TOKEN_ABI,
    address: destockTokenAddress,
    functionName: "allowance",
    args: [safeAddress, destockAddress],
  });

  const { writeContractAsync: approve, isPending: isApproving } =
    useWriteContract();

  const handleApprove = async (amount: string) => {
    await approve({
      abi: DSTK_TOKEN_ABI,
      address: destockTokenAddress,
      functionName: "approve",
      args: [destockAddress, parseEther(amount)],
    });
    refetchAllowance();
  };

  const { writeContractAsync: mint } = useWriteContract();
  const { writeContractAsync: transferFromContract } = useWriteContract();
  const { writeContractAsync: batchAirDrop } = useWriteContract();

  return {
    balance,
    allowance,
    approve: handleApprove,
    isApproving,
    mint,
    transferFromContract,
    batchAirDrop,
    refetchBalance,
    refetchAllowance,
  };
}
