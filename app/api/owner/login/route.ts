export async function POST(req: Request) {
  try {
    console.log("[v0] ===== Owner login attempt started =====")

    const body = await req.json()
    const { password } = body

    console.log("[v0] Password received:", password ? "yes" : "no")
    console.log("[v0] Password length:", password?.length)

    if (!password) {
      console.log("[v0] ERROR: No password provided")
      return Response.json({ error: "Password is required" }, { status: 400 })
    }

    // Direct password check
    const OWNER_PASSWORD = "Wearejobpilot_Psevents_in"
    const isValid = password === OWNER_PASSWORD

    console.log("[v0] Password match:", isValid)

    if (!isValid) {
      console.log("[v0] ERROR: Invalid password")
      return Response.json({ error: "Invalid password" }, { status: 401 })
    }

    const timestamp = Date.now().toString()
    const randomBytes = crypto.getRandomValues(new Uint8Array(32))
    const randomHex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    const secret = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "fallback-secret"
    const dataToHash = `${OWNER_PASSWORD}-${timestamp}-${randomHex}-${secret}`

    // Use Web Crypto API for hashing
    const encoder = new TextEncoder()
    const data = encoder.encode(dataToHash)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const token = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    console.log("[v0] Session token generated")

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

    console.log("[v0] ===== Login successful, cookie set =====")

    return response
  } catch (error) {
    console.error("[v0] ===== Owner Login Error =====", error)

    return Response.json(
      {
        error: "Login failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
