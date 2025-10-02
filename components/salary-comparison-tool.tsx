"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface SalaryData {
  role: string
  location: string
  min: number
  median: number
  max: number
  currency: string
}

const salaryDatabase: Record<string, SalaryData[]> = {
  "Software Engineer": [
    { role: "Software Engineer", location: "Amsterdam, NL", min: 55000, median: 70000, max: 85000, currency: "EUR" },
    { role: "Software Engineer", location: "Berlin, DE", min: 50000, median: 65000, max: 80000, currency: "EUR" },
    { role: "Software Engineer", location: "Paris, FR", min: 45000, median: 60000, max: 75000, currency: "EUR" },
    { role: "Software Engineer", location: "Rotterdam, NL", min: 52000, median: 67000, max: 82000, currency: "EUR" },
  ],
  "Senior Software Engineer": [
    {
      role: "Senior Software Engineer",
      location: "Amsterdam, NL",
      min: 70000,
      median: 85000,
      max: 100000,
      currency: "EUR",
    },
    {
      role: "Senior Software Engineer",
      location: "Berlin, DE",
      min: 65000,
      median: 80000,
      max: 95000,
      currency: "EUR",
    },
    { role: "Senior Software Engineer", location: "Paris, FR", min: 60000, median: 75000, max: 90000, currency: "EUR" },
    {
      role: "Senior Software Engineer",
      location: "Rotterdam, NL",
      min: 68000,
      median: 83000,
      max: 98000,
      currency: "EUR",
    },
  ],
  "Product Manager": [
    { role: "Product Manager", location: "Amsterdam, NL", min: 65000, median: 80000, max: 95000, currency: "EUR" },
    { role: "Product Manager", location: "Berlin, DE", min: 60000, median: 75000, max: 90000, currency: "EUR" },
    { role: "Product Manager", location: "Paris, FR", min: 55000, median: 70000, max: 85000, currency: "EUR" },
    { role: "Product Manager", location: "Rotterdam, NL", min: 63000, median: 78000, max: 93000, currency: "EUR" },
  ],
}

export function SalaryComparisonTool() {
  const [selectedRole, setSelectedRole] = useState("Software Engineer")
  const [yearsExperience, setYearsExperience] = useState("3")

  const salaryData = salaryDatabase[selectedRole] || []

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Salary Comparison Tool</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="role">Job Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                <SelectItem value="Senior Software Engineer">Senior Software Engineer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              min="0"
              max="20"
            />
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Calculate My Market Value</Button>
      </Card>

      <div className="grid gap-6">
        {salaryData.map((data) => (
          <Card key={data.location} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{data.location}</h3>
                <p className="text-sm text-muted-foreground">{data.role}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">€{data.median.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Median Salary</p>
              </div>
            </div>

            <div className="relative h-12 bg-gradient-to-r from-accent/20 via-primary/40 to-accent/60 rounded-lg mb-4">
              <div className="absolute inset-0 flex items-center justify-between px-4 text-sm font-semibold">
                <span>€{data.min.toLocaleString()}</span>
                <span className="text-primary">€{data.median.toLocaleString()}</span>
                <span>€{data.max.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-muted-foreground mb-1">25th Percentile</p>
                <p className="font-semibold">€{data.min.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Median</p>
                <p className="font-semibold text-primary">€{data.median.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">75th Percentile</p>
                <p className="font-semibold">€{data.max.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
