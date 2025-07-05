import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DESTOCK_ABI, getContractAddress } from '../contracts';
import { useCallback, useMemo } from 'react';
import { Address, parseEther } from 'viem';

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

  // Note: These functions return hook configurations, not hook calls
  // They should be used in components that call the actual hooks
  const getCompany = useCallback((companyId: number) => {
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'companies' as const,
      args: [BigInt(companyId)],
    };
  }, [contractAddress]);

  const getSharePrice = useCallback((companyId: number) => {
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getSharePrice' as const,
      args: [BigInt(companyId)],
    };
  }, [contractAddress]);

  const getShareBalance = useCallback((companyId: number, userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'balanceOf' as const,
      args: targetAddress ? [targetAddress, BigInt(companyId)] : undefined,
      query: {
        enabled: !!targetAddress,
      },
    };
  }, [contractAddress, address]);

  const getLPTokenBalance = useCallback((companyId: number, userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getLPTokenBalance' as const,
      args: targetAddress ? [targetAddress, BigInt(companyId)] : undefined,
      query: {
        enabled: !!targetAddress,
      },
    };
  }, [contractAddress, address]);

  const getUserOrders = useCallback((userAddress?: Address) => {
    const targetAddress = userAddress || address;
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getUserOrders' as const,
      args: targetAddress ? [targetAddress] : undefined,
      query: {
        enabled: !!targetAddress,
      },
    };
  }, [contractAddress, address]);

  const getOrderDetails = useCallback((orderId: number) => {
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getOrderDetails' as const,
      args: [BigInt(orderId)],
    };
  }, [contractAddress]);

  const getBuyPrice = useCallback((companyId: number, amount: string) => {
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getBuyPrice' as const,
      args: [BigInt(companyId), BigInt(amount)],
    };
  }, [contractAddress]);

  const getSellPrice = useCallback((companyId: number, amount: string) => {
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getSellPrice' as const,
      args: [BigInt(companyId), BigInt(amount)],
    };
  }, [contractAddress]);

  const getTradingVolume = useCallback((companyId: number) => {
    return {
      address: contractAddress,
      abi: DESTOCK_ABI,
      functionName: 'getTradingVolume' as const,
      args: [BigInt(companyId)],
    };
  }, [contractAddress]);

  // Write functions
  const registerCompany = useCallback(
    (name: string, totalSupply: string, initialPrice: string) => {
      if (!contractAddress) return;
      
      // Calculate initial liquidity as totalSupply * initialPrice
      const totalSupplyBigInt = BigInt(totalSupply);
      const initialPriceBigInt = parseEther(initialPrice);
      const initialLiquidity = totalSupplyBigInt * initialPriceBigInt;
      
      writeContract({
        address: contractAddress,
        abi: DESTOCK_ABI,
        functionName: 'registerCompany',
        args: [name, totalSupplyBigInt, initialLiquidity],
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
