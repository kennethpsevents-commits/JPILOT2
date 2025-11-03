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

    // Get all conversations with message counts and user info
    const { data: conversations, error } = await supabase
      .from("chat_conversations")
      .select(
        `
        *,
        profiles!chat_conversations_user_id_fkey(email),
        chat_messages(count)
      `,
      )
      .order("created_at", { ascending: false })

    if (error) throw error

    const formattedConversations = conversations?.map((conv: any) => ({
      ...conv,
      user_email: conv.profiles?.email,
      message_count: conv.chat_messages?.[0]?.count || 0,
    }))

    return NextResponse.json({ conversations: formattedConversations })
  } catch (error) {
    console.error("[Owner Conversations Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
