function getOwnerPassword(): string {
  const password = process.env.OWNER_PASSWORD
  if (!password) {
    throw new Error("OWNER_PASSWORD environment variable is not set")
  }
  return password
}

async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString()
  const randomBytes = crypto.getRandomValues(new Uint8Array(32))
  const random = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "fallback-secret"

  const encoder = new TextEncoder()
  const data = encoder.encode(`${timestamp}-${random}-${secret}`)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyOwnerPassword(password: string): Promise<boolean> {
  try {
    const ownerPassword = getOwnerPassword()
    return password === ownerPassword
  } catch {
    return false
  }
}

export async function createOwnerSession(): Promise<string> {
  const sessionToken = await createSessionToken()
  return sessionToken
}

export async function verifyOwnerSession(): Promise<boolean> {
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const token = cookieStore.get("owner_session")?.value

    if (!token) {
      return false
    }

    const isValid = /^[a-f0-9]{64}$/.test(token)
    return isValid
  } catch {
    return false
  }
}

export async function destroyOwnerSession(): Promise<void> {
  // Token removal handled by the logout route
}
