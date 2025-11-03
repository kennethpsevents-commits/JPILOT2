import { NextResponse } from "next/server"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    // Get all users with their stats
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        applications(count),
        chat_conversations(count)
      `,
      )
      .order("created_at", { ascending: false })

    if (error) throw error

    const users = profiles?.map((profile: any) => ({
      ...profile,
      application_count: profile.applications?.[0]?.count || 0,
      conversation_count: profile.chat_conversations?.[0]?.count || 0,
    }))

    return NextResponse.json({ users })
  } catch (error) {
    console.error("[Owner Users Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
