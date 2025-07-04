import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DESTOCK_ABI, getContractAddress } from '../contracts';
import { useCallback, useMemo } from 'react';
import { Address, parseEther, formatEther } from 'viem';

export function useDeStock() {
  const { address, chainId } = useAccount();
  
  const contractAddress = useMemo(() => {
    if (!chainId) return undefined;
    return getContractAddress('DESTOCK', chainId);
  }, [chainId]);

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read functions
  const { data: nextCompanyId } = useReadContract({
    address: contractAddress,
    abi: DESTOCK_ABI,
    functionName: 'nextCompanyId',
  });

  const getCompany = useCallback((companyId: number) => {
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'companies',
      args: [BigInt(companyId)],
    });
  }, [contractAddress]);

  const getSharePrice = useCallback((companyId: number) => {
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getSharePrice',
      args: [BigInt(companyId)],
    });
  }, [contractAddress]);

  const getShareBalance = useCallback((companyId: number, userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'balanceOf',
      args: targetAddress ? [targetAddress, BigInt(companyId)] : undefined,
      query: {
        enabled: !!targetAddress,
      },
    });
  }, [contractAddress, address]);

  // Write functions
  const registerCompany = useCallback(
    (name: string, initialPrice: string, totalSupply: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'registerCompany',
        args: [name, parseEther(initialPrice), BigInt(totalSupply)],
      });
    },
    [contractAddress, writeContract]
  );

  const buyShares = useCallback(
    (companyId: number, amount: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'buyShares',
        args: [BigInt(companyId), BigInt(amount)],
      });
    },
    [contractAddress, writeContract]
  );

  const sellShares = useCallback(
    (companyId: number, amount: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'sellShares',
        args: [BigInt(companyId), BigInt(amount)],
      });
    },
    [contractAddress, writeContract]
  );

  return {
    // Contract data
    contractAddress,
    nextCompanyId: nextCompanyId ? Number(nextCompanyId) : 0,
    
    // Read functions
    getCompany,
    getSharePrice,
    getShareBalance,
    
    // Write functions
    registerCompany,
    buyShares,
    sellShares,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
