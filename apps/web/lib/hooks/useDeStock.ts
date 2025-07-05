import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { getContractAddress, DESTOCK_ABI } from "../contracts";
import { parseEther, Address } from "viem";

export function useDeStock() {
  const { chainId } = useAccount();
  const destockAddress = getContractAddress("DESTOCK", chainId ?? 31337);

  const { data: nextCompanyId, refetch: refetchNextCompanyId } =
    useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "nextCompanyId",
    });

  const {
    writeContractAsync: registerCompany,
    isPending,
    error,
  } = useWriteContract();

  const handleRegisterCompany = async (
    name: string,
    initialLiquidity: string,
    totalSupply: string,
    ipfsMetadataUri: string
  ) => {
    await registerCompany({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "registerCompany",
      args: [
        name,
        BigInt(totalSupply),
        parseEther(initialLiquidity),
        ipfsMetadataUri,
      ],
    });
    refetchNextCompanyId();
  };

  // Use 'companies' for company details
  const getCompany = (companyId: number) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "companies",
      args: [BigInt(companyId)],
    });
  };

  const getSharePrice = (companyId: number) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "getSharePrice",
      args: [BigInt(companyId)],
    });
  };

  const getShareBalance = (companyId: number, userAddress: Address) => {
    return useReadContract({
      abi: DESTOCK_ABI,
      address: destockAddress,
      functionName: "balanceOf",
      args: [userAddress, BigInt(companyId)],
    });
  };

  const { writeContractAsync: buyShares } = useWriteContract();
  const { writeContractAsync: sellShares } = useWriteContract();

  return {
    nextCompanyId: Number(nextCompanyId),
    registerCompany: handleRegisterCompany,
    isPending,
    error,
    getCompany,
    getSharePrice,
    getShareBalance,
    buyShares,
    sellShares,
  };
}
