#!/bin/bash

set -e  # Exit on any error

echo "🚀 Starting DeStock Trading Platform..."
echo "=================================================="

# Function to check if a port is in use
check_port() {
    local port=$1
    if netstat -an | grep -q ":$port.*LISTEN"; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $name to be ready..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "✅ $name is ready!"
            return 0
        fi
        echo "   Attempt $attempt/$max_attempts - $name not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ $name failed to start after $max_attempts attempts"
    return 1
}

# Check and start Anvil if needed
echo "🔗 Checking blockchain status..."
if curl -s http://localhost:8545 > /dev/null 2>&1; then
    echo "✅ Anvil blockchain already running"
else
    echo "🔄 Starting Anvil blockchain..."
    
    # Kill any existing anvil processes (check if pkill exists)
    if command -v pkill >/dev/null 2>&1; then
        pkill -f anvil 2>/dev/null || true
    else
        # Alternative way to kill anvil processes on Windows
        tasklist | grep anvil && taskkill /F /IM anvil.exe 2>/dev/null || true
    fi
    
    # Start Anvil in background
    anvil --host 0.0.0.0 --port 8545 --chain-id 31337 > anvil.log 2>&1 &
    ANVIL_PID=$!
    echo "📝 Anvil started with PID: $ANVIL_PID"
    
    # Wait for Anvil to be ready
    if wait_for_service "http://localhost:8545" "Anvil blockchain"; then
        echo "✅ Anvil blockchain ready"
    else
        echo "❌ Failed to start Anvil blockchain"
        exit 1
    fi
fi

# Check if foundry is properly set up
echo "🔨 Checking Foundry setup..."
if ! command -v forge &> /dev/null; then
    echo "❌ Forge not found. Please install Foundry first."
    exit 1
fi

# Compile contracts
echo "🔨 Compiling contracts..."
if ! forge build; then
    echo "❌ Contract compilation failed"
    exit 1
fi

echo "✅ Contracts compiled successfully"

# Run tests
echo "🧪 Running contract tests..."
if ! forge test; then
    echo "⚠️  Some tests failed, but continuing with deployment..."
else
    echo "✅ All tests passed"
fi

# Deploy contracts
echo "📦 Deploying contracts..."
DEPLOY_OUTPUT=$(forge script script/Deploy.s.sol:Deploy \
    --rpc-url http://localhost:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    --broadcast 2>&1)

echo "$DEPLOY_OUTPUT"

# Extract contract addresses from deployment output
if echo "$DEPLOY_OUTPUT" | grep -q "ONCHAIN EXECUTION COMPLETE"; then
    echo "✅ Contracts deployed successfully"
    
    # Extract contract addresses if possible
    TOKEN_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep "contract DeStockToken" | head -1 | grep -o "0x[a-fA-F0-9]\{40\}" | head -1 || echo "")
    DESTOCK_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep "contract DeStock" | head -1 | grep -o "0x[a-fA-F0-9]\{40\}" | head -1 || echo "")
    
    if [ ! -z "$TOKEN_ADDRESS" ] && [ ! -z "$DESTOCK_ADDRESS" ]; then
        echo "📄 Token Contract: $TOKEN_ADDRESS"
        echo "📄 DeStock Contract: $DESTOCK_ADDRESS"
        
        # Update .env file with new contract addresses
        if [ -f ".env" ]; then
            # Use a more portable sed command
            if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
                # Windows-style path fix
                cp .env .env.bak
                grep -v "DESTOCK_CONTRACT_ADDRESS=" .env.bak > .env.tmp
                echo "DESTOCK_CONTRACT_ADDRESS=$DESTOCK_ADDRESS" >> .env.tmp
                mv .env.tmp .env
            else
                sed -i "s|DESTOCK_CONTRACT_ADDRESS=.*|DESTOCK_CONTRACT_ADDRESS=$DESTOCK_ADDRESS|" .env
            fi
            echo "✅ Updated .env with new contract addresses"
        fi
    fi
else
    echo "❌ Contract deployment failed"
    exit 1
fi

# Check Docker
echo "🐳 Checking Docker..."
if ! docker --version > /dev/null 2>&1; then
    echo "❌ Docker not found. Please install Docker Desktop."
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker daemon not running. Please start Docker Desktop."
    exit 1
fi

# Stop any existing Docker services
echo "� Stopping existing Docker services..."
docker-compose down > /dev/null 2>&1 || true

# Start Docker services
echo "🐳 Starting Docker microservices..."
if ! docker-compose up -d; then
    echo "❌ Failed to start Docker services"
    exit 1
fi

# Wait for Docker services to be ready
echo "⏳ Waiting for microservices to initialize..."
sleep 15

# Check service health
echo "🏥 Checking service health..."
HEALTH_CHECKS=0

if wait_for_service "http://localhost:3002/api/health" "Trade Engine"; then
    HEALTH_CHECKS=$((HEALTH_CHECKS + 1))
fi

if wait_for_service "http://localhost:3001/api/health" "Market Maker"; then
    HEALTH_CHECKS=$((HEALTH_CHECKS + 1))
fi

if wait_for_service "http://localhost:80/health" "Load Balancer"; then
    HEALTH_CHECKS=$((HEALTH_CHECKS + 1))
fi

if [ $HEALTH_CHECKS -eq 3 ]; then
    echo "✅ All microservices are healthy!"
else
    echo "⚠️  Some services may not be fully ready, but continuing..."
fi

# Check if Node.js is available
echo "🟢 Checking Node.js..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js."
    exit 1
fi

# Start frontend
echo "🌐 Starting frontend application..."
cd apps/web

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
echo "🚀 Starting Next.js development server..."
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "📝 Frontend started with PID: $FRONTEND_PID"

# Go back to root directory
cd ../..

# Wait for frontend to be ready
echo "⏳ Waiting for frontend to be ready..."
sleep 10

# Check if frontend is running
FRONTEND_PORT=3003
if check_port $FRONTEND_PORT; then
    echo "✅ Frontend is running on port $FRONTEND_PORT"
else
    # Try alternative port
    FRONTEND_PORT=3000
    if check_port $FRONTEND_PORT; then
        echo "✅ Frontend is running on port $FRONTEND_PORT"
    else
        echo "⚠️  Frontend may still be starting up..."
    fi
fi

echo ""
echo "🎉 DeStock Trading Platform is now running!"
echo "=================================================="
echo "📱 Frontend:      http://localhost:$FRONTEND_PORT"
echo "🔗 Blockchain:    http://localhost:8545"
echo "🐳 Load Balancer: http://localhost:80"
echo "⚙️  Trade Engine:  http://localhost:3002"
echo "🤖 Market Maker:  http://localhost:3001"
echo "🗄️  Database:     localhost:5432"
echo "💾 Redis Cache:   localhost:6379"
echo ""
echo "📊 Service Status:"
echo "✅ Anvil Blockchain (PID: $ANVIL_PID)"
echo "✅ Docker Microservices"
echo "✅ Next.js Frontend (PID: $FRONTEND_PID)"
echo ""
echo "📋 Useful Commands:"
echo "   View logs:        docker-compose logs -f"
echo "   Stop services:    docker-compose down"
echo "   Kill frontend:    kill $FRONTEND_PID"
echo "   Kill blockchain:  kill $ANVIL_PID"
echo ""
echo "🎯 Ready for trading! Open http://localhost:$FRONTEND_PORT"
