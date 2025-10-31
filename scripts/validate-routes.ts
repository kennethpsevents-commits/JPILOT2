/**
 * Route Validation Script
 * Checks all routes, links, and navigation for dead ends
 * Run this to ensure 100% route coverage with no dead ends
 */

import { readFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

interface ValidationResult {
  success: boolean
  errors: string[]
  warnings: string[]
  stats: {
    totalRoutes: number
    totalLinks: number
    deadLinks: number
    validLinks: number
  }
}

// Find all page.tsx files (routes)
function findAllRoutes(dir: string, baseDir: string = dir): string[] {
  const routes: string[] = []
  const files = readdirSync(dir)

  for (const file of files) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      routes.push(...findAllRoutes(fullPath, baseDir))
    } else if (file === "page.tsx") {
      // Convert file path to route
      const route =
        fullPath
          .replace(baseDir, "")
          .replace("/page.tsx", "")
          .replace(/\[([^\]]+)\]/g, ":$1") || // Convert [id] to :id
        "/"
      routes.push(route)
    }
  }

  return routes
}

// Extract all href links from files
function extractLinks(dir: string): string[] {
  const links: string[] = []
  const files = readdirSync(dir)

  for (const file of files) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)

    if (stat.isDirectory() && !file.startsWith(".") && file !== "node_modules") {
      links.push(...extractLinks(fullPath))
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const content = readFileSync(fullPath, "utf-8")

      // Match href="..." or to="..." patterns
      const hrefMatches = content.matchAll(/(?:href|to)=["']([^"']+)["']/g)
      for (const match of hrefMatches) {
        const link = match[1]
        // Filter out external links, mailto, tel, anchors
        if (
          !link.startsWith("http") &&
          !link.startsWith("mailto:") &&
          !link.startsWith("tel:") &&
          !link.startsWith("#")
        ) {
          links.push(link.split("#")[0]) // Remove anchor part
        }
      }
    }
  }

  return [...new Set(links)] // Remove duplicates
}

// Validate routes
function validateRoutes(): ValidationResult {
  const result: ValidationResult = {
    success: true,
    errors: [],
    warnings: [],
    stats: {
      totalRoutes: 0,
      totalLinks: 0,
      deadLinks: 0,
      validLinks: 0,
    },
  }

  console.log("[v0] 🔍 Starting route validation...\n")

  // Find all routes
  const routes = findAllRoutes("./app")
  result.stats.totalRoutes = routes.length

  console.log(`[v0] ✅ Found ${routes.length} routes:`)
  routes.forEach((route) => console.log(`   - ${route}`))
  console.log("")

  // Extract all links
  const links = extractLinks("./app")
  const componentLinks = extractLinks("./components")
  const allLinks = [...links, ...componentLinks]
  result.stats.totalLinks = allLinks.length

  console.log(`[v0] 🔗 Found ${allLinks.length} internal links\n`)

  // Check for dead links
  const deadLinks: string[] = []
  const validLinks: string[] = []

  for (const link of allLinks) {
    // Normalize link (remove trailing slash)
    const normalizedLink = link.replace(/\/$/, "") || "/"

    // Check if link matches any route (considering dynamic routes)
    const isValid = routes.some((route) => {
      const routePattern = route.replace(/:[^/]+/g, "[^/]+")
      const regex = new RegExp(`^${routePattern}$`)
      return regex.test(normalizedLink)
    })

    if (isValid) {
      validLinks.push(link)
    } else {
      deadLinks.push(link)
      result.errors.push(`Dead link found: ${link}`)
    }
  }

  result.stats.validLinks = validLinks.length
  result.stats.deadLinks = deadLinks.length

  // Report results
  if (deadLinks.length > 0) {
    result.success = false
    console.log("[v0] ❌ DEAD LINKS DETECTED:\n")
    deadLinks.forEach((link) => console.log(`   ❌ ${link}`))
    console.log("")
  } else {
    console.log("[v0] ✅ No dead links found!\n")
  }

  // Check for common issues
  const commonRoutes = ["/about", "/contact", "/pricing", "/terms", "/privacy"]
  const missingCommonRoutes = commonRoutes.filter((route) => !routes.includes(route))

  if (missingCommonRoutes.length > 0) {
    console.log("[v0] ⚠️  MISSING COMMON ROUTES:\n")
    missingCommonRoutes.forEach((route) => {
      console.log(`   ⚠️  ${route}`)
      result.warnings.push(`Common route missing: ${route}`)
    })
    console.log("")
  }

  // Summary
  console.log("[v0] 📊 VALIDATION SUMMARY:")
  console.log(`   Total Routes: ${result.stats.totalRoutes}`)
  console.log(`   Total Links: ${result.stats.totalLinks}`)
  console.log(`   Valid Links: ${result.stats.validLinks}`)
  console.log(`   Dead Links: ${result.stats.deadLinks}`)
  console.log(`   Errors: ${result.errors.length}`)
  console.log(`   Warnings: ${result.warnings.length}`)
  console.log("")

  if (result.success) {
    console.log("[v0] ✅ ALL VALIDATIONS PASSED! No dead ends detected.\n")
  } else {
    console.log("[v0] ❌ VALIDATION FAILED! Please fix the issues above.\n")
  }

  return result
}

// Run validation
const result = validateRoutes()
process.exit(result.success ? 0 : 1)
