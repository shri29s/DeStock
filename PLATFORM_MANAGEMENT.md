# DeStock Platform Management

This document describes how to manage the DeStock trading platform using the provided scripts.

## Quick Start

### 🚀 Start the Platform
```bash
./start-destock.sh
# or
./destock.sh start
```

### 🛑 Stop the Platform
```bash
./stop-destock.sh
# or
./destock.sh stop
```

### 📊 Check Status
```bash
./destock.sh status
```

## Management Scripts

### 1. `start-destock.sh`
The main startup script that:
- ✅ Starts Anvil blockchain (localhost:8545)
- ✅ Compiles and deploys smart contracts
- ✅ Runs contract tests
- ✅ Starts Docker microservices (Database, Redis, Trade Engine, Market Maker, Load Balancer)
- ✅ Starts Next.js frontend (localhost:3000)
- ✅ Saves process IDs for easy cleanup

### 2. `stop-destock.sh`
The shutdown script that:
- 🛑 Stops all Docker containers
- 🛑 Kills Anvil blockchain process
- 🛑 Kills Next.js frontend process
- 🛑 Cleans up temporary files and logs
- 🛑 Verifies all services are stopped

### 3. `destock.sh`
The unified management script with commands:

#### Commands:
- `start` - Start the platform
- `stop` - Stop the platform  
- `restart` - Stop and start the platform
- `status` - Show service status
- `logs [service]` - View logs (docker, anvil, frontend)
- `clean` - Stop and clean up all data
- `help` - Show help

#### Examples:
```bash
# Start platform
./destock.sh start

# Check what's running
./destock.sh status

# View Docker logs in real-time
./destock.sh logs docker

# Restart everything
./destock.sh restart

# Clean shutdown and data cleanup
./destock.sh clean
```

## Service URLs

When running, the platform provides:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Trading interface |
| Blockchain | http://localhost:8545 | Anvil RPC endpoint |
| Load Balancer | http://localhost:80 | Nginx proxy |
| Trade Engine | http://localhost:3002 | Order processing |
| Market Maker | http://localhost:3001 | Market making bot |
| Database | localhost:5432 | PostgreSQL |
| Redis | localhost:6379 | Cache/sessions |

## Process Management

The scripts handle:
- **Blockchain**: Anvil process running on host
- **Microservices**: Docker containers
- **Frontend**: Node.js/Next.js process on host

## Troubleshooting

### Platform Won't Start
1. Check Docker Desktop is running
2. Ensure ports aren't in use: `netstat -an | grep ":8545\|:3000\|:80"`
3. Verify Node.js and Foundry are installed

### Platform Won't Stop
1. Try force stop: `./destock.sh clean`
2. Manually kill processes: `taskkill //F //IM anvil.exe` and `taskkill //F //IM node.exe`
3. Stop Docker Desktop

### Services Not Responding
1. Check status: `./destock.sh status`
2. View logs: `./destock.sh logs docker`
3. Restart: `./destock.sh restart`

## Files Created

The scripts create/manage:
- `.destock-pids` - Process IDs for cleanup
- `anvil.log` - Blockchain logs
- `apps/frontend.log` - Frontend logs
- `.env` - Updated with contract addresses

## Cross-Platform Support

The scripts support:
- ✅ Windows (Git Bash/MSYS2)
- ✅ Linux
- ✅ macOS

Process management automatically detects the platform and uses appropriate commands (`taskkill` on Windows, `pkill` on Unix).
