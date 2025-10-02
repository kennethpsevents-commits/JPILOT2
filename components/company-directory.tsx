"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface Company {
  id: string
  name: string
  logo: string
  industry: string
  size: string
  location: string
  cultureFit: number
  rating: number
  openPositions: number
  benefits: string[]
}

const companies: Company[] = [
  {
    id: "1",
    name: "TechCorp Amsterdam",
    logo: "/tech-company-logo.jpg",
    industry: "Technology",
    size: "500-1000",
    location: "Amsterdam, NL",
    cultureFit: 95,
    rating: 4.5,
    openPositions: 23,
    benefits: ["Remote Work", "Health Insurance", "Learning Budget"],
  },
  {
    id: "2",
    name: "InnovateCo Berlin",
    logo: "/innovation-company-logo.png",
    industry: "SaaS",
    size: "200-500",
    location: "Berlin, DE",
    cultureFit: 88,
    rating: 4.3,
    openPositions: 15,
    benefits: ["Flexible Hours", "Stock Options", "Gym Membership"],
  },
  {
    id: "3",
    name: "DataFlow Paris",
    logo: "/data-company-logo.png",
    industry: "Data Analytics",
    size: "100-200",
    location: "Paris, FR",
    cultureFit: 92,
    rating: 4.6,
    openPositions: 8,
    benefits: ["Remote Work", "Unlimited PTO", "Training Programs"],
  },
  {
    id: "4",
    name: "CloudScale Rotterdam",
    logo: "/cloud-company-logo.png",
    industry: "Cloud Services",
    size: "1000+",
    location: "Rotterdam, NL",
    cultureFit: 85,
    rating: 4.2,
    openPositions: 34,
    benefits: ["Pension Plan", "Relocation Support", "Career Development"],
  },
]

export function CompanyDirectory() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search companies by name, industry, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{company.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{company.industry}</span>
                      <span>•</span>
                      <span>{company.size} employees</span>
                      <span>•</span>
                      <span>{company.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-accent/20 text-accent">
                      {company.cultureFit}% Culture Fit
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{company.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{company.openPositions} open positions</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.benefits.map((benefit) => (
                    <span key={benefit} className="px-3 py-1 bg-muted rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    View Company Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    See Open Positions
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
