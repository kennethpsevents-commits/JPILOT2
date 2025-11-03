import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import crypto from "crypto"

const OWNER_PASSWORD = "Wearejobpilot_Psevents_in"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export async function verifyOwnerPassword(password: string): Promise<boolean> {
  return password === OWNER_PASSWORD
}

export async function createOwnerSession(ipAddress?: string, userAgent?: string): Promise<string> {
  const supabase = await createClient()
  const sessionId = crypto.randomBytes(32).toString("hex")
  const passwordHash = hashPassword(OWNER_PASSWORD)
  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  await supabase.from("admin_access").insert({
    session_id: sessionId,
    password_hash: passwordHash,
    ip_address: ipAddress,
    user_agent: userAgent,
    expires_at: expiresAt.toISOString(),
  })

  const cookieStore = await cookies()
  cookieStore.set("owner_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return sessionId
}

export async function verifyOwnerSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("owner_session")?.value

  if (!sessionId) return false

  const supabase = await createClient()
  const { data: session } = await supabase.from("admin_access").select("*").eq("session_id", sessionId).single()

  if (!session) return false

  const now = new Date()
  const expiresAt = new Date(session.expires_at)

  if (now > expiresAt) {
    await supabase.from("admin_access").delete().eq("session_id", sessionId)
    return false
  }

  // Update last access
  await supabase.from("admin_access").update({ last_access: now.toISOString() }).eq("session_id", sessionId)

  return true
}

export async function destroyOwnerSession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("owner_session")?.value

  if (sessionId) {
    const supabase = await createClient()
    await supabase.from("admin_access").delete().eq("session_id", sessionId)
  }

  cookieStore.delete("owner_session")
}
