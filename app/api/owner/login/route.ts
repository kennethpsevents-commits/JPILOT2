export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { password } = body

    if (!password) {
      return Response.json({ error: "Password is required" }, { status: 400 })
    }

    const OWNER_PASSWORD = process.env.OWNER_PASSWORD
    if (!OWNER_PASSWORD) {
      console.error("OWNER_PASSWORD environment variable is not set")
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    const isValid = password === OWNER_PASSWORD

    if (!isValid) {
      return Response.json({ error: "Invalid password" }, { status: 401 })
    }

    const timestamp = Date.now().toString()
    const randomBytes = crypto.getRandomValues(new Uint8Array(32))
    const randomHex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "fallback-secret"
    const dataToHash = `${timestamp}-${randomHex}-${secret}`

    // Use Web Crypto API for hashing
    const encoder = new TextEncoder()
    const data = encoder.encode(dataToHash)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const token = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    const response = Response.json({
      success: true,
      message: "Login successful",
      token: token,
    })

    // Set secure cookie
    response.headers.set(
      "Set-Cookie",
      `owner_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`,
    )

    return response
  } catch (error) {
    console.error("Owner login error:", error instanceof Error ? error.message : "Unknown error")

    return Response.json(
      {
        error: "Login failed",
      },
      { status: 500 },
    )
  }
}
