import crypto from "crypto"

const OWNER_PASSWORD = "Wearejobpilot_Psevents_in"

function createSessionToken(): string {
  const timestamp = Date.now().toString()
  const random = crypto.randomBytes(32).toString("hex")
  const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "fallback-secret"
  return crypto.createHash("sha256").update(`${OWNER_PASSWORD}-${timestamp}-${random}-${secret}`).digest("hex")
}

export async function verifyOwnerPassword(password: string): Promise<boolean> {
  console.log("[v0] Verifying password...")
  console.log("[v0] Expected password:", OWNER_PASSWORD)
  console.log("[v0] Received password:", password)
  console.log("[v0] Passwords match:", password === OWNER_PASSWORD)
  return password === OWNER_PASSWORD
}

export async function createOwnerSession(): Promise<string> {
  console.log("[v0] Creating owner session token...")
  const sessionToken = createSessionToken()
  console.log("[v0] Session token created successfully")
  return sessionToken
}

export async function verifyOwnerSession(): Promise<boolean> {
  try {
    // Import cookies dynamically to avoid edge runtime issues
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const token = cookieStore.get("owner_session")?.value

    console.log("[v0] Verifying owner session...")
    console.log("[v0] Token found in cookies:", token ? "yes" : "no")

    if (!token) {
      console.log("[v0] No token provided")
      return false
    }

    // Simple validation: token should be a 64-character hex string
    const isValid = /^[a-f0-9]{64}$/.test(token)
    console.log("[v0] Token format valid:", isValid)
    return isValid
  } catch (error) {
    console.error("[v0] Error verifying owner session:", error)
    return false
  }
}

export async function destroyOwnerSession(): Promise<void> {
  console.log("[v0] Destroying owner session (client-side token will be removed)")
  // Token is stored client-side in localStorage, so this is just a placeholder
  // The actual token removal happens on the client
}
