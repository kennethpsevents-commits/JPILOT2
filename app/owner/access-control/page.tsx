import { redirect } from "next/navigation"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { AccessControlClient } from "@/components/owner/access-control-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Access Control | Owner Dashboard",
  description: "Manage user access and subscription tiers",
  robots: "noindex, nofollow",
}

export default async function AccessControlPage() {
  const isAuthenticated = await verifyOwnerSession()

  if (!isAuthenticated) {
    redirect("/owner/login")
  }

  return <AccessControlClient />
}
