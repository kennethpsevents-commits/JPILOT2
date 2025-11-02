"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const LOCATION_TYPES = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
]

const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
]

const CATEGORIES = [
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Data Science", label: "Data Science" },
  { value: "Content", label: "Content" },
]

export function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    location_type: searchParams.get("location_type") || "",
    employment_type: searchParams.get("employment_type") || "",
    experience_level: searchParams.get("experience_level") || "",
    category: searchParams.get("category") || "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`/jobs?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      location_type: "",
      employment_type: "",
      experience_level: "",
      category: "",
    })
    router.push("/jobs")
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Location Type</Label>
        <div className="space-y-2">
          {LOCATION_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${type.value}`}
                checked={filters.location_type === type.value}
                onCheckedChange={(checked) => handleFilterChange("location_type", checked ? type.value : "")}
              />
              <label
                htmlFor={`location-${type.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Employment Type</Label>
        <div className="space-y-2">
          {EMPLOYMENT_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`employment-${type.value}`}
                checked={filters.employment_type === type.value}
                onCheckedChange={(checked) => handleFilterChange("employment_type", checked ? type.value : "")}
              />
              <label
                htmlFor={`employment-${type.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Experience Level</Label>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={`experience-${level.value}`}
                checked={filters.experience_level === level.value}
                onCheckedChange={(checked) => handleFilterChange("experience_level", checked ? level.value : "")}
              />
              <label
                htmlFor={`experience-${level.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {level.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Category</Label>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${cat.value}`}
                checked={filters.category === cat.value}
                onCheckedChange={(checked) => handleFilterChange("category", checked ? cat.value : "")}
              />
              <label
                htmlFor={`category-${cat.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {cat.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" className="flex-1 bg-transparent">
          Clear
        </Button>
      </div>
    </div>
  )
}
