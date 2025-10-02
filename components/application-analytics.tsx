"use client"

import { Card } from "@/components/ui/card"

export function ApplicationAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Application Analytics</h2>
        <p className="text-muted-foreground">Track your job search performance and insights</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">23</div>
          <p className="text-sm text-muted-foreground">Total Applications</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">8</div>
          <p className="text-sm text-muted-foreground">Active Interviews</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">35%</div>
          <p className="text-sm text-muted-foreground">Response Rate</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">12</div>
          <p className="text-sm text-muted-foreground">Avg. Days to Response</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Application Status Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Applied</span>
                <span className="text-sm font-semibold">8 (35%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "35%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Screening</span>
                <span className="text-sm font-semibold">5 (22%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: "22%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Interview</span>
                <span className="text-sm font-semibold">6 (26%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: "26%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Offer</span>
                <span className="text-sm font-semibold">2 (9%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "9%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Rejected</span>
                <span className="text-sm font-semibold">2 (9%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: "9%" }} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Top Companies</h3>
          <div className="space-y-4">
            {[
              { name: "TechCorp Amsterdam", applications: 3, status: "2 Active" },
              { name: "InnovateCo Berlin", applications: 2, status: "1 Interview" },
              { name: "DataFlow Paris", applications: 2, status: "1 Offer" },
              { name: "CloudScale Rotterdam", applications: 1, status: "1 Active" },
            ].map((company) => (
              <div key={company.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{company.applications}</p>
                  <p className="text-xs text-muted-foreground">apps</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
        <h3 className="text-xl font-bold mb-3">AI Insights</h3>
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Your application success rate is 35%, which is above the industry average of 25%. Your strongest
            applications are for Senior Frontend roles in Amsterdam and Berlin.
          </p>
          <p className="text-muted-foreground">
            Tip: Companies typically respond within 5-7 days. Consider following up on applications older than 10 days
            to show continued interest.
          </p>
        </div>
      </Card>
    </div>
  )
}
