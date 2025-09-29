#!/bin/bash

echo "🚀 WeAreJobPilot - Vercel Pro Deployment"
echo "========================================"

# Set Node.js path
export PATH=$PATH:$(pwd)/node-v20.10.0-darwin-x64/bin

# Create standalone Next.js app for Vercel
echo "📦 Creating standalone Next.js app..."

# Copy web app to root for Vercel
cp -r apps/web/* .
cp apps/web/package.json ./package-standalone.json

# Update package.json for Vercel
cat > package.json << 'EOF'
{
  "name": "wearejobpilot",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.2.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "@supabase/supabase-js": "^2.39.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "yaml": "^2.8.1",
    "web-vitals": "^3.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5.9.2",
    "eslint": "^8.57.0",
    "eslint-config-next": "15.2.3"
  }
}
EOF

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔨 Building application..."
npm run build

echo "✅ Ready for Vercel deployment!"
echo ""
echo "Next steps:"
echo "1. Go to vercel.com/dashboard"
echo "2. Click 'New Project'"
echo "3. Upload this folder or connect GitHub"
echo "4. Set Root Directory to current folder"
echo "5. Add environment variables"
echo "6. Deploy!"
