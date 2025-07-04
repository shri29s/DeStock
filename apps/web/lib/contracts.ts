import { Address } from 'viem';

// Import ABIs
import { DESTOCK_ABI } from './abi/DeStock';
import { DSTK_TOKEN_ABI } from './abi/DeStockToken';

// Export ABIs
export { DESTOCK_ABI, DSTK_TOKEN_ABI };

// Contract addresses for different environments
export const CONTRACT_ADDRESSES = {
  localhost: {
    DESTOCK: '0x0000000000000000000000000000000000000000' as Address,
    DSTK_TOKEN: '0x0000000000000000000000000000000000000000' as Address,
  },
  sepolia: {
    DESTOCK: '0x0000000000000000000000000000000000000000' as Address,
    DSTK_TOKEN: '0x0000000000000000000000000000000000000000' as Address,
  },
  mainnet: {
    DESTOCK: '0x0000000000000000000000000000000000000000' as Address,
    DSTK_TOKEN: '0x0000000000000000000000000000000000000000' as Address,
  },
} as const;

export type SupportedChain = keyof typeof CONTRACT_ADDRESSES;

export function getContractAddress(
  contract: 'DESTOCK' | 'DSTK_TOKEN',
  chainId: number
): Address {
  const chainName = getChainName(chainId);
  return CONTRACT_ADDRESSES[chainName][contract];
}

export function getChainName(chainId: number): SupportedChain {
  switch (chainId) {
    case 1:
      return 'mainnet';
    case 11155111:
      return 'sepolia';
    case 31337:
      return 'localhost';
    default:
      return 'localhost';
  }
}

// Contract constants
export const REGISTRATION_FEE = BigInt('100000000000000000000'); // 100 DSTK
export const DSTK_DECIMALS = 18;
