#!/bin/bash

echo "🚀 Setting up WeAreJobPilot Minimal (Lightweight Version)"
echo "=================================================="

# Check available space
AVAILABLE=$(df -h . | tail -1 | awk '{print $4}')
echo "📊 Available space: $AVAILABLE"

# Install Node.js (if not present)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
fi

# Install dependencies (minimal)
echo "📦 Installing minimal dependencies..."
cd apps/web
npm install --production

# Copy minimal files
echo "📝 Setting up minimal app..."
cp page-minimal.tsx src/app/page.tsx
cp jobs-minimal.tsx src/app/jobs/page.tsx

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the app:"
echo "   cd apps/web && npm run dev"
echo ""
echo "🌐 Then open: http://localhost:3000"
echo ""
echo "💾 This version uses only ~50MB instead of 15GB!"
