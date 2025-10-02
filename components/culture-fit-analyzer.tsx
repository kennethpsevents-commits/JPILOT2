"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CultureMetric {
  name: string
  yourPreference: number
  companyScore: number
  match: number
}

const cultureMetrics: CultureMetric[] = [
  { name: "Work-Life Balance", yourPreference: 90, companyScore: 85, match: 94 },
  { name: "Innovation Focus", yourPreference: 85, companyScore: 95, match: 89 },
  { name: "Team Collaboration", yourPreference: 80, companyScore: 90, match: 88 },
  { name: "Career Growth", yourPreference: 95, companyScore: 80, match: 84 },
  { name: "Remote Flexibility", yourPreference: 100, companyScore: 100, match: 100 },
  { name: "Diversity & Inclusion", yourPreference: 85, companyScore: 90, match: 94 },
]

export function CultureFitAnalyzer() {
  const overallFit = Math.round(cultureMetrics.reduce((sum, metric) => sum + metric.match, 0) / cultureMetrics.length)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
          <div className="text-5xl font-bold text-primary">{overallFit}%</div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Culture Fit Score</h2>
        <p className="text-muted-foreground">Based on your preferences and company values</p>
      </div>

      <div className="grid gap-6">
        {cultureMetrics.map((metric) => (
          <Card key={metric.name} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{metric.name}</h3>
              <span className="text-2xl font-bold text-primary">{metric.match}%</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Your Preference</span>
                  <span className="font-medium">{metric.yourPreference}%</span>
                </div>
                <Progress value={metric.yourPreference} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Company Score</span>
                  <span className="font-medium">{metric.companyScore}%</span>
                </div>
                <Progress value={metric.companyScore} className="h-2 [&>div]:bg-accent" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
        <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
        <p className="text-muted-foreground mb-4">
          This company is an excellent match for your work style and values. The strong emphasis on remote flexibility
          and innovation aligns perfectly with your preferences. The slightly lower career growth score is offset by
          their excellent mentorship programs and clear promotion paths.
        </p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
            Highly Recommended
          </span>
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">Top 5% Match</span>
        </div>
      </Card>
    </div>
  )
}
