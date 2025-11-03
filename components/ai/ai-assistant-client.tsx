"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Target,
  FileText,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Building,
  CheckCircle,
  Map,
  Loader2,
} from "lucide-react"
import { JOBGPT_MODULES } from "@/lib/ai/jobgpt-system"

const iconMap: Record<string, any> = {
  Target,
  FileText,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Building,
  CheckCircle,
  Map,
}

interface AIAssistantClientProps {
  profile: any
}

export default function AIAssistantClient({ profile }: AIAssistantClientProps) {
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: `Hello${profile?.full_name ? ` ${profile.full_name}` : ""}! I'm JobGPT, your AI career assistant. I can help you with job search, resume optimization, interview preparation, and much more. What would you like help with today?`,
          },
        ],
        createdAt: new Date(),
      },
    ],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    sendMessage({ text: input })
    setInput("")
  }

  const handleQuickAction = (action: string) => {
    sendMessage({ text: action })
  }

  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-primary-foreground" />
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">JobGPT AI Assistant</h1>
              <p className="text-xs text-primary-foreground/80">Your intelligent career companion</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container flex-1 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* AI Modules Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {JOBGPT_MODULES.map((module) => {
                  const Icon = iconMap[module.icon] || Target
                  return (
                    <Button
                      key={module.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3 bg-transparent"
                      onClick={() => handleQuickAction(module.action)}
                      disabled={status === "in_progress"}
                    >
                      <Icon className="h-4 w-4 mr-2 shrink-0 text-primary" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{module.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{module.description}</div>
                      </div>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Support Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src="/happy-diverse-customer-support-team-smiling-at-cam.jpg"
                  alt="Support team"
                  className="w-full h-48 object-cover"
                  style={{ filter: "contrast(0.35)" }}
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src="/friendly-customer-service-representative-with-head.jpg"
                  alt="Customer service"
                  className="w-full h-48 object-cover"
                  style={{ filter: "contrast(0.35)" }}
                />
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-12rem)]">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 shrink-0 bg-primary">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`flex flex-col gap-2 max-w-[80%] ${
                            message.role === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          {message.parts.map((part, index) => {
                            if (part.type === "text") {
                              return (
                                <div
                                  key={index}
                                  className={`rounded-lg px-4 py-3 ${
                                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                  }`}
                                >
                                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{part.text}</p>
                                </div>
                              )
                            }
                            return null
                          })}
                        </div>

                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 shrink-0 bg-primary/10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {profile?.full_name?.[0] || "U"}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {status === "in_progress" && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8 shrink-0 bg-primary">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-4 py-3">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything about your job search..."
                      disabled={status === "in_progress"}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={!input.trim() || status === "in_progress"}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {status === "in_progress" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
