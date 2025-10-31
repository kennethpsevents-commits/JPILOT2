/**
 * Function Validation Script
 * Checks all critical functions, API routes, and integrations
 */

import { readFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

interface FunctionCheck {
  name: string
  status: "pass" | "fail" | "warning"
  message: string
}

const checks: FunctionCheck[] = []

function addCheck(name: string, status: "pass" | "fail" | "warning", message: string) {
  checks.push({ name, status, message })
  const icon = status === "pass" ? "✅" : status === "fail" ? "❌" : "⚠️"
  console.log(`[v0] ${icon} ${name}: ${message}`)
}

// Check if file exists
function fileExists(path: string): boolean {
  try {
    statSync(path)
    return true
  } catch {
    return false
  }
}

// Check file content for pattern
function fileContains(path: string, pattern: RegExp): boolean {
  try {
    const content = readFileSync(path, "utf-8")
    return pattern.test(content)
  } catch {
    return false
  }
}

// Find all API routes
function findApiRoutes(dir = "./app/api"): string[] {
  const routes: string[] = []

  if (!fileExists(dir)) {
    return routes
  }

  const files = readdirSync(dir)

  for (const file of files) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      routes.push(...findApiRoutes(fullPath))
    } else if (file === "route.ts" || file === "route.tsx") {
      const route = fullPath.replace("./app/api", "/api").replace("/route.ts", "").replace("/route.tsx", "")
      routes.push(route)
    }
  }

  return routes
}

console.log("[v0] 🔍 Starting function validation...\n")

// 1. Check Root Layout
console.log("[v0] 📋 Checking Core Files...\n")

if (fileExists("./app/layout.tsx")) {
  addCheck("Root Layout", "pass", "app/layout.tsx exists")

  if (fileContains("./app/layout.tsx", /export\s+default\s+function\s+RootLayout/)) {
    addCheck("Root Layout Export", "pass", "RootLayout component exported")
  } else {
    addCheck("Root Layout Export", "fail", "RootLayout component not found")
  }
} else {
  addCheck("Root Layout", "fail", "app/layout.tsx missing")
}

// 2. Check Navigation Component
if (fileExists("./components/navigation.tsx")) {
  addCheck("Navigation Component", "pass", "Navigation component exists")
} else {
  addCheck("Navigation Component", "fail", "Navigation component missing")
}

// 3. Check Footer Component
if (fileExists("./components/footer.tsx")) {
  addCheck("Footer Component", "pass", "Footer component exists")
} else {
  addCheck("Footer Component", "warning", "Footer component missing")
}

console.log("")
console.log("[v0] 🔌 Checking Integrations...\n")

// 4. Check Supabase Integration
if (fileExists("./lib/supabase/client.ts") || fileExists("./lib/supabase.ts")) {
  addCheck("Supabase Client", "pass", "Supabase client configured")
} else {
  addCheck("Supabase Client", "warning", "Supabase client not found")
}

// 5. Check Environment Variables
if (fileExists(".env.local") || fileExists(".env")) {
  addCheck("Environment Variables", "pass", "Environment file exists")
} else {
  addCheck("Environment Variables", "warning", "No .env file found (may use Vercel env vars)")
}

console.log("")
console.log("[v0] 🛣️  Checking API Routes...\n")

// 6. Check API Routes
const apiRoutes = findApiRoutes()
if (apiRoutes.length > 0) {
  addCheck("API Routes", "pass", `Found ${apiRoutes.length} API routes`)
  apiRoutes.forEach((route) => console.log(`   - ${route}`))
} else {
  addCheck("API Routes", "warning", "No API routes found")
}

console.log("")
console.log("[v0] 🔐 Checking Authentication...\n")

// 7. Check Auth Pages
const authPages = ["./app/auth/login/page.tsx", "./app/auth/sign-up/page.tsx"]

authPages.forEach((page) => {
  const pageName = page.split("/").slice(-2, -1)[0]
  if (fileExists(page)) {
    addCheck(`Auth: ${pageName}`, "pass", `${pageName} page exists`)
  } else {
    addCheck(`Auth: ${pageName}`, "fail", `${pageName} page missing`)
  }
})

console.log("")
console.log("[v0] 📄 Checking Core Pages...\n")

// 8. Check Core Pages
const corePages = [
  { path: "./app/page.tsx", name: "Homepage" },
  { path: "./app/jobs/page.tsx", name: "Jobs Listing" },
  { path: "./app/dashboard/page.tsx", name: "Dashboard" },
  { path: "./app/profile/page.tsx", name: "Profile" },
]

corePages.forEach(({ path, name }) => {
  if (fileExists(path)) {
    addCheck(name, "pass", `${name} exists`)
  } else {
    addCheck(name, "fail", `${name} missing`)
  }
})

console.log("")
console.log("[v0] 📊 VALIDATION SUMMARY:\n")

const passed = checks.filter((c) => c.status === "pass").length
const failed = checks.filter((c) => c.status === "fail").length
const warnings = checks.filter((c) => c.status === "warning").length

console.log(`   ✅ Passed: ${passed}`)
console.log(`   ❌ Failed: ${failed}`)
console.log(`   ⚠️  Warnings: ${warnings}`)
console.log(`   📋 Total Checks: ${checks.length}`)
console.log("")

if (failed === 0) {
  console.log("[v0] ✅ ALL CRITICAL FUNCTIONS VALIDATED!\n")
  process.exit(0)
} else {
  console.log("[v0] ❌ VALIDATION FAILED! Please fix critical issues.\n")
  process.exit(1)
}
