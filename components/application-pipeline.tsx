"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Application {
  id: string
  jobTitle: string
  company: string
  location: string
  salary: string
  appliedDate: string
  status: "applied" | "screening" | "interview" | "offer" | "rejected"
  nextStep?: string
  matchScore: number
}

const applications: Application[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Amsterdam",
    location: "Amsterdam, NL",
    salary: "€70k - €85k",
    appliedDate: "2024-01-15",
    status: "interview",
    nextStep: "Technical interview on Jan 25",
    matchScore: 95,
  },
  {
    id: "2",
    jobTitle: "React Developer",
    company: "InnovateCo Berlin",
    location: "Berlin, DE",
    salary: "€65k - €80k",
    appliedDate: "2024-01-18",
    status: "screening",
    nextStep: "HR call scheduled",
    matchScore: 88,
  },
  {
    id: "3",
    jobTitle: "Full Stack Engineer",
    company: "DataFlow Paris",
    location: "Paris, FR",
    salary: "€60k - €75k",
    appliedDate: "2024-01-20",
    status: "applied",
    matchScore: 92,
  },
  {
    id: "4",
    jobTitle: "Frontend Lead",
    company: "CloudScale Rotterdam",
    location: "Rotterdam, NL",
    salary: "€80k - €95k",
    appliedDate: "2024-01-10",
    status: "offer",
    nextStep: "Offer expires Jan 30",
    matchScore: 90,
  },
  {
    id: "5",
    jobTitle: "Software Engineer",
    company: "StartupHub",
    location: "Remote",
    salary: "€55k - €70k",
    appliedDate: "2024-01-05",
    status: "rejected",
    matchScore: 75,
  },
]

const statusColumns = [
  { id: "applied", label: "Applied", color: "bg-blue-100 text-blue-700" },
  { id: "screening", label: "Screening", color: "bg-yellow-100 text-yellow-700" },
  { id: "interview", label: "Interview", color: "bg-purple-100 text-purple-700" },
  { id: "offer", label: "Offer", color: "bg-green-100 text-green-700" },
  { id: "rejected", label: "Rejected", color: "bg-red-100 text-red-700" },
]

export function ApplicationPipeline() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Application Pipeline</h2>
          <p className="text-muted-foreground">Track your job applications through every stage</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Add Application</Button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {statusColumns.map((column) => {
          const columnApps = applications.filter((app) => app.status === column.id)
          return (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{column.label}</h3>
                <Badge variant="secondary" className={column.color}>
                  {columnApps.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {columnApps.map((app) => (
                  <Card key={app.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-sm mb-1">{app.jobTitle}</h4>
                        <p className="text-xs text-muted-foreground">{app.company}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{app.location}</span>
                        <Badge variant="secondary" className="text-xs">
                          {app.matchScore}%
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground">{app.salary}</div>

                      {app.nextStep && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs font-semibold text-accent">{app.nextStep}</p>
                        </div>
                      )}

                      <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
