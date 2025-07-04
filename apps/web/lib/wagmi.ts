import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [localhost, sepolia, mainnet],
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
    [localhost.id]: http('http://127.0.0.1:8545'),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
