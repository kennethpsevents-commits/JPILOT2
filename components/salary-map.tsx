"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CityData {
  name: string
  country: string
  averageSalary: number
  costOfLiving: number
  jobOpenings: number
  growth: number
}

const europeanCities: CityData[] = [
  { name: "Amsterdam", country: "Netherlands", averageSalary: 70000, costOfLiving: 85, jobOpenings: 1250, growth: 12 },
  { name: "Berlin", country: "Germany", averageSalary: 65000, costOfLiving: 70, jobOpenings: 2100, growth: 15 },
  { name: "Paris", country: "France", averageSalary: 60000, costOfLiving: 80, jobOpenings: 1800, growth: 8 },
  { name: "Rotterdam", country: "Netherlands", averageSalary: 67000, costOfLiving: 75, jobOpenings: 450, growth: 10 },
  { name: "Munich", country: "Germany", averageSalary: 68000, costOfLiving: 82, jobOpenings: 890, growth: 11 },
  { name: "Lyon", country: "France", averageSalary: 55000, costOfLiving: 65, jobOpenings: 320, growth: 9 },
]

export function SalaryMap() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">European Salary Map</h2>
        <p className="text-muted-foreground">Compare salaries and opportunities across major European tech hubs</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {europeanCities.map((city) => {
          const purchasingPower = Math.round((city.averageSalary / city.costOfLiving) * 100)

          return (
            <Card key={city.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                  <p className="text-sm text-muted-foreground">{city.country}</p>
                </div>
                <Badge variant="secondary" className={city.growth >= 12 ? "bg-accent/20 text-accent" : ""}>
                  +{city.growth}% Growth
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Average Salary</span>
                    <span className="text-lg font-bold text-primary">€{city.averageSalary.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(city.averageSalary / 70000) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Cost of Living</span>
                    <span className="text-sm font-semibold">{city.costOfLiving}/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${city.costOfLiving}%` }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{city.jobOpenings}</div>
                      <div className="text-xs text-muted-foreground">Open Positions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{purchasingPower}</div>
                      <div className="text-xs text-muted-foreground">Purchasing Power</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="text-xl font-bold mb-3">Market Insights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Highest Salaries</h4>
            <p className="text-sm text-muted-foreground">
              Amsterdam and Munich lead with €70k+ average salaries for tech roles
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Best Value</h4>
            <p className="text-sm text-muted-foreground">
              Berlin offers the best purchasing power with lower cost of living
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Fastest Growing</h4>
            <p className="text-sm text-muted-foreground">Berlin shows 15% job growth, highest in the region</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
