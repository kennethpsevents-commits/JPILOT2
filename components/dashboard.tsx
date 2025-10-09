"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Send, Sparkles, TrendingUp, Bell, Briefcase, Clock } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function Dashboard() {
  const { data: statsData, error: statsError } = useSWR("/api/dashboard/stats", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  const { data: activityData } = useSWR("/api/dashboard/recent-activity", fetcher, {
    refreshInterval: 60000, // Refresh every minute
  })

  const { data: alertsData } = useSWR("/api/dashboard/job-alerts", fetcher)

  const stats = statsData?.stats || {
    jobsFound: 0,
    applicationsSent: 0,
    weekApplications: 0,
    aiEdits: 0,
    responseRate: 0,
  }

  const STATS = [
    {
      icon: Target,
      label: "Jobs Saved",
      value: stats.jobsFound.toString(),
      change: "Track your favorites",
      color: "text-primary",
    },
    {
      icon: Send,
      label: "Applications Sent",
      value: stats.applicationsSent.toString(),
      change: `+${stats.weekApplications} this week`,
      color: "text-accent",
    },
    {
      icon: Sparkles,
      label: "AI Conversations",
      value: stats.aiEdits.toString(),
      change: "Get personalized help",
      color: "text-chart-3",
    },
    {
      icon: TrendingUp,
      label: "Response Rate",
      value: `${stats.responseRate}%`,
      change: "Track your success",
      color: "text-chart-4",
    },
  ]

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="p-6 hover:border-primary/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-card-foreground/5 flex items-center justify-center ${stat.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Recent Applications</h3>
            </div>
            <div className="space-y-3">
              {activityData?.applications?.slice(0, 5).map((app: any) => (
                <div
                  key={app.id}
                  className="flex items-start justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{app.jobs?.title || "Job Title"}</p>
                    <p className="text-xs text-muted-foreground">{app.jobs?.company || "Company"}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      app.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-600"
                        : app.status === "interview"
                          ? "bg-blue-500/10 text-blue-600"
                          : app.status === "offer"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-gray-500/10 text-gray-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No applications yet. Start applying to jobs!
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Job Alerts</h3>
            </div>
            <div className="space-y-3">
              {alertsData?.alerts?.slice(0, 5).map((alert: any) => (
                <div key={alert.id} className="flex items-start justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.keywords}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.location} • {alert.frequency}
                    </p>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              )) || (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No job alerts set. Create one to get notified!
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start bg-transparent" asChild>
              <a href="/jobs">
                <Target className="h-4 w-4 mr-2" />
                Search Jobs
              </a>
            </Button>
            <Button variant="outline" className="justify-start bg-transparent" asChild>
              <a href="/cv-builder">
                <Sparkles className="h-4 w-4 mr-2" />
                Build CV
              </a>
            </Button>
            <Button variant="outline" className="justify-start bg-transparent" asChild>
              <a href="/profile">
                <TrendingUp className="h-4 w-4 mr-2" />
                Update Profile
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
