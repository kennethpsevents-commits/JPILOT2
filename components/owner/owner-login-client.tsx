"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shield, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function OwnerLoginClient() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Client: Submitting login form")
    console.log("[v0] Client: Password length:", password.length)

    try {
      console.log("[v0] Client: Sending request to /api/owner/login")
      const response = await fetch("/api/owner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include", // Include cookies in request
      })

      console.log("[v0] Client: Response status:", response.status)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("[v0] Client: Response is not JSON, content-type:", contentType)
        const text = await response.text()
        console.error("[v0] Client: Response text:", text.substring(0, 200))
        throw new Error("Server returned an invalid response. Please try again.")
      }

      const data = await response.json()
      console.log("[v0] Client: Response data:", data)

      if (response.ok) {
        console.log("[v0] Client: Login successful, redirecting...")
        router.push("/owner/dashboard")
        router.refresh()
      } else {
        console.log("[v0] Client: Login failed:", data.error)
        setError(data.error || "Invalid password")
      }
    } catch (err) {
      console.error("[v0] Client: Error during login:", err)
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Owner Access</CardTitle>
          <CardDescription>Enter the owner password to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter owner password"
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">{""}</p>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
