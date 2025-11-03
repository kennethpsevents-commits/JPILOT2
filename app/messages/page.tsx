import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MessagesClient } from "@/components/messages/messages-client"

export const runtime = "edge"
export const revalidate = 0

export default async function MessagesPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <MessagesClient userId={user.id} />
}
