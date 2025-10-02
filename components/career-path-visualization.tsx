"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CareerNode {
  id: string
  title: string
  level: number
  salary: string
  timeframe: string
  skills: string[]
  current?: boolean
}

const careerPath: CareerNode[] = [
  {
    id: "1",
    title: "Junior Developer",
    level: 1,
    salary: "€35k - €45k",
    timeframe: "Current",
    skills: ["JavaScript", "React", "HTML/CSS"],
    current: true,
  },
  {
    id: "2",
    title: "Mid-Level Developer",
    level: 2,
    salary: "€50k - €65k",
    timeframe: "6-12 months",
    skills: ["TypeScript", "Next.js", "Node.js", "Testing"],
  },
  {
    id: "3",
    title: "Senior Developer",
    level: 3,
    salary: "€70k - €90k",
    timeframe: "2-3 years",
    skills: ["System Design", "Mentoring", "Architecture", "DevOps"],
  },
  {
    id: "4",
    title: "Tech Lead",
    level: 4,
    salary: "€85k - €110k",
    timeframe: "4-5 years",
    skills: ["Team Leadership", "Project Management", "Strategic Planning"],
  },
]

export function CareerPathVisualization() {
  const [selectedNode, setSelectedNode] = useState<CareerNode>(careerPath[0])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your Career Flight Path</h2>
        <p className="text-muted-foreground">AI-predicted trajectory based on your skills and market trends</p>
      </div>

      {/* Career Path Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 -translate-x-1/2" />

        <div className="space-y-12">
          {careerPath.map((node, index) => (
            <div
              key={node.id}
              className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <Card
                className={`w-[calc(50%-2rem)] p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedNode.id === node.id ? "ring-2 ring-primary shadow-lg" : ""
                } ${node.current ? "bg-primary/5 border-primary" : ""}`}
                onClick={() => setSelectedNode(node)}
              >
                {node.current && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    YOU ARE HERE
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{node.title}</h3>
                    <p className="text-sm text-muted-foreground">{node.timeframe}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">{node.salary}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {node.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-muted rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {node.skills.length > 3 && (
                    <span className="px-2 py-1 bg-muted rounded text-xs">+{node.skills.length - 3} more</span>
                  )}
                </div>
              </Card>

              {/* Timeline Node */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${
                  node.current ? "bg-accent ring-4 ring-accent/20" : "bg-primary"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Details */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="text-2xl font-bold mb-4">{selectedNode.title}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Required Skills</h4>
            <div className="space-y-2">
              {selectedNode.skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Timeline & Salary</h4>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">Expected timeframe:</span> {selectedNode.timeframe}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Salary range:</span> {selectedNode.salary}
              </p>
            </div>
          </div>
        </div>
        <Button className="mt-6 bg-primary hover:bg-primary/90">Get Personalized Roadmap</Button>
      </Card>
    </div>
  )
}
