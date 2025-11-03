"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Archive, FileText } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface SOP {
  id: string
  title: string
  category: string
  content: string
  version: number
  status: string
  created_at: string
  updated_at: string
}

export function SOPsClient() {
  const [sops, setSOPs] = useState<SOP[]>([])
  const [selectedSOP, setSelectedSOP] = useState<SOP | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "operations",
    content: "",
  })
  const supabase = createBrowserClient()

  useEffect(() => {
    loadSOPs()
  }, [])

  const loadSOPs = async () => {
    const { data } = await supabase
      .from("sops")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (data) setSOPs(data)
  }

  const handleSave = async () => {
    if (selectedSOP) {
      // Update existing
      await supabase
        .from("sops")
        .update({
          ...formData,
          version: selectedSOP.version + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedSOP.id)
    } else {
      // Create new
      await supabase.from("sops").insert(formData)
    }

    setIsEditing(false)
    setSelectedSOP(null)
    setFormData({ title: "", category: "operations", content: "" })
    loadSOPs()
  }

  const handleEdit = (sop: SOP) => {
    setSelectedSOP(sop)
    setFormData({
      title: sop.title,
      category: sop.category,
      content: sop.content,
    })
    setIsEditing(true)
  }

  const handleArchive = async (id: string) => {
    await supabase.from("sops").update({ status: "archived" }).eq("id", id)
    loadSOPs()
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Standard Operating Procedures</h1>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New SOP
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{selectedSOP ? "Edit SOP" : "Create New SOP"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="SOP Title"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="customer_support">Customer Support</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="SOP content in markdown format..."
                rows={15}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Save SOP</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setSelectedSOP(null)
                  setFormData({ title: "", category: "operations", content: "" })
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sops.map((sop) => (
            <Card key={sop.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {sop.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {sop.category} • v{sop.version}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{sop.content}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(sop)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleArchive(sop.id)}>
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
