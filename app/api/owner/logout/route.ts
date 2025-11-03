import { NextResponse } from "next/server"
import { destroyOwnerSession } from "@/lib/admin/auth"

export async function POST() {
  try {
    await destroyOwnerSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Owner Logout Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
