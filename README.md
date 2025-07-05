# DeStock - Decentralized Trading Platform for Tokenized Shares🚀

<div align="center">

[![Foundry](https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg?style=for-the-badge&logo=ethereum)](https://getfoundry.sh/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

<div align="center">
  <h3>🌟 A comprehensive DeFi trading platform with AMM, order books, liquidity provision, and real-time microservices architecture 🌟</h3>
</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [✨ Key Features](#-key-features)
- [🔧 Development](#-development)
- [🧪 Testing](#-testing)
- [📊 Tech Stack](#-tech-stack)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

DeStock is a **professional-grade decentralized trading platform** that enables trading of tokenized company shares using DSTK tokens. It combines automated market making (AMM), traditional order books, and liquidity provider rewards in a single platform.

<div align="center">
  <img src="./assets/destock image.png" alt="DeStock Platform" style="border-radius: 10px; margin: 20px 0;"/>
</div>

---

## 🏗️ Architecture

```mermaid
graph LR
    A[Frontend Next.js] --> B[Load Balancer Nginx]
    B --> C[Microservices]
    C --> D[Trade Engine PostgreSQL]
    C --> E[Market Maker Bot]
    C --> F[Redis Cache]
    F --> G[Smart Contracts]
    G --> H[DeStock.sol Main Trading]
    G --> I[DeStockToken.sol Platform Token]
```

<details>
<summary>📐 Architecture Diagram (Text)</summary>

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

</details>

---

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

---

## 🚀 Quick Start

### Prerequisites

<div align="center">

| Requirement | Version | Installation |
|-------------|---------|-------------|
| 🐳 Docker Desktop | Latest | [Download](https://www.docker.com/products/docker-desktop/) |
| 🟢 Node.js | 18+ | [Download](https://nodejs.org/) |
| ⚡ Foundry | Latest | `curl -L https://foundry.paradigm.xyz \| bash` |

</div>

### One-Command Launch

```bash
# Clone and start the platform
git clone https://github.com/shri29s/DeStock.git
cd DeStock
chmod +x scripts/start-destock.sh
./scripts/start-destock.sh
```

### 🌐 Access the Platform

<div align="center">

| Service | URL | Description |
|---------|-----|-------------|
| **🎯 Trading Platform** | http://localhost:3000 | Main trading interface |
| **🔧 API Gateway** | http://localhost:80 | Load balancer |
| **⛓️ Blockchain RPC** | http://localhost:8545 | Local blockchain |

</div>

---

## ✨ Key Features

### 🔗 Smart Contract Features

<table>
<tr>
<td width="50%">

**🤖 AMM Trading**
- Automated market making with dynamic pricing
- Liquidity pools with yield farming

**📊 Order Book**
- Traditional limit orders with matching engine
- Real-time order management

</td>
<td width="50%">

**🪙 LP Tokens**
- Liquidity provider rewards system
- Staking mechanisms

**🏢 Company Tokenization**
- Create and trade company shares
- Governance token integration

</td>
</tr>
</table>

**💰 Trading Fees**: 0.25% fee structure for platform sustainability

### 📈 Trading Interface

<div align="center">

| Feature | Description |
|---------|-------------|
| 📋 **Real-time Order Book** | Live bid/ask spreads |
| 📊 **Professional Charts** | Candlestick charts with timeframes |
| 💼 **Portfolio Dashboard** | Holdings and P&L tracking |
| 🗺️ **Market Heatmap** | Visual market overview |
| ⚡ **Instant Trading** | Market and limit orders |

</div>

### 🛠️ Microservices

- **🔄 Trade Engine**: Real-time order matching with PostgreSQL
- **🤖 Market Maker**: Automated liquidity provision
- **📡 WebSocket Streaming**: Live price feeds and order updates
- **⚖️ Load Balancer**: High-availability architecture

---

## 🔧 Development

### Smart Contracts

```bash
# 🏗️ Contract Development
npm run contracts:build    # Compile contracts
npm run contracts:test     # Run tests  
npm run contracts:deploy   # Deploy to local chain
```

### Frontend

```bash
# 🎨 Frontend Development
npm run web:dev           # Start development server
npm run web:build         # Build for production
```

### Platform Management

```bash
# 🚀 Platform Operations
npm run platform:start   # Start entire platform
npm run platform:stop    # Stop all services
```

---

## 🧪 Testing

### Smart Contract Tests

```bash
# 🔍 Contract Testing
cd contracts && forge test -vv
```

### Service Health Checks

```bash
# 🏥 Health Monitoring
curl http://localhost:3002/api/health  # Trade Engine
curl http://localhost:3001/api/health  # Market Maker
```

---

## 📊 Tech Stack

<div align="center">

### Blockchain Layer
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Foundry](https://img.shields.io/badge/Foundry-FFDB1C?style=for-the-badge&logo=ethereum&logoColor=black)
![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-4E5EE4?style=for-the-badge&logo=openzeppelin&logoColor=white)

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

</div>

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **🍴 Fork the repository**
2. **🌿 Create your feature branch**: `git checkout -b feature/amazing-feature`
3. **💾 Commit your changes**: `git commit -m 'Add amazing feature'`
4. **🚀 Push to the branch**: `git push origin feature/amazing-feature`
5. **📬 Open a Pull Request**

<div align="center">
  <a href="https://github.com/shri29s/DeStock/issues">
    <img src="https://img.shields.io/github/issues/shri29s/DeStock?style=for-the-badge&logo=github" alt="Issues">
  </a>
  <a href="https://github.com/shri29s/DeStock/pulls">
    <img src="https://img.shields.io/github/issues-pr/shri29s/DeStock?style=for-the-badge&logo=github" alt="Pull Requests">
  </a>
</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to these amazing projects that made DeStock possible:

- [**Foundry**](https://getfoundry.sh/) - Smart contract development toolkit
- [**Next.js**](https://nextjs.org/) - The React framework for production
- [**OpenZeppelin**](https://openzeppelin.com/) - Secure smart contract development

---

<div align="center">
  <h3>Built with ❤️ for the future of decentralized finance</h3>
  
  <p>
    <a href="https://github.com/shri29s/DeStock">⭐ Star this repository</a> if you find it helpful!
  </p>
  
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with Love">
  <img src="https://forthebadge.com/images/badges/powered-by-coffee.svg" alt="Powered by Coffee">
</div>