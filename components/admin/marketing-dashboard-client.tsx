"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Mail, Users, BarChart3, Zap, Target, Brain, Activity } from "lucide-react"

interface GrowthTrajectory {
  currentSubscribers: number
  weeklyGrowth: number
  projectedTotal: number
  onTrack: boolean
  daysRemaining: number
  requiredWeeklyGrowth: number
}

export default function MarketingDashboardClient() {
  const [trajectory, setTrajectory] = useState<GrowthTrajectory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGrowthData()
  }, [])

  const fetchGrowthData = async () => {
    try {
      const response = await fetch("/api/marketing/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyze_growth" }),
      })
      const result = await response.json()
      if (result.success) {
        setTrajectory(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch growth data:", error)
    } finally {
      setLoading(false)
    }
  }

  const recordMetrics = async () => {
    try {
      await fetch("/api/marketing/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "record_metrics" }),
      })
      fetchGrowthData()
    } catch (error) {
      console.error("Failed to record metrics:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Marketing Command Center</h1>
          <p className="text-muted-foreground mt-2">24/7 Self-Marketing AI • Target: 500 Subscribers in 6 Months</p>
        </div>
        <Button onClick={recordMetrics} className="gap-2">
          <Activity className="h-4 w-4" />
          Record Metrics
        </Button>
      </div>

      {/* Growth Overview */}
      {trajectory && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold">{trajectory.currentSubscribers}</p>
                <p className="text-xs text-muted-foreground">of 500 target</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Growth</p>
                <p className="text-2xl font-bold">{trajectory.weeklyGrowth}</p>
                <p className="text-xs text-muted-foreground">Target: {trajectory.requiredWeeklyGrowth}/week</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projected Total</p>
                <p className="text-2xl font-bold">{trajectory.projectedTotal}</p>
                <p className={`text-xs ${trajectory.onTrack ? "text-green-600" : "text-red-600"}`}>
                  {trajectory.onTrack ? "✓ On Track" : "⚠ Behind Target"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="text-2xl font-bold">{trajectory.daysRemaining}</p>
                <p className="text-xs text-muted-foreground">to reach goal</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai">AI Agent</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Marketing Overview</h3>
            <p className="text-muted-foreground">
              Your self-marketing AI is running 24/7, optimizing campaigns and growing your subscriber base.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Marketing
            </h3>
            <p className="text-muted-foreground">Manage email campaigns, contacts, and automation workflows.</p>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Social Media Automation
            </h3>
            <p className="text-muted-foreground">
              Connect and manage Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, and Reddit accounts.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Marketing Automation</h3>
            <p className="text-muted-foreground">Create workflows, A/B tests, and automated campaigns.</p>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics & Insights
            </h3>
            <p className="text-muted-foreground">
              Track performance metrics, conversion rates, and ROI across all channels.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Marketing Agent
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">System Status</h4>
                <p className="text-sm text-muted-foreground">
                  The AI agent is actively monitoring growth, testing hypotheses, and optimizing campaigns in real-time.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Recent Actions</h4>
                <p className="text-sm text-muted-foreground">
                  View AI-generated content, optimization decisions, and performance insights.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
