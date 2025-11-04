const OWNER_PASSWORD = "Wearejobpilot_Psevents_in"

async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString()
  const randomBytes = crypto.getRandomValues(new Uint8Array(32))
  const random = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "fallback-secret"

  const encoder = new TextEncoder()
  const data = encoder.encode(`${OWNER_PASSWORD}-${timestamp}-${random}-${secret}`)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
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
  const sessionToken = await createSessionToken()
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
