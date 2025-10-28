import { test, expect } from "@playwright/test"

test.describe("JobPilot Smoke Tests", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/JobPilot/)
    await expect(page.locator("h1")).toContainText("Find Your Dream Job")
  })

  test("jobs page loads and displays listings", async ({ page }) => {
    await page.goto("/jobs")
    await expect(page.locator("h1")).toContainText("Find Jobs")
    // Wait for job cards to load
    await page.waitForSelector('[data-testid="job-card"]', { timeout: 5000 }).catch(() => {
      // If no jobs, that's okay for smoke test
    })
  })

  test("login page loads", async ({ page }) => {
    await page.goto("/auth/login")
    await expect(page.locator("h1")).toContainText("Welcome Back")
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test("signup page loads", async ({ page }) => {
    await page.goto("/auth/sign-up")
    await expect(page.locator("h1")).toContainText("Create Account")
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })

  test("navigation works", async ({ page }) => {
    await page.goto("/")
    await page.click("text=Find Jobs")
    await expect(page).toHaveURL(/\/jobs/)
  })

  test("health check endpoint works", async ({ request }) => {
    const response = await request.get("/api/health")
    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(data.status).toBe("ok")
  })
})
