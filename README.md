# DeStock - Decentralized Trading Platform 🚀

> **A comprehensive DeFi trading platform with AMM, order books, liquidity provision, and real-time microservices architecture.**

[![Foundry](https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg)](https://getfoundry.sh/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 🌟 Overview

DeStock is a professional-grade decentralized trading platform that enables trading of tokenized company shares using DSTK tokens. It combines automated market making (AMM), traditional order books, and liquidity provider rewards in a single platform.

## 🏗️ Architecture

```
Frontend (Next.js) ──► Load Balancer (Nginx) ──► Microservices
                                                  ├── Trade Engine (PostgreSQL)
                                                  ├── Market Maker Bot
                                                  └── Redis Cache
                                                        │
Smart Contracts ◄─────────────────────────────────────┘
├── DeStock.sol (Main Trading)                        │
└── DeStockToken.sol (Platform Token) ◄───────────────┘
```

## 📁 Project Structure

```
DeStock/
├── 📱 apps/web/                    # Next.js Trading Interface
├── 🔗 contracts/                  # Smart Contracts & Tests
│   ├── src/                      # Solidity contracts
│   ├── test/                     # Contract tests
│   └── script/                   # Deployment scripts
├── 🐳 services/                   # Microservices
│   ├── trade-engine/             # Order matching engine
│   └── market-maker/             # Automated trading bot
├── 🏗️ infrastructure/             # Docker & Config
│   ├── docker-compose.yml        # Service orchestration
│   └── nginx.conf                # Load balancer
├── 📜 scripts/                    # Automation scripts
├── 📚 docs/                       # Documentation
└── 🎨 assets/                     # Static assets
```

## � Quick Start

### Prerequisites
- Docker Desktop (running)
- Node.js 18+
- Foundry (`curl -L https://foundry.paradigm.xyz | bash`)

### One-Command Launch
```bash
# Clone and start the platform
git clone https://github.com/shri29s/DeStock.git
cd DeStock
chmod +x scripts/start-destock.sh
./scripts/start-destock.sh
```

### Access the Platform
| Service | URL | Description |
|---------|-----|-------------|
| **Trading Platform** | http://localhost:3000 | Main trading interface |
| **API Gateway** | http://localhost:80 | Load balancer |
| **Blockchain RPC** | http://localhost:8545 | Local blockchain |

## ✨ Key Features

### �️ Smart Contract Features
- **AMM Trading**: Automated market making with dynamic pricing
- **Order Book**: Traditional limit orders with matching engine  
- **LP Tokens**: Liquidity provider rewards system
- **Company Tokenization**: Create and trade company shares
- **Trading Fees**: 0.25% fee structure for platform sustainability

### 📈 Trading Interface
- **Real-time Order Book**: Live bid/ask spreads
- **Professional Charts**: Candlestick charts with timeframes
- **Portfolio Dashboard**: Holdings and P&L tracking
- **Market Heatmap**: Visual market overview
- **Instant Trading**: Market and limit orders

### 🛠️ Microservices
- **Trade Engine**: Real-time order matching with PostgreSQL
- **Market Maker**: Automated liquidity provision
- **WebSocket Streaming**: Live price feeds and order updates
- **Load Balancer**: High-availability architecture

## 🔧 Development

### Smart Contracts
```bash
npm run contracts:build    # Compile contracts
npm run contracts:test     # Run tests  
npm run contracts:deploy   # Deploy to local chain
```

### Frontend
```bash
npm run web:dev           # Start development server
npm run web:build         # Build for production
```

### Platform Management
```bash
npm run platform:start   # Start entire platform
npm run platform:stop    # Stop all services
```

## 🧪 Testing

```bash
# Smart contract tests
cd contracts && forge test -vv

# Service health checks
curl http://localhost:3002/api/health  # Trade Engine
curl http://localhost:3001/api/health  # Market Maker
```

## 📊 Tech Stack

**Blockchain**: Solidity, Foundry, OpenZeppelin  
**Frontend**: Next.js 15, TypeScript, Tailwind CSS, Wagmi  
**Backend**: Node.js, Express, PostgreSQL, Redis  
**Infrastructure**: Docker, Nginx, WebSocket  
**Charts**: Lightweight Charts, D3.js  

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Foundry](https://getfoundry.sh/) - Smart contract development
- [Next.js](https://nextjs.org/) - React framework
- [OpenZeppelin](https://openzeppelin.com/) - Smart contract security

---

**Built with ❤️ for the future of decentralized finance**
