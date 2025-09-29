#!/bin/bash

# WeAreJobPilot Setup Script
echo "🚀 Setting up WeAreJobPilot..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm@10.17.0"
    exit 1
fi

# Check pnpm version
PNPM_VERSION=$(pnpm --version | cut -d. -f1)
if [ "$PNPM_VERSION" -lt 10 ]; then
    echo "❌ pnpm version 10+ is required. Current version: $(pnpm --version)"
    echo "Please update pnpm: npm install -g pnpm@10.17.0"
    exit 1
fi

echo "✅ pnpm version $(pnpm --version) is compatible"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check if .env.local exists
if [ ! -f "apps/web/.env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp env.example apps/web/.env.local
    echo "📝 Please update apps/web/.env.local with your Supabase credentials"
fi

# Build UI package first
echo "🔨 Building UI package..."
pnpm --filter @wearejobpilot/ui build

# Build web app
echo "🔨 Building web application..."
pnpm --filter web build

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update apps/web/.env.local with your Supabase credentials"
echo "2. Run the Supabase schema: supabase/schema.sql"
echo "3. Start development: pnpm dev"
echo "4. Run tests: pnpm test"
echo "5. Run E2E tests: pnpm test:e2e"
echo ""
echo "Happy coding! 🎉"
