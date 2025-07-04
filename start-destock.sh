#!/bin/bash

echo "🚀 Starting DeStock Trading Platform..."

# Check if Anvil is running
if ! curl -s http://localhost:8545 > /dev/null; then
    echo "❌ Anvil not running. Please start with: anvil --host 0.0.0.0 --port 8545"
    exit 1
fi

echo "✅ Anvil blockchain detected"

# Compile and test contracts
echo "🔨 Compiling contracts..."
forge build

echo "🧪 Running tests..."
forge test

# Deploy contracts
echo "📦 Deploying contracts..."
forge script script/Deploy.s.sol:Deploy --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose down
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to initialize..."
sleep 10

# Check service health
echo "🏥 Checking service health..."
curl -f http://localhost:3002/api/health
curl -f http://localhost:3001/api/health
curl -f http://localhost:80/health

echo "✅ All services healthy!"

# Start frontend (in background)
echo "🌐 Starting frontend..."
cd apps/web
npm run dev &

echo "🎉 DeStock platform is running!"
echo "📱 Frontend: http://localhost:3003"
echo "🔗 Blockchain: http://localhost:8545"
echo "🐳 Services: http://localhost:80"
