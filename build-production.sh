#!/bin/bash

echo "🚀 Building WeAreJobPilot for Production (Render)"
echo "================================================"

# Check available space
AVAILABLE=$(df -h . | tail -1 | awk '{print $4}')
echo "📊 Available space: $AVAILABLE"

# Copy production package.json
echo "📦 Setting up production dependencies..."
cd apps/web
cp package-production.json package.json

# Install only production dependencies
echo "📦 Installing production dependencies..."
npm install --production --no-optional

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Check build size
echo "📊 Build complete! Checking sizes..."
du -sh .next/
du -sh node_modules/

echo ""
echo "✅ Production build complete!"
echo "📁 Build output: apps/web/.next/"
echo "🚀 Ready for Render deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub"
echo "2. Connect to Render"
echo "3. Use render-production.yaml config"
echo "4. Set environment variables in Render dashboard"
