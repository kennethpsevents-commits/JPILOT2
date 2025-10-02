"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles } from "lucide-react"
import { useState } from "react"

export function AIChatbox() {
  const [message, setMessage] = useState("")

  return (
    <section className="py-20 lg:py-32" id="features">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI Assistant</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Your AI Career Navigator</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chat with your AI copilot to optimize your CV, discover jobs, and get personalized career advice.
            </p>
          </div>

          <Card className="p-6 lg:p-8 bg-card border-border/50 shadow-2xl">
            <div className="space-y-4 mb-6 min-h-[300px]">
              {/* Placeholder chat messages */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-secondary rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm leading-relaxed">
                      Hi! I'm your AI Job Pilot. Upload your CV and tell me what kind of role you're looking for, and
                      I'll help optimize your application and find the perfect opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 max-w-md">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-4">
                    <p className="text-sm leading-relaxed">
                      I'm looking for senior frontend developer roles in tech companies.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">You</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-secondary rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm leading-relaxed">
                      Perfect! I'll help you tailor your CV for senior frontend positions. Upload your CV and I'll
                      suggest improvements to highlight your React, TypeScript, and system design experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Input
                placeholder="Ask me anything about your job search..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-background border-border"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              AI motor placeholder – Ready to connect to your AI backend
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
