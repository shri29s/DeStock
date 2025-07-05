import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

// Custom Anvil chain configuration with chain ID 31337
const anvilLocal = {
  id: 31337,
  name: 'Anvil Local',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: 'http://127.0.0.1:8545' },
  },
} as const;

export const config = createConfig({
  chains: [anvilLocal, sepolia, mainnet],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'DeStock',
        url: 'https://destock.app',
        iconUrl: 'https://destock.app/icon.png',
      },
    }),
  ],
  transports: {
    [anvilLocal.id]: http('http://127.0.0.1:8545'),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
