"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface Alert {
  id: string
  name: string
  criteria: string
  priority: "high" | "medium" | "low"
  frequency: string
  matches: number
  active: boolean
  created: string
}

const alerts: Alert[] = [
  {
    id: "1",
    name: "Senior Frontend Jobs in Amsterdam",
    criteria: "Senior Frontend Developer • Amsterdam, NL • Remote OK",
    priority: "high",
    frequency: "Instant",
    matches: 23,
    active: true,
    created: "2 weeks ago",
  },
  {
    id: "2",
    name: "Product Manager Roles",
    criteria: "Product Manager • Berlin, DE • €70k+",
    priority: "medium",
    frequency: "Daily",
    matches: 15,
    active: true,
    created: "1 month ago",
  },
  {
    id: "3",
    name: "Remote React Positions",
    criteria: "React Developer • Remote • Full-time",
    priority: "low",
    frequency: "Weekly",
    matches: 8,
    active: false,
    created: "3 weeks ago",
  },
]

const priorityConfig = {
  high: { color: "bg-red-100 text-red-700", label: "HIGH" },
  medium: { color: "bg-yellow-100 text-yellow-700", label: "MEDIUM" },
  low: { color: "bg-blue-100 text-blue-700", label: "LOW" },
}

export function ActiveAlertsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Active Alerts</h2>
          <p className="text-muted-foreground">Manage your job monitoring preferences</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Create New Alert</Button>
      </div>

      <div className="grid gap-6">
        {alerts.map((alert) => {
          const config = priorityConfig[alert.priority]
          return (
            <Card key={alert.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{alert.name}</h3>
                    <Badge className={config.color}>{config.label} PRIORITY</Badge>
                    {alert.matches > 0 && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent">
                        {alert.matches} New Matches
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert.criteria}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span className="text-muted-foreground">{alert.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-muted-foreground">Created {alert.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={alert.active} />
                    <span className="text-sm text-muted-foreground">{alert.active ? "Active" : "Paused"}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Matches
                </Button>
                <Button size="sm" variant="outline">
                  Edit Alert
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                  Delete
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
