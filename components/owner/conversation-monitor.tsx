"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Search, Eye, Copy, Check } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Conversation {
  id: string
  user_id: string
  title: string
  location: string
  language: string
  created_at: string
  updated_at: string
  message_count: number
  user_email?: string
}

interface Message {
  id: string
  role: string
  content: string
  created_at: string
}

export function ConversationMonitor() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/owner/conversations")
      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error("Failed to fetch conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/owner/conversations/${conversationId}`)
      const data = await response.json()
      setMessages(data.messages || [])
      setSelectedConversation(conversationId)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  const exportConversation = async (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId)
    const conversationMessages = selectedConversation === conversationId ? messages : []

    const exportData = {
      conversation,
      messages: conversationMessages,
      exported_at: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversation-${conversationId}-${Date.now()}.json`
    a.click()
  }

  const copyConversation = () => {
    const text = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredConversations = conversations.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.user_email?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>All Conversations</CardTitle>
          <CardDescription>{conversations.length} total conversations</CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : filteredConversations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No conversations found</p>
              ) : (
                filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                      selectedConversation === conv.id ? "bg-accent" : ""
                    }`}
                    onClick={() => fetchMessages(conv.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{conv.title || "Untitled"}</p>
                        <p className="text-xs text-muted-foreground truncate">{conv.user_email || conv.user_id}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {conv.language || "en"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{conv.message_count || 0} msgs</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => exportConversation(conv.id)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(conv.created_at), { addSuffix: true })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conversation Details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Conversation Details</CardTitle>
              <CardDescription>
                {selectedConversation ? "View and export conversation" : "Select a conversation to view"}
              </CardDescription>
            </div>
            {selectedConversation && (
              <Button size="sm" variant="outline" onClick={copyConversation}>
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!selectedConversation ? (
            <div className="flex items-center justify-center h-[600px] text-muted-foreground">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to view messages</p>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg ${msg.role === "user" ? "bg-primary/10 ml-8" : "bg-muted mr-8"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={msg.role === "user" ? "default" : "secondary"}>{msg.role}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
