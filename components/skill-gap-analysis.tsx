"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  current: number
  required: number
  priority: "high" | "medium" | "low"
}

const skills: Skill[] = [
  { name: "TypeScript", current: 60, required: 90, priority: "high" },
  { name: "System Design", current: 30, required: 85, priority: "high" },
  { name: "Testing (Jest/Vitest)", current: 45, required: 80, priority: "medium" },
  { name: "DevOps & CI/CD", current: 25, required: 70, priority: "medium" },
  { name: "Team Leadership", current: 40, required: 75, priority: "low" },
  { name: "Cloud Architecture", current: 35, required: 80, priority: "high" },
]

export function SkillGapAnalysis() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Skill Gap Analysis</h2>
        <p className="text-muted-foreground">AI-identified skills needed for your next career milestone</p>
      </div>

      <div className="grid gap-6">
        {skills.map((skill) => {
          const gap = skill.required - skill.current
          const gapPercentage = (gap / skill.required) * 100

          return (
            <Card key={skill.name} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        skill.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : skill.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {skill.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>Current: {skill.current}%</span>
                    <span>•</span>
                    <span>Required: {skill.required}%</span>
                    <span>•</span>
                    <span className="text-primary font-medium">Gap: {gap}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-20">Current</span>
                      <Progress value={skill.current} className="flex-1 h-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-20">Required</span>
                      <Progress value={skill.required} className="flex-1 h-2 [&>div]:bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  View Learning Path
                </Button>
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  Find Courses
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">AI Recommendation</h3>
            <p className="text-muted-foreground mb-4">
              Focus on TypeScript and System Design first - these high-priority skills will unlock 15+ senior positions
              in your area. Estimated learning time: 3-4 months with consistent practice.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Get Personalized Learning Plan</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
