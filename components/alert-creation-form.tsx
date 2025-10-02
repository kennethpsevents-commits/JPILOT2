"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function AlertCreationForm() {
  const [alertName, setAlertName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")
  const [priority, setPriority] = useState("medium")
  const [frequency, setFrequency] = useState("daily")

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Job Alert</h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="alert-name">Alert Name</Label>
          <Input
            id="alert-name"
            placeholder="e.g., Senior Frontend Jobs in Amsterdam"
            value={alertName}
            onChange={(e) => setAlertName(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title / Keywords</Label>
            <Input
              id="job-title"
              placeholder="e.g., Software Engineer, React Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Amsterdam, Berlin, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High - Instant notifications</SelectItem>
                <SelectItem value="medium">Medium - Daily digest</SelectItem>
                <SelectItem value="low">Low - Weekly roundup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant (as jobs are posted)</SelectItem>
                <SelectItem value="daily">Daily summary</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Notification Channels</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="email" defaultChecked />
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email notifications
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="push" defaultChecked />
              <label
                htmlFor="push"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Push notifications
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sms" />
              <label
                htmlFor="sms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                SMS notifications (Premium only)
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Create Alert
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
