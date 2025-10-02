"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SkillImpact {
  skill: string
  salaryIncrease: number
  demandLevel: "high" | "medium" | "low"
  timeToLearn: string
  roi: number
}

const skillImpacts: SkillImpact[] = [
  { skill: "TypeScript", salaryIncrease: 8000, demandLevel: "high", timeToLearn: "2-3 months", roi: 95 },
  { skill: "System Design", salaryIncrease: 12000, demandLevel: "high", timeToLearn: "4-6 months", roi: 92 },
  { skill: "AWS/Cloud", salaryIncrease: 10000, demandLevel: "high", timeToLearn: "3-4 months", roi: 88 },
  { skill: "React Native", salaryIncrease: 6000, demandLevel: "medium", timeToLearn: "2-3 months", roi: 75 },
  { skill: "GraphQL", salaryIncrease: 5000, demandLevel: "medium", timeToLearn: "1-2 months", roi: 82 },
  { skill: "Kubernetes", salaryIncrease: 11000, demandLevel: "high", timeToLearn: "4-5 months", roi: 85 },
]

export function SkillImpactCalculator() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Skill Impact Calculator</h2>
        <p className="text-muted-foreground">See how learning new skills can increase your earning potential</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-primary mb-2">
            €{skillImpacts.reduce((sum, skill) => sum + skill.salaryIncrease, 0).toLocaleString()}
          </div>
          <p className="text-muted-foreground">Total potential salary increase by mastering all skills</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{skillImpacts.length}</div>
            <div className="text-sm text-muted-foreground">High-Impact Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">12-18</div>
            <div className="text-sm text-muted-foreground">Months to Master</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">87%</div>
            <div className="text-sm text-muted-foreground">Average ROI</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {skillImpacts.map((skill) => (
          <Card key={skill.skill} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{skill.skill}</h3>
                  <Badge
                    variant="secondary"
                    className={skill.demandLevel === "high" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}
                  >
                    {skill.demandLevel.toUpperCase()} DEMAND
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Salary Increase:</span>
                    <span className="ml-2 font-semibold text-primary">+€{skill.salaryIncrease.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time to Learn:</span>
                    <span className="ml-2 font-semibold">{skill.timeToLearn}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ROI Score:</span>
                    <span className="ml-2 font-semibold text-accent">{skill.roi}/100</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Start Learning
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="text-xl font-bold mb-3">AI Recommendation</h3>
        <p className="text-muted-foreground mb-4">
          Based on your current skill set and market demand, we recommend focusing on System Design and AWS/Cloud first.
          These skills offer the highest salary increase (€22k combined) and are in extremely high demand across
          European markets. You could realistically master both within 8-10 months.
        </p>
        <Button className="bg-primary hover:bg-primary/90">Get Personalized Learning Path</Button>
      </Card>
    </div>
  )
}
