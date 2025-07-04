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

  const getLPTokenBalance = useCallback((companyId: number, userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getLPTokenBalance',
      args: targetAddress ? [targetAddress, BigInt(companyId)] : undefined,
      query: {
        enabled: !!targetAddress,
      },
    });
  }, [contractAddress, address]);

  const getUserOrders = useCallback((userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getUserOrders',
      args: targetAddress ? [targetAddress] : undefined,
      query: {
        enabled: !!targetAddress,
      },
    });
  }, [contractAddress, address]);

  const getOrderDetails = useCallback((orderId: number) => {
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getOrderDetails',
      args: [BigInt(orderId)],
    });
  }, [contractAddress]);

  const getBuyPrice = useCallback((companyId: number, amount: string) => {
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getBuyPrice',
      args: [BigInt(companyId), BigInt(amount)],
    });
  }, [contractAddress]);

  const getSellPrice = useCallback((companyId: number, amount: string) => {
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getSellPrice',
      args: [BigInt(companyId), BigInt(amount)],
    });
  }, [contractAddress]);

  const getTradingVolume = useCallback((companyId: number) => {
    return useReadContract({
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getTradingVolume',
      args: [BigInt(companyId)],
    });
  }, [contractAddress]);

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

  const addLiquidity = useCallback(
    (companyId: number, tokenAmount: string, shareAmount: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'addLiquidity',
        args: [BigInt(companyId), parseEther(tokenAmount), BigInt(shareAmount)],
      });
    },
    [contractAddress, writeContract]
  );

  const removeLiquidity = useCallback(
    (companyId: number, lpTokens: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'removeLiquidity',
        args: [BigInt(companyId), BigInt(lpTokens)],
      });
    },
    [contractAddress, writeContract]
  );

  const placeOrder = useCallback(
    (companyId: number, isBuy: boolean, amount: string, price: string) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'placeOrder',
        args: [BigInt(companyId), isBuy, BigInt(amount), parseEther(price)],
      });
    },
    [contractAddress, writeContract]
  );

  const cancelOrder = useCallback(
    (orderId: number) => {
      if (!contractAddress) return;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'cancelOrder',
        args: [BigInt(orderId)],
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
    getLPTokenBalance,
    getUserOrders,
    getOrderDetails,
    getBuyPrice,
    getSellPrice,
    getTradingVolume,
    
    // Write functions
    registerCompany,
    buyShares,
    sellShares,
    addLiquidity,
    removeLiquidity,
    placeOrder,
    cancelOrder,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
