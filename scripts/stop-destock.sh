#!/bin/bash

echo "🛑 Stopping DeStock Trading Platform..."
echo "=================================================="

# Function to safely kill process by PID
kill_process() {
    local pid=$1
    local name=$2
    
    if [ ! -z "$pid" ] && [ "$pid" != "" ]; then
        if kill -0 "$pid" 2>/dev/null; then
            echo "🔄 Stopping $name (PID: $pid)..."
            kill "$pid" 2>/dev/null || true
            sleep 2
            
            # Force kill if still running
            if kill -0 "$pid" 2>/dev/null; then
                echo "⚠️  Force killing $name (PID: $pid)..."
                kill -9 "$pid" 2>/dev/null || true
            fi
            echo "✅ $name stopped"
        else
            echo "ℹ️  $name (PID: $pid) was not running"
        fi
    else
        echo "ℹ️  No PID found for $name"
    fi
}

# Function to kill processes by name pattern
kill_by_pattern() {
    local pattern=$1
    local name=$2
    
    echo "🔍 Looking for $name processes..."
    
    # Check if pkill is available (Unix/Linux/MacOS)
    if command -v pkill >/dev/null 2>&1; then
        local count=$(pgrep -f "$pattern" | wc -l)
        if [ "$count" -gt 0 ]; then
            echo "🔄 Stopping $count $name process(es)..."
            pkill -f "$pattern" 2>/dev/null || true
            sleep 2
            
            # Force kill if still running
            local remaining=$(pgrep -f "$pattern" | wc -l)
            if [ "$remaining" -gt 0 ]; then
                echo "⚠️  Force killing remaining $name processes..."
                pkill -9 -f "$pattern" 2>/dev/null || true
            fi
            echo "✅ $name processes stopped"
        else
            echo "ℹ️  No $name processes found"
        fi
    else
        # Windows alternative using tasklist/taskkill
        echo "🔄 Stopping $name processes (Windows)..."
        if command -v tasklist >/dev/null 2>&1; then
            # Kill anvil processes on Windows
            if [[ "$pattern" == *"anvil"* ]]; then
                tasklist | grep -i anvil > /dev/null 2>&1 && {
                    echo "🔄 Found Anvil processes, stopping..."
                    taskkill //F //IM anvil.exe 2>/dev/null || true
                    echo "✅ Anvil processes stopped"
                } || echo "ℹ️  No Anvil processes found"
            fi
            
            # Kill Node.js processes (for npm run dev)
            if [[ "$pattern" == *"npm"* ]] || [[ "$pattern" == *"node"* ]]; then
                tasklist | grep -i node > /dev/null 2>&1 && {
                    echo "🔄 Found Node.js processes, stopping frontend..."
                    taskkill //F //IM node.exe 2>/dev/null || true
                    echo "✅ Node.js processes stopped"
                } || echo "ℹ️  No Node.js processes found"
            fi
        else
            echo "⚠️  Cannot find process management tools"
        fi
    fi
}

# Step 1: Stop Docker services
echo "🐳 Stopping Docker microservices..."
if command -v docker-compose >/dev/null 2>&1; then
    if [ -f "infrastructure/docker-compose.yml" ]; then
        cd infrastructure
        docker-compose down 2>/dev/null && echo "✅ Docker services stopped" || echo "⚠️  Docker services may not have been running"
        cd ..
    elif [ -f "docker-compose.yml" ]; then
        docker-compose down 2>/dev/null && echo "✅ Docker services stopped" || echo "⚠️  Docker services may not have been running"
    else
        echo "⚠️  docker-compose.yml not found"
    fi
else
    echo "⚠️  docker-compose not found"
fi

# Step 2: Read PIDs from PID file
echo ""
echo "🔍 Reading process IDs from .destock-pids file..."

ANVIL_PID=""
FRONTEND_PID=""

if [ -f ".destock-pids" ]; then
    # Source the PID file to get the variables
    source .destock-pids
    echo "📋 Found PID file with:"
    [ ! -z "$ANVIL_PID" ] && echo "   Anvil PID: $ANVIL_PID"
    [ ! -z "$FRONTEND_PID" ] && echo "   Frontend PID: $FRONTEND_PID"
    [ ! -z "$START_TIME" ] && echo "   Started: $START_TIME"
else
    echo "⚠️  No .destock-pids file found, will use process pattern matching"
fi

# Step 3: Stop Anvil blockchain
echo ""
echo "⚛️  Stopping Anvil blockchain..."
if [ ! -z "$ANVIL_PID" ]; then
    kill_process "$ANVIL_PID" "Anvil blockchain"
else
    kill_by_pattern "anvil" "Anvil blockchain"
fi

# Step 4: Stop Frontend (Next.js)
echo ""
echo "🌐 Stopping frontend application..."
if [ ! -z "$FRONTEND_PID" ]; then
    kill_process "$FRONTEND_PID" "Frontend application"
else
    kill_by_pattern "npm run dev" "Frontend (npm run dev)"
    kill_by_pattern "next-server" "Next.js server"
fi

# Step 5: Additional cleanup - stop any remaining Node.js processes that might be related
echo ""
echo "🧹 Additional cleanup..."

# Stop any remaining processes on our specific ports
echo "🔌 Checking for processes on DeStock ports..."

# Function to kill process on specific port
kill_port() {
    local port=$1
    local service_name=$2
    
    if command -v lsof >/dev/null 2>&1; then
        # Unix/Linux/MacOS
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$pid" ]; then
            echo "🔄 Killing process on port $port ($service_name)..."
            kill "$pid" 2>/dev/null || kill -9 "$pid" 2>/dev/null || true
            echo "✅ Port $port freed"
        else
            echo "ℹ️  No process found on port $port"
        fi
    elif command -v netstat >/dev/null 2>&1; then
        # Windows with netstat
        local pid=$(netstat -ano | grep ":$port " | awk '{print $5}' | head -1)
        if [ ! -z "$pid" ] && [ "$pid" != "0" ]; then
            echo "🔄 Killing process on port $port ($service_name)..."
            taskkill //F //PID "$pid" 2>/dev/null || true
            echo "✅ Port $port freed"
        else
            echo "ℹ️  No process found on port $port"
        fi
    fi
}

# Kill processes on specific ports
kill_port 8545 "Anvil blockchain"
kill_port 3000 "Frontend (Next.js)"
kill_port 3003 "Frontend (Next.js alternative port)"

# Step 6: Cleanup temporary files
echo ""
echo "🧹 Cleaning up temporary files..."

# Remove log files
if [ -f "anvil.log" ]; then
    rm -f anvil.log
    echo "✅ Removed anvil.log"
fi

if [ -f "apps/frontend.log" ]; then
    rm -f apps/frontend.log
    echo "✅ Removed frontend.log"
fi

# Remove PID file
if [ -f ".destock-pids" ]; then
    echo "STOP_TIME=$(date)" >> .destock-pids
    rm -f .destock-pids
    echo "✅ Removed .destock-pids"
fi

# Step 7: Verify everything is stopped
echo ""
echo "🔍 Verifying services are stopped..."

# Check if ports are free
check_port_free() {
    local port=$1
    local service=$2
    
    if command -v nc >/dev/null 2>&1; then
        if ! nc -z localhost $port 2>/dev/null; then
            echo "✅ Port $port ($service) is free"
        else
            echo "⚠️  Port $port ($service) still in use"
        fi
    elif command -v curl >/dev/null 2>&1; then
        if ! curl -s http://localhost:$port >/dev/null 2>&1; then
            echo "✅ Port $port ($service) is free"
        else
            echo "⚠️  Port $port ($service) still responding"
        fi
    fi
}

check_port_free 8545 "Blockchain"
check_port_free 3000 "Frontend"
check_port_free 3001 "Market Maker"
check_port_free 3002 "Trade Engine"
check_port_free 80 "Load Balancer"

# Step 8: Final summary
echo ""
echo "🎯 DeStock Platform Shutdown Complete!"
echo "=================================================="
echo "✅ Docker microservices stopped"
echo "✅ Anvil blockchain stopped"
echo "✅ Frontend application stopped"
echo "✅ Temporary files cleaned"
echo ""
echo "📋 Platform Status:"
echo "🔴 All services are now offline"
echo ""
echo "💡 To restart the platform, run:"
echo "   ./start-destock.sh"
echo ""
echo "🛠️  Troubleshooting:"
echo "   If any services are still running:"
echo "   - Check Docker Desktop and stop containers manually"
echo "   - Restart your terminal/system if processes persist"
echo "   - Run 'docker ps' to check for remaining containers"
echo ""
