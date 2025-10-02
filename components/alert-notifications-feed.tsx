"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "new_match" | "alert_triggered" | "application_update"
  title: string
  message: string
  timestamp: string
  priority: "high" | "medium" | "low"
  read: boolean
  jobTitle?: string
  company?: string
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "new_match",
    title: "3 New High-Match Jobs",
    message: "Senior Frontend Developer positions matching your alert criteria",
    timestamp: "5 minutes ago",
    priority: "high",
    read: false,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Amsterdam",
  },
  {
    id: "2",
    type: "alert_triggered",
    title: "Alert: Product Manager Roles",
    message: "Your daily digest is ready with 5 new opportunities",
    timestamp: "2 hours ago",
    priority: "medium",
    read: false,
  },
  {
    id: "3",
    type: "new_match",
    title: "Perfect Match Found",
    message: "95% match for React Developer at InnovateCo",
    timestamp: "1 day ago",
    priority: "high",
    read: true,
    jobTitle: "React Developer",
    company: "InnovateCo Berlin",
  },
  {
    id: "4",
    type: "alert_triggered",
    title: "Weekly Roundup Ready",
    message: "8 new remote positions matching your preferences",
    timestamp: "3 days ago",
    priority: "low",
    read: true,
  },
]

export function AlertNotificationsFeed() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-6 transition-all ${notification.read ? "opacity-60" : "border-l-4 border-l-primary"}`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notification.priority === "high"
                    ? "bg-red-100"
                    : notification.priority === "medium"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                }`}
              >
                {notification.type === "new_match" ? (
                  <svg
                    className={`w-6 h-6 ${notification.priority === "high" ? "text-red-600" : "text-primary"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg
                    className={`w-6 h-6 ${notification.priority === "high" ? "text-red-600" : "text-primary"}`}
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
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold">{notification.title}</h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{notification.timestamp}</span>
                </div>
                <p className="text-muted-foreground mb-3">{notification.message}</p>

                {notification.jobTitle && notification.company && (
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{notification.jobTitle}</Badge>
                    <span className="text-sm text-muted-foreground">at {notification.company}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {notification.type === "new_match" && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Job
                    </Button>
                  )}
                  {notification.type === "alert_triggered" && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Matches
                    </Button>
                  )}
                  {!notification.read && (
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
