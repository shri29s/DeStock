# DeStock - Decentralized Stock Trading Platform

A modern Web3 platform for decentralized stock trading built with Next.js 15, Foundry, and Tailwind CSS.

## 🏗️ Architecture

This is a monorepo containing:

- **`apps/web/`** - Next.js 15 frontend with App Router, React 19, and Tailwind CSS v4
- **`packages/contracts/`** - Foundry-based smart contracts (DeStock + DSTK Token)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Foundry ([installation guide](https://book.getfoundry.sh/getting-started/installation))

### Installation

```bash
# Install dependencies
pnpm install

# Install Foundry dependencies
cd packages/contracts
forge install
```

### Local Development

1. **Start local blockchain:**
```bash
# Terminal 1 - Start Anvil
anvil
```

2. **Deploy contracts:**
```bash
# Terminal 2 - Deploy to local network
cd packages/contracts
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

3. **Copy ABIs and start frontend:**
```bash
# Terminal 3 - Start frontend
cd apps/web
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📝 Smart Contracts

### DeStockToken (DSTK)
- ERC-20 token used as the platform currency
- Initial supply: 1,000,000 DSTK
- Used for company registration fees and share trading

### DeStock
- ERC-1155 contract for company shares
- Company registration: 100 DSTK fee
- AMM-based pricing for share trading
- Liquidity pools for each company

## 🎯 Features

### ✅ Implemented
- Company registration with DSTK payment
- Share trading (buy/sell) with dynamic pricing
- MetaMask wallet integration via wagmi
- Real-time portfolio tracking
- Responsive UI with Tailwind CSS
- TypeScript throughout

### 🔄 In Progress
- Price charts and analytics
- Company detail pages
- Advanced trading features

### 📋 Planned
- Governance mechanisms
- Staking rewards
- Multi-chain support

## 🛠️ Development

### Smart Contracts

```bash
cd packages/contracts

# Build contracts
forge build

# Run tests
forge test

# Deploy to testnet
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify

# Copy ABIs to frontend
npm run copy-abi
```

### Frontend

```bash
cd apps/web

# Development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 🌐 Deployment

### Smart Contracts

1. Set environment variables:
```bash
export PRIVATE_KEY="your_private_key"
export SEPOLIA_RPC_URL="your_sepolia_rpc_url"
```

2. Deploy to testnet:
```bash
cd packages/contracts
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
```

3. Update contract addresses in `apps/web/.env.local`

### Frontend

Deploy to Vercel:

```bash
cd apps/web
vercel --prod
```

Or build for static hosting:

```bash
pnpm build
pnpm export
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd packages/contracts
forge test -vv
```

### Frontend Tests

```bash
cd apps/web
pnpm test
```

## 📁 Project Structure

```
DeStock/
├── apps/
│   └── web/                    # Next.js 15 frontend
│       ├── app/               # App Router pages
│       ├── components/        # React components
│       ├── lib/               # Utilities and hooks
│       └── package.json
├── packages/
│   └── contracts/             # Foundry smart contracts
│       ├── src/               # Solidity contracts
│       ├── test/              # Contract tests
│       ├── script/            # Deployment scripts
│       └── foundry.toml
├── package.json               # Workspace root
└── README.md
```

## 🔧 Configuration

### Environment Variables

Copy `apps/web/.env.local.example` to `apps/web/.env.local` and configure:

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_DESTOCK_CONTRACT_ADDRESS_LOCALHOST=0x...
NEXT_PUBLIC_DSTK_TOKEN_ADDRESS_LOCALHOST=0x...
# ... other addresses for different networks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Foundry](https://github.com/foundry-rs/foundry) - Smart contract development
- [Next.js](https://nextjs.org/) - React framework
- [wagmi](https://wagmi.sh/) - Web3 React hooks
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [OpenZeppelin](https://openzeppelin.com/) - Smart contract standards
