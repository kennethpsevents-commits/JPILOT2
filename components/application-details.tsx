"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApplicationDetails() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Senior Frontend Developer</h2>
            <p className="text-xl text-muted-foreground mb-4">TechCorp Amsterdam</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Amsterdam, NL</Badge>
              <Badge variant="secondary">€70k - €85k</Badge>
              <Badge variant="secondary">Full-time</Badge>
              <Badge className="bg-purple-100 text-purple-700">Interview Stage</Badge>
            </div>
          </div>
          <Badge variant="secondary" className="text-2xl px-4 py-2">
            95% Match
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Applied Date</p>
            <p className="font-semibold">January 15, 2024</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
            <p className="font-semibold">January 22, 2024</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Days in Process</p>
            <p className="font-semibold">7 days</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">Update Status</Button>
          <Button variant="outline">Add Note</Button>
          <Button variant="outline">Set Reminder</Button>
        </div>
      </Card>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Application Timeline</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Technical Interview Scheduled</h4>
                  <p className="text-sm text-muted-foreground mb-2">January 22, 2024 at 10:30 AM</p>
                  <p className="text-sm">
                    Interview with Senior Engineering Manager. Focus on React, TypeScript, and system design.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">HR Screening Completed</h4>
                  <p className="text-sm text-muted-foreground mb-2">January 18, 2024</p>
                  <p className="text-sm">
                    Positive feedback on experience and cultural fit. Moving to technical round.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Application Submitted</h4>
                  <p className="text-sm text-muted-foreground mb-2">January 15, 2024</p>
                  <p className="text-sm">Application submitted with resume and cover letter.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Job Description</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>5+ years of experience with React and TypeScript</li>
                  <li>Strong understanding of modern frontend architecture</li>
                  <li>Experience with Next.js and server-side rendering</li>
                  <li>Excellent communication skills in English</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Benefits</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Competitive salary and stock options</li>
                  <li>Flexible remote work policy</li>
                  <li>€2000 annual learning budget</li>
                  <li>Health insurance and pension plan</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preparation" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Interview Preparation</h3>
            <div className="space-y-3">
              {[
                "Research company culture and recent projects",
                "Review React and TypeScript best practices",
                "Prepare system design examples",
                "Practice behavioral questions",
                "Prepare questions for the interviewer",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Your Notes</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">January 22, 2024</p>
                <p className="text-sm">
                  HR mentioned they're looking for someone to lead the frontend architecture redesign. Great opportunity
                  to showcase system design skills.
                </p>
              </div>
              <Button variant="outline">Add New Note</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
