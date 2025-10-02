"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Recommendation {
  id: string
  type: "job" | "skill" | "course" | "network"
  title: string
  description: string
  match: number
  action: string
  tags: string[]
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    type: "job",
    title: "Senior Frontend Developer at TechCorp",
    description:
      "Perfect match based on your React and TypeScript skills. Company culture aligns with your preferences.",
    match: 95,
    action: "View Job",
    tags: ["Remote", "€70k-€85k", "Amsterdam"],
  },
  {
    id: "2",
    type: "skill",
    title: "Master System Design Patterns",
    description: "Critical skill gap identified. This will unlock 23 senior positions in your target companies.",
    match: 88,
    action: "Start Learning",
    tags: ["High Priority", "3 months", "Career Boost"],
  },
  {
    id: "3",
    type: "course",
    title: "Advanced TypeScript Course",
    description: "Recommended by AI based on your current skill level and career goals. 4.8★ rating.",
    match: 92,
    action: "Enroll Now",
    tags: ["Online", "Self-paced", "Certificate"],
  },
  {
    id: "4",
    type: "network",
    title: "Connect with Sarah Johnson",
    description: "Senior Engineering Manager at your target company. 87% connection success rate predicted.",
    match: 85,
    action: "Send Message",
    tags: ["LinkedIn", "Mentor", "Same Background"],
  },
]

const typeConfig = {
  job: { icon: "💼", color: "bg-primary/10 text-primary" },
  skill: { icon: "⚡", color: "bg-accent/10 text-accent" },
  course: { icon: "📚", color: "bg-blue-500/10 text-blue-600" },
  network: { icon: "🤝", color: "bg-purple-500/10 text-purple-600" },
}

export function AICareerRecommendations() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Career Recommendations</h2>
        <p className="text-muted-foreground">Personalized suggestions to accelerate your career growth</p>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec) => {
          const config = typeConfig[rec.type]
          return (
            <Card key={rec.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center text-2xl flex-shrink-0`}
                >
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold">{rec.title}</h3>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {rec.match}% Match
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{rec.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rec.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    {rec.action}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Weekly AI Insights</h3>
            <p className="text-muted-foreground mb-4">
              Your career momentum is strong! You've completed 2 skill improvements this month. The AI predicts you'll
              be ready for senior roles in 4-6 months if you maintain this pace.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-xs text-muted-foreground">New Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">+15%</div>
                <div className="text-xs text-muted-foreground">Profile Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.2</div>
                <div className="text-xs text-muted-foreground">Skill Score</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
