import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { getContractAddress, DESTOCK_ABI } from '../contracts';
import { parseEther } from 'viem';

export function useDeStock() {
  const { chainId } = useAccount();
  const destockAddress = getContractAddress('DESTOCK', chainId ?? 31337);

  const { data: nextCompanyId, refetch: refetchNextCompanyId } = useReadContract({
    abi: DESTOCK_ABI,
    address: destockAddress,
    functionName: 'nextCompanyId',
  });

  const { writeContractAsync: registerCompany, isPending, isConfirming, isConfirmed, error } = useWriteContract();

  const handleRegisterCompany = async (name: string, totalSupply: string, initialLiquidity: string, ipfsMetadataUri: string) => {
    await registerCompany({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'registerCompany',
      args: [name, BigInt(totalSupply), parseEther(initialLiquidity), ipfsMetadataUri],
    });
    refetchNextCompanyId();
  };

  const getCompany = (companyId: number) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'getCompanyDetails',
      args: [BigInt(companyId)],
    });
  };

  const getSharePrice = (companyId: number) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'getSharePrice',
      args: [BigInt(companyId)],
    });
  };

  const getBuyPrice = (companyId: number, amount: string) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'getBuyPrice',
      args: [BigInt(companyId), BigInt(amount)],
    });
  };

  const getSellPrice = (companyId: number, amount: string) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: 'getSellPrice',
      args: [BigInt(companyId), BigInt(amount)],
    });
  };

  const { writeContractAsync: buyShares } = useWriteContract();
  const { writeContractAsync: sellShares } = useWriteContract();

  return {
    nextCompanyId: Number(nextCompanyId),
    registerCompany: handleRegisterCompany,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    getCompany,
    getSharePrice,
    getBuyPrice,
    getSellPrice,
    buyShares,
    sellShares,
  };
}