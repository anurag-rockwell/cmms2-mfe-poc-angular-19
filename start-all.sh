#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "=========================================="
echo "Angular 19 - CMMS Application"
echo "=========================================="
echo ""

# Kill any existing processes on these ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:4200 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5001 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5002 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5003 2>/dev/null | xargs kill -9 2>/dev/null
echo "✓ Ports cleared"
echo ""

# Check if node_modules exist
if [ ! -d "$SCRIPT_DIR/shell/node_modules" ]; then
  echo "⚠️  node_modules not found. Installing dependencies..."
  echo ""
  cd "$SCRIPT_DIR/shell" && npm install --silent
  cd "$SCRIPT_DIR/dashboard-mfe" && npm install --silent
  cd "$SCRIPT_DIR/assets-mfe" && npm install --silent
  cd "$SCRIPT_DIR/work-orders-mfe" && npm install --silent
  echo ""
fi

echo "�� Starting all applications..."
echo ""

# Start Shell on port 4200 (default)
cd "$SCRIPT_DIR/shell"
npm start 2>&1 &
SHELL_PID=$!
echo "✅ Shell started on http://localhost:4200 (PID: $SHELL_PID)"

# Wait a bit for shell to start
sleep 2

# Start Dashboard MFE on port 5003
cd "$SCRIPT_DIR/dashboard-mfe"
npm start 2>&1 &
DASHBOARD_PID=$!
echo "✅ Dashboard MFE started on http://localhost:5003 (PID: $DASHBOARD_PID)"

# Start Assets MFE on port 5001 (optional - standalone demo)
cd "$SCRIPT_DIR/assets-mfe"
npm start 2>&1 &
ASSETS_PID=$!
echo "✅ Assets MFE started on http://localhost:5001 (PID: $ASSETS_PID)"

# Start Work Orders MFE on port 5002 (optional - standalone demo)
cd "$SCRIPT_DIR/work-orders-mfe"
npm start 2>&1 &
WORKORDERS_PID=$!
echo "✅ Work Orders MFE started on http://localhost:5002 (PID: $WORKORDERS_PID)"

echo ""
echo "====� Dashboard MFE Demo: http://localhost:5003 (standalone)"
echo "   📦 Assets MFE Demo: http://localhost:5001 (standalone)"
echo "   📋 Work Orders MFE Demo: http://localhost:5002 (standalone)"
echo ""
echo "ℹ️  All components are now bundled in the main app"
echo "   The MFE apps on 5001/5002/50030 seconds):"
echo "   📱 Main App: http://localhost:4200 ⭐ (Use this one!)"
echo "   📦 Assets MFE Demo: http://localhost:5001 (standalone)"
echo "   📋 Work Orders MFE Demo: http://localhost:5002 (standalone)"
echo ""
echo "ℹ️  All components are now bundled in the main app"
echo "   The MFE apps on 5001/5002 are for standalone demo only"
echo ""
echo "Press Ctrl+C to stop all applications"
echo ""

# Function to cleanup on exit
cleanup() {
  echo ""
  echo "🛑 StoppingDASHBOARD_PID $ASSETS_PID $WORKORDERS_PID 2>/dev/null
  echo "✓ All applications stopped"
  exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for all background processes
wait $SHELL_PID $DASHBOARDall background processes
wait $SHELL_PID $ASSETS_PID $WORKORDERS_PID
