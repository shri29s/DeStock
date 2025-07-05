#!/bin/bash

# DeStock Platform Management Script
# Convenience wrapper for platform operations

set -e

show_help() {
    echo "DeStock Platform Management"
    echo "=========================="
    echo ""
    echo "Usage: ./destock.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start      Start the entire DeStock platform"
    echo "  stop       Stop all DeStock services"
    echo "  restart    Restart the platform"
    echo "  status     Check platform status"
    echo "  logs       View service logs"
    echo "  clean      Clean shutdown and reset"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./destock.sh start     # Start platform"
    echo "  ./destock.sh logs      # View logs"
    echo "  ./destock.sh clean     # Clean reset"
    echo ""
}

check_services() {
    echo "🔍 Checking DeStock Platform Status..."
    echo "====================================="
    
    # Check blockchain
    if curl -s http://localhost:8545 > /dev/null 2>&1; then
        echo "✅ Blockchain (Anvil): Running on port 8545"
    else
        echo "❌ Blockchain (Anvil): Not running"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend: Running on port 3000"
    elif curl -s http://localhost:3003 > /dev/null 2>&1; then
        echo "✅ Frontend: Running on port 3003"
    else
        echo "❌ Frontend: Not running"
    fi
    
    # Check services
    if curl -s http://localhost:3002/api/health > /dev/null 2>&1; then
        echo "✅ Trade Engine: Running on port 3002"
    else
        echo "❌ Trade Engine: Not running"
    fi
    
    if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
        echo "✅ Market Maker: Running on port 3001"
    else
        echo "❌ Market Maker: Not running"
    fi
    
    if curl -s http://localhost:80/health > /dev/null 2>&1; then
        echo "✅ Load Balancer: Running on port 80"
    else
        echo "❌ Load Balancer: Not running"
    fi
    
    # Check Docker
    if command -v docker > /dev/null 2>&1; then
        echo ""
        echo "🐳 Docker Containers:"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep destock || echo "No DeStock containers running"
    fi
    
    echo ""
}

view_logs() {
    echo "📋 DeStock Platform Logs"
    echo "========================"
    echo ""
    echo "Choose log source:"
    echo "1) All Docker services"
    echo "2) Trade Engine only"
    echo "3) Market Maker only"
    echo "4) Frontend only"
    echo "5) Blockchain (Anvil)"
    echo ""
    read -p "Enter choice (1-5): " choice
    
    case $choice in
        1)
            echo "Showing all Docker service logs..."
            cd infrastructure && docker-compose logs -f
            ;;
        2)
            echo "Showing Trade Engine logs..."
            cd infrastructure && docker-compose logs -f trade-engine
            ;;
        3)
            echo "Showing Market Maker logs..."
            cd infrastructure && docker-compose logs -f market-maker
            ;;
        4)
            echo "Showing Frontend logs..."
            if [ -f "apps/frontend.log" ]; then
                tail -f apps/frontend.log
            else
                echo "Frontend log not found. Start the platform first."
            fi
            ;;
        5)
            echo "Showing Anvil blockchain logs..."
            if [ -f "anvil.log" ]; then
                tail -f anvil.log
            else
                echo "Anvil log not found. Start the platform first."
            fi
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
}

clean_reset() {
    echo "🧹 Performing clean reset of DeStock platform..."
    echo "================================================"
    
    # Stop all services
    ./scripts/stop-destock.sh
    
    # Clean Docker
    echo "🐳 Cleaning Docker resources..."
    cd infrastructure
    docker-compose down -v --remove-orphans 2>/dev/null || true
    docker system prune -f --volumes 2>/dev/null || true
    cd ..
    
    # Remove temporary files
    echo "📁 Cleaning temporary files..."
    rm -f anvil.log apps/frontend.log .destock-pids 2>/dev/null || true
    
    # Clean contract artifacts
    echo "🔨 Cleaning contract artifacts..."
    cd contracts
    rm -rf out cache broadcast 2>/dev/null || true
    cd ..
    
    # Clean node modules if needed
    echo "📦 Cleaning frontend dependencies..."
    rm -rf apps/web/node_modules/.cache apps/web/.next 2>/dev/null || true
    
    echo "✅ Clean reset complete! Run './destock.sh start' to restart."
}

# Main command processing
case "${1:-help}" in
    start)
        echo "🚀 Starting DeStock Platform..."
        ./scripts/start-destock.sh
        ;;
    stop)
        echo "🛑 Stopping DeStock Platform..."
        ./scripts/stop-destock.sh
        ;;
    restart)
        echo "🔄 Restarting DeStock Platform..."
        ./scripts/stop-destock.sh
        sleep 2
        ./scripts/start-destock.sh
        ;;
    status)
        check_services
        ;;
    logs)
        view_logs
        ;;
    clean)
        clean_reset
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
