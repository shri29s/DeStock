#!/bin/bash

# DeStock Platform Management Script
# Quick commands for managing the DeStock trading platform

case "$1" in
  start)
    echo "🚀 Starting DeStock Trading Platform..."
    ./start-destock.sh
    ;;
  stop)
    echo "🛑 Stopping DeStock Trading Platform..."
    ./stop-destock.sh
    ;;
  restart)
    echo "🔄 Restarting DeStock Trading Platform..."
    ./stop-destock.sh
    sleep 3
    ./start-destock.sh
    ;;
  status)
    echo "📊 DeStock Platform Status:"
    echo "=========================="
    
    # Check blockchain
    if curl -s http://localhost:8545 > /dev/null 2>&1; then
      echo "🟢 Blockchain (Anvil): Running on port 8545"
    else
      echo "🔴 Blockchain (Anvil): Stopped"
    fi
    
    # Check Docker services
    if docker ps --format "table {{.Names}}" | grep -q destock; then
      echo "🟢 Docker Services: Running"
      docker ps --format "table {{.Names}}\t{{.Status}}" | grep destock
    else
      echo "🔴 Docker Services: Stopped"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
      echo "🟢 Frontend: Running on port 3000"
    elif curl -s http://localhost:3003 > /dev/null 2>&1; then
      echo "🟢 Frontend: Running on port 3003"
    else
      echo "🔴 Frontend: Stopped"
    fi
    
    # Check key services
    services=("3001:Market Maker" "3002:Trade Engine" "80:Load Balancer" "5432:Database" "6379:Redis")
    
    for service in "${services[@]}"; do
      port="${service%:*}"
      name="${service#*:}"
      
      if curl -s http://localhost:$port > /dev/null 2>&1 || nc -z localhost $port 2>/dev/null; then
        echo "🟢 $name: Running on port $port"
      else
        echo "🔴 $name: Stopped"
      fi
    done
    ;;
  logs)
    case "$2" in
      docker)
        echo "📋 Docker Services Logs:"
        docker-compose logs -f
        ;;
      anvil)
        echo "📋 Anvil Blockchain Logs:"
        if [ -f "anvil.log" ]; then
          tail -f anvil.log
        else
          echo "❌ anvil.log not found"
        fi
        ;;
      frontend)
        echo "📋 Frontend Logs:"
        if [ -f "apps/frontend.log" ]; then
          tail -f apps/frontend.log
        else
          echo "❌ frontend.log not found"
        fi
        ;;
      *)
        echo "📋 Available logs:"
        echo "   ./destock.sh logs docker    - Docker services logs"
        echo "   ./destock.sh logs anvil     - Anvil blockchain logs"
        echo "   ./destock.sh logs frontend  - Frontend application logs"
        ;;
    esac
    ;;
  clean)
    echo "🧹 Cleaning up DeStock platform..."
    ./stop-destock.sh
    echo "🗑️  Removing Docker volumes..."
    docker-compose down -v 2>/dev/null || true
    echo "🗑️  Removing build artifacts..."
    rm -rf apps/web/.next 2>/dev/null || true
    rm -rf apps/web/node_modules 2>/dev/null || true
    echo "✅ Cleanup complete"
    ;;
  help|*)
    echo "🎯 DeStock Platform Management"
    echo "=============================="
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start      Start the DeStock trading platform"
    echo "  stop       Stop all DeStock services"
    echo "  restart    Stop and start the platform"
    echo "  status     Show current platform status"
    echo "  logs       Show logs (docker|anvil|frontend)"
    echo "  clean      Stop services and clean up data"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start           # Start the platform"
    echo "  $0 status          # Check what's running"
    echo "  $0 logs docker     # View Docker logs"
    echo "  $0 restart         # Restart everything"
    echo ""
    ;;
esac
