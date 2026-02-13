async function createSessionToken(): Promise<string> {
  const ownerPassword = process.env.OWNER_PASSWORD

  if (!ownerPassword) {
    throw new Error("OWNER_PASSWORD is not configured")
  }

  const timestamp = Date.now().toString()
  const randomBytes = crypto.getRandomValues(new Uint8Array(32))
  const random = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  const secret = process.env.OWNER_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ownerPassword

  const encoder = new TextEncoder()
  const data = encoder.encode(`${ownerPassword}-${timestamp}-${random}-${secret}`)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyOwnerPassword(password: string): Promise<boolean> {
  const ownerPassword = process.env.OWNER_PASSWORD
  if (!ownerPassword) {
    return false
  }

  return password === ownerPassword
}

export async function createOwnerSession(): Promise<string> {
  return createSessionToken()
}

export async function verifyOwnerSession(): Promise<boolean> {
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const token = cookieStore.get("__Host-owner_session")?.value

    if (!token) {
      return false
    }

    return /^[a-f0-9]{64}$/.test(token)
  } catch {
    return false
  }
}

export async function destroyOwnerSession(): Promise<void> {
  return
}
