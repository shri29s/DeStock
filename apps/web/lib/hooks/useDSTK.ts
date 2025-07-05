import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DSTK_TOKEN_ABI, getContractAddress, DSTK_DECIMALS } from '../contracts';
import { useCallback, useMemo } from 'react';
import { Address, parseUnits, formatUnits } from 'viem';

export function useDSTK() {
  const { address, chainId } = useAccount();
  
  const contractAddress = useMemo(() => {
    if (!chainId) return undefined;
    return getContractAddress('DSTK_TOKEN', chainId);
  }, [chainId]);

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read functions
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: DSTK_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: totalSupply } = useReadContract({
    address: contractAddress,
    abi: DSTK_TOKEN_ABI,
    functionName: 'totalSupply',
  });

  // Note: This function returns hook configuration, not hook call
  // It should be used in components that call the actual hook
  const getAllowance = useCallback((spender: Address) => {
    return {
      address: contractAddress,
      abi: DSTK_TOKEN_ABI,
      functionName: 'allowance' as const,
      args: address && spender ? [address, spender] : undefined,
      query: {
        enabled: !!address && !!spender,
      },
    };
  }, [contractAddress, address]);

  // Write functions
  const approve = useCallback(
    (spender: Address, amount: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DSTK_TOKEN_ABI,
        functionName: 'approve',
        args: [spender, parseUnits(amount, DSTK_DECIMALS)],
      });
    },
    [contractAddress, writeContract]
  );

  const transfer = useCallback(
    (to: Address, amount: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DSTK_TOKEN_ABI,
        functionName: 'transfer',
        args: [to, parseUnits(amount, DSTK_DECIMALS)],
      });
    },
    [contractAddress, writeContract]
  );

  // Utility functions
  const formatBalance = useCallback((rawBalance?: bigint) => {
    if (!rawBalance) return '0';
    return formatUnits(rawBalance, DSTK_DECIMALS);
  }, []);

  const parseAmount = useCallback((amount: string) => {
    return parseUnits(amount, DSTK_DECIMALS);
  }, []);

  return {
    // Contract data
    contractAddress,
    balance: balance ? formatBalance(balance) : '0',
    rawBalance: balance,
    totalSupply: totalSupply ? formatBalance(totalSupply) : '0',
    
    // Read functions
    getAllowance,
    refetchBalance,
    
    // Write functions
    approve,
    transfer,
    
    // Utility functions
    formatBalance,
    parseAmount,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
