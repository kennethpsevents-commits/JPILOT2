"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Job GPT assistant" : "Open Job GPT assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>

      {/* Placeholder for future Job GPT agent interface */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-card border-2 border-border rounded-lg shadow-2xl p-6"
          role="dialog"
          aria-label="Job GPT Assistant"
        >
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Job GPT Assistant</h3>
            <p className="text-muted-foreground text-sm">
              AI-powered job search assistant coming soon. Connect to your Job GPT agent here.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
