"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, MoreVertical } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  sender_id: string
  receiver_id: string
  read: boolean
  created_at: string
}

interface Conversation {
  id: string
  participant_1_id: string
  participant_2_id: string
  last_message_at: string
  other_user: {
    id: string
    full_name: string
    avatar_url: string
    headline: string
  }
  last_message: string
  unread_count: number
}

export function MessagesClient({ userId }: { userId: string }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const supabase = createBrowserClient()

  useEffect(() => {
    loadConversations()

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.conversation_id === activeConversation) {
            setMessages((prev) => [...prev, payload.new as Message])
          }
          loadConversations()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, activeConversation])

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        messages (content, created_at)
      `)
      .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
      .order("last_message_at", { ascending: false })

    if (!error && data) {
      // Transform data to include other user info
      const conversationsWithUsers = await Promise.all(
        data.map(async (conv) => {
          const otherUserId = conv.participant_1_id === userId ? conv.participant_2_id : conv.participant_1_id
          const { data: profile } = await supabase
            .from("profiles")
            .select("id, full_name, avatar_url, headline")
            .eq("id", otherUserId)
            .single()

          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("receiver_id", userId)
            .eq("read", false)

          return {
            ...conv,
            other_user: profile,
            last_message: conv.messages?.[0]?.content || "",
            unread_count: count || 0,
          }
        }),
      )
      setConversations(conversationsWithUsers)
    }
  }

  const loadMessages = async (conversationId: string) => {
    setActiveConversation(conversationId)

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (!error && data) {
      setMessages(data)

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .eq("receiver_id", userId)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return

    const conversation = conversations.find((c) => c.id === activeConversation)
    if (!conversation) return

    const receiverId =
      conversation.participant_1_id === userId ? conversation.participant_2_id : conversation.participant_1_id

    const { error } = await supabase.from("messages").insert({
      conversation_id: activeConversation,
      sender_id: userId,
      receiver_id: receiverId,
      content: newMessage,
    })

    if (!error) {
      setNewMessage("")
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", activeConversation)
    } else {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }
  }

  const activeConv = conversations.find((c) => c.id === activeConversation)

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2">
                {conversations
                  .filter((c) => c.other_user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => loadMessages(conv.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeConversation === conv.id ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                    >
                      <Avatar>
                        <AvatarImage src={conv.other_user?.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>{conv.other_user?.full_name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm truncate">
                            {conv.other_user?.full_name || "Unknown User"}
                          </p>
                          {conv.unread_count > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conv.last_message}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {activeConv ? (
            <CardContent className="p-0 flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeConv.other_user?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>{activeConv.other_user?.full_name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{activeConv.other_user?.full_name || "Unknown User"}</p>
                    <p className="text-xs text-muted-foreground">{activeConv.other_user?.headline || "No headline"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === userId ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender_id === userId ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
