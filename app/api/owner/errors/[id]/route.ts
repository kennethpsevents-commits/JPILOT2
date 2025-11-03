import { type NextRequest, NextResponse } from "next/server"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status, resolution_notes } = await request.json()
    const supabase = await createClient()

    const updateData: any = { status }

    if (status === "resolved") {
      updateData.resolved_at = new Date().toISOString()
      updateData.resolved_by = "owner"
      if (resolution_notes) {
        updateData.resolution_notes = resolution_notes
      }
    }

    const { error } = await supabase.from("error_logs").update(updateData).eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Owner Error Update Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
