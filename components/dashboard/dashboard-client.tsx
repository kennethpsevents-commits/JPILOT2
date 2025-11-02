"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  Bookmark,
  Settings,
  CreditCard,
  Search,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"

interface DashboardClientProps {
  profile: any
  applications: any[]
  savedJobs: any[]
  stats: {
    total: number
    pending: number
    interviews: number
  }
  showSubscriptionSuccess: boolean
}

export function DashboardClient({
  profile,
  applications,
  savedJobs,
  stats,
  showSubscriptionSuccess,
}: DashboardClientProps) {
  const [showSuccess, setShowSuccess] = useState(showSubscriptionSuccess)

  useEffect(() => {
    if (showSubscriptionSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showSubscriptionSuccess])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "screening":
        return "bg-blue-500/10 text-blue-500"
      case "reviewed":
        return "bg-purple-500/10 text-purple-500"
      case "interview":
        return "bg-green-500/10 text-green-500"
      case "accepted":
        return "bg-green-500/10 text-green-500"
      case "rejected":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">JobPilot</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost">Browse Jobs</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        {showSuccess && (
          <Card className="mb-6 border-green-500/50 bg-green-500/5">
            <CardContent className="flex items-center gap-4 pt-6">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Subscription Updated Successfully!</h3>
                <p className="text-sm text-muted-foreground">
                  Your new plan is now active. Enjoy your premium features!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {profile?.full_name || "there"}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your job search</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/busy-customer-support-office-with-multiple-diverse.jpg"
                alt="Busy customer support office"
                className="w-full h-[300px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/professional-customer-support-team-collaborating-i.jpg"
                alt="Professional customer support team"
                className="w-full h-[300px] object-cover"
                style={{ filter: "contrast(0.35)" }}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All time applications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">Awaiting employer response</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.interviews}</div>
                <p className="text-xs text-muted-foreground">Interview stage</p>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subscription Status</CardTitle>
                  <CardDescription>Your current plan and benefits</CardDescription>
                </div>
                <Badge className="capitalize">{profile?.subscription_tier || "free"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Screening Credits</span>
                <span className="text-sm font-medium">{profile?.screening_credits || 0} available</span>
              </div>
              <div className="flex gap-2">
                <Link href="/pricing" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
                <Link href="/settings/subscription" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Subscription
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Applications</CardTitle>
                  <Link href="/applications">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">No applications yet</p>
                    <Link href="/jobs">
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <Link key={app.id} href={`/applications/${app.id}`} className="block">
                        <div className="flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{app.jobs.title}</p>
                            <p className="text-sm text-muted-foreground">{app.jobs.company}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(new Date(app.applied_at), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Saved Jobs</CardTitle>
                  <Link href="/saved">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {savedJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">No saved jobs yet</p>
                    <Link href="/jobs">
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" />
                        Find Jobs
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedJobs.map((saved) => (
                      <Link key={saved.id} href={`/jobs/${saved.job_id}`} className="block">
                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          {saved.jobs.company_logo && (
                            <img
                              src={saved.jobs.company_logo || "/placeholder.svg"}
                              alt={saved.jobs.company}
                              className="h-10 w-10 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{saved.jobs.title}</p>
                            <p className="text-sm text-muted-foreground">{saved.jobs.company}</p>
                            <p className="text-xs text-muted-foreground mt-1">{saved.jobs.location}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/jobs">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/applications">
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    My Applications
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
