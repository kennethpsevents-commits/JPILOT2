"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  MessageSquare,
  AlertTriangle,
  Users,
  TrendingUp,
  LogOut,
  Database,
  Activity,
  FileText,
} from "lucide-react"
import { ConversationMonitor } from "./conversation-monitor"
import { ErrorManager } from "./error-manager"
import { SystemHealth } from "./system-health"
import { UserManagement } from "./user-management"
import MarketingDashboardClient from "@/components/admin/marketing-dashboard-client"
import Link from "next/link"

export function OwnerDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = async () => {
    await fetch("/api/owner/logout", { method: "POST" })
    window.location.href = "/owner/login"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Owner Dashboard</h1>
              <p className="text-sm text-muted-foreground">Complete system control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/owner/sops">
                <FileText className="w-4 h-4 mr-2" />
                SOPs
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/owner/subscription-funnel">
                <TrendingUp className="w-4 h-4 mr-2" />
                Funnel
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="conversations" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chats</span>
            </TabsTrigger>
            <TabsTrigger value="errors" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Errors</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SystemHealth />
          </TabsContent>

          <TabsContent value="conversations">
            <ConversationMonitor />
          </TabsContent>

          <TabsContent value="errors">
            <ErrorManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingDashboardClient />
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Advanced system settings and database management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">System configuration panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
