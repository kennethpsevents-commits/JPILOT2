"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle, XCircle, RefreshCw, Download } from "lucide-react"

interface FunnelMetrics {
  totalSubscribers: number
  monthlyTarget: number
  currentMonthSubscribers: number
  progressPercentage: number
  daysRemaining: number
  planDistribution: {
    basic: number
    pro: number
    enterprise: number
  }
  abandonedCheckouts: number
  failedPayments: number
  churnRate: number
  averageRevenuePerUser: number
}

export default function SubscriptionFunnelClient() {
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/subscription/monitor")
      const data = await response.json()

      if (data.success) {
        setMetrics(data.data)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error("[v0] Error fetching metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  const exportData = () => {
    if (!metrics) return

    const csv = `Metric,Value
Total Subscribers,${metrics.totalSubscribers}
Monthly Target,${metrics.monthlyTarget}
Current Month Subscribers,${metrics.currentMonthSubscribers}
Progress Percentage,${metrics.progressPercentage.toFixed(2)}%
Days Remaining,${metrics.daysRemaining}
Basic Plan,${metrics.planDistribution.basic}
Pro Plan,${metrics.planDistribution.pro}
Enterprise Plan,${metrics.planDistribution.enterprise}
Abandoned Checkouts,${metrics.abandonedCheckouts}
Failed Payments,${metrics.failedPayments}
Churn Rate,${metrics.churnRate.toFixed(2)}%
Average Revenue Per User,$${metrics.averageRevenuePerUser.toFixed(2)}`

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscription-funnel-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading funnel metrics...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <p className="text-destructive">Failed to load metrics. Please try again.</p>
          <Button onClick={fetchMetrics} className="mt-4">
            Retry
          </Button>
        </Card>
      </div>
    )
  }

  const goalProgress = (metrics.totalSubscribers / 500) * 100
  const onTrack = metrics.currentMonthSubscribers >= metrics.monthlyTarget

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Funnel Monitor</h1>
          <p className="text-muted-foreground">Real-time tracking toward 500 subscribers in 6 months</p>
          <p className="text-sm text-muted-foreground mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchMetrics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Goal Progress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">6-Month Goal Progress</h2>
            <span className="text-2xl font-bold text-primary">{metrics.totalSubscribers} / 500</span>
          </div>
          <Progress value={goalProgress} className="h-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{metrics.daysRemaining} days remaining</span>
            <span className="font-medium">{goalProgress.toFixed(1)}% complete</span>
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Month */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">{metrics.currentMonthSubscribers}</p>
              <p className="text-xs text-muted-foreground mt-1">Target: {metrics.monthlyTarget}</p>
            </div>
            {onTrack ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            )}
          </div>
          <div className="mt-4">
            <Progress value={(metrics.currentMonthSubscribers / metrics.monthlyTarget) * 100} className="h-2" />
          </div>
        </Card>

        {/* ARPU */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Revenue/User</p>
              <p className="text-2xl font-bold">${metrics.averageRevenuePerUser.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        {/* Churn Rate */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Churn Rate</p>
              <p className="text-2xl font-bold">{metrics.churnRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        {/* Failed Payments */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed Payments</p>
              <p className="text-2xl font-bold">{metrics.failedPayments}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Plan Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Basic</p>
            <p className="text-3xl font-bold text-blue-500">{metrics.planDistribution.basic}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((metrics.planDistribution.basic / metrics.totalSubscribers) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Pro</p>
            <p className="text-3xl font-bold text-green-500">{metrics.planDistribution.pro}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((metrics.planDistribution.pro / metrics.totalSubscribers) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Enterprise</p>
            <p className="text-3xl font-bold text-purple-500">{metrics.planDistribution.enterprise}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((metrics.planDistribution.enterprise / metrics.totalSubscribers) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Abandoned Checkouts Alert */}
      {metrics.abandonedCheckouts > 0 && (
        <Card className="p-6 border-yellow-500">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="font-semibold">Abandoned Checkouts Detected</h3>
              <p className="text-sm text-muted-foreground">
                {metrics.abandonedCheckouts} users abandoned checkout in the last 24 hours. Recovery emails have been
                triggered.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
