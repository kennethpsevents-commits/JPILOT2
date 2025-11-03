import { type NextRequest, NextResponse } from "next/server"
import { verifyOwnerPassword, createOwnerSession } from "@/lib/admin/auth"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    const isValid = await verifyOwnerPassword(password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    await createOwnerSession(ipAddress, userAgent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Owner Login Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
