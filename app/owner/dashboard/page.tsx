import { redirect } from "next/navigation"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { OwnerDashboardClient } from "@/components/owner/owner-dashboard-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Owner Dashboard | JobPilot",
  description: "Complete system management and monitoring",
  robots: "noindex, nofollow",
}

export default async function OwnerDashboardPage() {
  const isAuthenticated = await verifyOwnerSession()

  if (!isAuthenticated) {
    redirect("/owner/login")
  }

  return <OwnerDashboardClient />
}
