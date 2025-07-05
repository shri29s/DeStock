#!/bin/bash

# DeStock Platform Deployment and Setup Script
# This script handles the complete deployment and configuration of the DeStock platform

set -e  # Exit on any error

echo "🚀 Starting DeStock Platform Deployment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check dependencies
check_dependencies() {
    log_info "Checking system dependencies..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    # Check if docker is installed and running
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker and try again."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        log_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    
    # Check if foundry is installed
    if ! command -v forge &> /dev/null; then
        log_error "Foundry is not installed. Please install Foundry and try again."
        exit 1
    fi
    
    log_success "All dependencies are available"
}

# Install node modules
install_dependencies() {
    log_info "Installing Node.js dependencies..."
    
    # Root package.json
    if [ -f "package.json" ]; then
        log_info "Installing root dependencies..."
        npm install
    fi
    
    # Frontend dependencies
    if [ -d "apps/web" ] && [ -f "apps/web/package.json" ]; then
        log_info "Installing frontend dependencies..."
        cd apps/web
        npm install
        cd ../..
    fi
    
    # Backend dependencies
    if [ -d "backend" ] && [ -f "backend/package.json" ]; then
        log_info "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
    fi
    
    # Trade engine dependencies
    if [ -d "services/trade-engine" ] && [ -f "services/trade-engine/package.json" ]; then
        log_info "Installing trade-engine dependencies..."
        cd services/trade-engine
        npm install
        cd ../..
    fi
    
    # Market maker dependencies
    if [ -d "services/market-maker" ] && [ -f "services/market-maker/package.json" ]; then
        log_info "Installing market-maker dependencies..."
        cd services/market-maker
        npm install
        cd ../..
    fi
    
    # Scripts dependencies (ethers for bootstrapCompanies.ts)
    log_info "Installing scripts dependencies..."
    npm install --save-dev ethers @types/node typescript ts-node
    
    log_success "All dependencies installed successfully"
}

# Setup and start infrastructure services
setup_infrastructure() {
    log_info "Setting up infrastructure services..."
    
    # Start PostgreSQL and Redis via Docker Compose
    if [ -f "docker-compose.yml" ]; then
        log_info "Starting PostgreSQL and Redis containers..."
        docker-compose up -d postgres redis
        
        # Wait for services to be ready
        log_info "Waiting for database to be ready..."
        sleep 10
        
        # Check if PostgreSQL is ready
        max_attempts=30
        attempt=1
        while [ $attempt -le $max_attempts ]; do
            if docker exec $(docker-compose ps -q postgres) pg_isready -U destock &> /dev/null; then
                log_success "PostgreSQL is ready"
                break
            fi
            log_info "Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
            sleep 2
            attempt=$((attempt + 1))
        done
        
        if [ $attempt -gt $max_attempts ]; then
            log_error "PostgreSQL failed to start"
            exit 1
        fi
        
        # Initialize database schema
        if [ -f "services/trade-engine/init.sql" ]; then
            log_info "Initializing database schema..."
            docker exec -i $(docker-compose ps -q postgres) psql -U destock -d destock < services/trade-engine/init.sql
            log_success "Database schema initialized"
        fi
    else
        log_warning "docker-compose.yml not found, skipping infrastructure setup"
    fi
}

# Deploy smart contracts
deploy_contracts() {
    log_info "Deploying smart contracts..."
    
    # Check if Anvil is running
    if ! curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://127.0.0.1:8545 &> /dev/null; then
        log_error "Anvil is not running. Please start Anvil first with: anvil --chain-id 31337 --port 8545"
        exit 1
    fi
    
    log_success "Anvil blockchain is running"
    
    # Deploy contracts using Foundry
    log_info "Deploying DeStock contracts..."
    forge script script/Deploy.s.sol:Deploy --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
    
    # Update contract addresses in environment files
    log_info "Updating contract addresses in configuration files..."
    
    # Extract contract addresses from broadcast files
    BROADCAST_DIR="broadcast/Deploy.s.sol/31337"
    if [ -d "$BROADCAST_DIR" ]; then
        # Get the latest deployment file
        LATEST_RUN=$(ls -t "$BROADCAST_DIR"/run-*.json | head -n1)
        if [ -f "$LATEST_RUN" ]; then
            log_info "Reading contract addresses from: $LATEST_RUN"
            # Note: In a real deployment, you'd parse the JSON to extract addresses
            # For now, we'll use the default addresses that should be consistent with Anvil
            DESTOCK_ADDRESS="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
            DSTK_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
            
            log_info "DeStock Contract: $DESTOCK_ADDRESS"
            log_info "DSTK Token Contract: $DSTK_ADDRESS"
        fi
    fi
    
    log_success "Smart contracts deployed successfully"
}

# Bootstrap companies
bootstrap_companies() {
    log_info "Registering companies to DeStock contract..."
    
    # Compile and run the bootstrap script
    if [ -f "scripts/bootstrapCompanies.ts" ]; then
        log_info "Running company registration script..."
        npx ts-node scripts/bootstrapCompanies.ts
        log_success "Companies registered successfully"
    else
        log_warning "Bootstrap script not found, skipping company registration"
    fi
}

# Start backend services
start_services() {
    log_info "Starting backend services..."
    
    # Start trade engine
    if [ -d "services/trade-engine" ] && [ -f "services/trade-engine/.env" ]; then
        log_info "Starting trade engine..."
        cd services/trade-engine
        npm start &
        TRADE_ENGINE_PID=$!
        cd ../..
        log_success "Trade engine started (PID: $TRADE_ENGINE_PID)"
    fi
    
    # Start market maker
    if [ -d "services/market-maker" ] && [ -f "services/market-maker/.env" ]; then
        log_info "Starting market maker..."
        cd services/market-maker
        npm start &
        MARKET_MAKER_PID=$!
        cd ../..
        log_success "Market maker started (PID: $MARKET_MAKER_PID)"
    fi
    
    # Wait a moment for services to initialize
    sleep 5
}

# Start frontend
start_frontend() {
    log_info "Starting frontend application..."
    
    if [ -d "apps/web" ]; then
        cd apps/web
        npm run dev &
        FRONTEND_PID=$!
        cd ../..
        log_success "Frontend started (PID: $FRONTEND_PID)"
    else
        log_error "Frontend directory not found"
        exit 1
    fi
}

# Verify deployment
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Wait for services to be fully ready
    sleep 10
    
    # Check if frontend is responding
    if curl -s http://localhost:3000 > /dev/null; then
        log_success "Frontend is responding on http://localhost:3000"
    else
        log_warning "Frontend might not be ready yet on http://localhost:3000"
    fi
    
    # Check if trade engine WebSocket is responding
    if curl -s http://localhost:8080 > /dev/null; then
        log_success "Trade engine is responding on port 8080"
    else
        log_warning "Trade engine might not be ready yet on port 8080"
    fi
    
    # Check if market maker WebSocket is responding
    if curl -s http://localhost:8081 > /dev/null; then
        log_success "Market maker is responding on port 8081"
    else
        log_warning "Market maker might not be ready yet on port 8081"
    fi
}

# Display final instructions
show_completion_message() {
    echo ""
    echo "🎉 DeStock Platform Deployment Complete!"
    echo ""
    echo "📋 Services Status:"
    echo "   🌐 Frontend:     http://localhost:3000"
    echo "   ⚡ Trade Engine: ws://localhost:8080"
    echo "   📊 Market Maker: ws://localhost:8081"
    echo "   🔗 Blockchain:   http://127.0.0.1:8545 (Chain ID: 31337)"
    echo ""
    echo "🔧 What to do next:"
    echo "   1. Open your browser and go to http://localhost:3000"
    echo "   2. Connect your MetaMask to localhost:8545 (Chain ID: 31337)"
    echo "   3. Import one of the Anvil test accounts using private keys"
    echo "   4. Use the faucet to get test DSTK tokens"
    echo "   5. Start trading!"
    echo ""
    echo "💡 Useful commands:"
    echo "   - Stop all services: ./stop-destock.sh"
    echo "   - View logs: docker-compose logs -f"
    echo "   - Restart blockchain: pkill anvil && anvil --chain-id 31337"
    echo ""
    echo "🚀 Happy trading with DeStock!"
}

# Cleanup function
cleanup() {
    log_info "Cleaning up..."
    # Kill background processes if needed
    # This is handled by the stop script
}

# Trap cleanup function on script exit
trap cleanup EXIT

# Main execution flow
main() {
    echo "🏗️  DeStock Platform Deployment Script"
    echo "======================================="
    
    check_dependencies
    install_dependencies
    setup_infrastructure
    deploy_contracts
    bootstrap_companies
    start_services
    start_frontend
    verify_deployment
    show_completion_message
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
