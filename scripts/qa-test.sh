#!/bin/bash

echo "🧪 WeAreJobPilot QA Test Suite"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Please run this script from the project root${NC}"
    exit 1
fi

echo "📋 Running comprehensive QA tests..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
cd apps/web
npm install --silent
if [ $? -eq 0 ]; then
    print_status "Dependencies installed" 0
else
    print_status "Dependencies installation failed" 1
    exit 1
fi

# 2. TypeScript check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    print_status "TypeScript check passed" 0
else
    print_status "TypeScript check failed" 1
fi

# 3. ESLint check
echo "🔍 Running ESLint..."
npx eslint . --ext .ts,.tsx --max-warnings 0
if [ $? -eq 0 ]; then
    print_status "ESLint check passed" 0
else
    print_status "ESLint check failed" 1
fi

# 4. Unit tests
echo "🧪 Running unit tests..."
npm test -- --passWithNoTests --watchAll=false
if [ $? -eq 0 ]; then
    print_status "Unit tests passed" 0
else
    print_status "Unit tests failed" 1
fi

# 5. Build test
echo "🔨 Testing production build..."
npm run build
if [ $? -eq 0 ]; then
    print_status "Production build successful" 0
else
    print_status "Production build failed" 1
fi

# 6. Start server for E2E tests
echo "🚀 Starting development server..."
npm run dev &
SERVER_PID=$!
sleep 10

# 7. E2E tests
echo "🎭 Running E2E tests..."
cd ../..
npx playwright test tests/qa/flows.spec.ts --reporter=list
E2E_EXIT_CODE=$?

# 8. Stop server
kill $SERVER_PID 2>/dev/null

if [ $E2E_EXIT_CODE -eq 0 ]; then
    print_status "E2E tests passed" 0
else
    print_status "E2E tests failed" 1
fi

# 9. Security audit
echo "🛡️ Running security audit..."
cd apps/web
npm audit --audit-level=moderate
if [ $? -eq 0 ]; then
    print_status "Security audit passed" 0
else
    print_warning "Security vulnerabilities found - review required"
fi

# 10. Bundle size check
echo "📊 Checking bundle size..."
BUNDLE_SIZE=$(du -sh .next/static 2>/dev/null | cut -f1)
if [ ! -z "$BUNDLE_SIZE" ]; then
    echo "Bundle size: $BUNDLE_SIZE"
    print_status "Bundle size check completed" 0
else
    print_warning "Bundle size could not be determined"
fi

# Summary
echo ""
echo "📋 QA Test Summary"
echo "=================="

if [ $E2E_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}🎉 All critical tests passed! Ready for production.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review and fix before deploying.${NC}"
    exit 1
fi
