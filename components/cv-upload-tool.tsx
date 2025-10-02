"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Sparkles } from "lucide-react"
import { useState } from "react"

export function CVUploadTool() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Upload & Optimize Your CV</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drop your CV and watch AI transform it for each job application. Instant suggestions, perfect formatting.
            </p>
          </div>

          <Card
            className={`p-12 border-2 border-dashed transition-all ${
              isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border/50 hover:border-primary/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-accent-foreground" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">Drop your CV here</h3>
              <p className="text-muted-foreground mb-6 max-w-md">Supports PDF, DOCX, and TXT files up to 10MB</p>

              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <FileText className="mr-2 h-4 w-4" />
                Choose File
              </Button>

              <div className="mt-8 pt-8 border-t border-border/50 w-full">
                <p className="text-sm text-muted-foreground mb-4">AI will analyze and suggest:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Keyword optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Format improvements</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Content refinement</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
