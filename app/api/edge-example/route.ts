import { NextResponse } from "next/server"
import { z } from "zod"

// Edge-compatible: no fs, no child_process, no sync node APIs
export const runtime = "edge"

const QuerySchema = z.object({
  q: z.string().min(1),
})

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const parsed = QuerySchema.safeParse(Object.fromEntries(url.searchParams))

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 })
    }

    // Example: safe fetch to external API (Edge fetch allowed)
    const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(parsed.data.q)}`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error("External API error")
    }

    const data = await response.json()
    return NextResponse.json({ data })
  } catch (err) {
    console.error("[v0] Edge API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
