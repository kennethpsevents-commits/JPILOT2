import { NextResponse } from "next/server"
import { logger } from "@/lib/monitoring/logger"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    const ownerPassword = process.env.OWNER_PASSWORD
    if (!ownerPassword) {
      logger.error("Owner login configuration missing", { key: "OWNER_PASSWORD" })
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const isValid = password === ownerPassword
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const timestamp = Date.now().toString()
    const randomBytes = crypto.getRandomValues(new Uint8Array(32))
    const randomHex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    const signingSecret = process.env.OWNER_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ownerPassword
    const dataToHash = `${ownerPassword}-${timestamp}-${randomHex}-${signingSecret}`

    const encoder = new TextEncoder()
    const data = encoder.encode(dataToHash)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const token = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    })

    response.headers.set(
      "Set-Cookie",
      `__Host-owner_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; Priority=High`,
    )

    return response
  } catch (error) {
    logger.error("Owner login failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    })
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
