"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ErrorLog {
  id: string
  error_type: string
  error_message: string
  stack_trace?: string
  severity: string
  status: string
  url?: string
  user_id?: string
  created_at: string
  resolved_at?: string
  resolution_notes?: string
}

export function ErrorManager() {
  const [errors, setErrors] = useState<ErrorLog[]>([])
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null)
  const [resolutionNotes, setResolutionNotes] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchErrors()
  }, [filterStatus])

  const fetchErrors = async () => {
    try {
      const response = await fetch(`/api/owner/errors?status=${filterStatus}`)
      const data = await response.json()
      setErrors(data.errors || [])
    } catch (error) {
      console.error("Failed to fetch errors:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateErrorStatus = async (errorId: string, status: string) => {
    try {
      await fetch(`/api/owner/errors/${errorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, resolution_notes: resolutionNotes }),
      })
      fetchErrors()
      setSelectedError(null)
      setResolutionNotes("")
    } catch (error) {
      console.error("Failed to update error:", error)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "high":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "default"
      case "investigating":
        return "secondary"
      case "ignored":
        return "outline"
      default:
        return "destructive"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Error List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Error Logs</CardTitle>
          <CardDescription>{errors.length} errors found</CardDescription>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Errors</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="ignored">Ignored</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : errors.length === 0 ? (
                <p className="text-sm text-muted-foreground">No errors found</p>
              ) : (
                errors.map((error) => (
                  <div
                    key={error.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                      selectedError?.id === error.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedError(error)}
                  >
                    <div className="flex items-start gap-2">
                      {getSeverityIcon(error.severity)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{error.error_type}</p>
                        <p className="text-xs text-muted-foreground truncate">{error.error_message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getStatusColor(error.status)} className="text-xs">
                            {error.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {error.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(error.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Error Details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Error Details</CardTitle>
          <CardDescription>
            {selectedError ? "Manage and resolve error" : "Select an error to view details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedError ? (
            <div className="flex items-center justify-center h-[600px] text-muted-foreground">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an error to view details</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Error Type</p>
                  <p className="text-sm text-muted-foreground">{selectedError.error_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Severity</p>
                  <Badge variant="outline">{selectedError.severity}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={getStatusColor(selectedError.status)}>{selectedError.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Occurred</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(selectedError.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Error Message</p>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-mono">{selectedError.error_message}</p>
                </div>
              </div>

              {selectedError.url && (
                <div>
                  <p className="text-sm font-medium mb-2">URL</p>
                  <p className="text-sm text-muted-foreground">{selectedError.url}</p>
                </div>
              )}

              {selectedError.stack_trace && (
                <div>
                  <p className="text-sm font-medium mb-2">Stack Trace</p>
                  <ScrollArea className="h-[200px]">
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">{selectedError.stack_trace}</pre>
                  </ScrollArea>
                </div>
              )}

              {selectedError.status !== "resolved" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Resolution Notes</p>
                    <Textarea
                      placeholder="Add notes about how this error was resolved..."
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => updateErrorStatus(selectedError.id, "investigating")} variant="outline">
                      Mark as Investigating
                    </Button>
                    <Button onClick={() => updateErrorStatus(selectedError.id, "resolved")}>Mark as Resolved</Button>
                    <Button onClick={() => updateErrorStatus(selectedError.id, "ignored")} variant="secondary">
                      Ignore
                    </Button>
                  </div>
                </div>
              )}

              {selectedError.resolved_at && (
                <div>
                  <p className="text-sm font-medium mb-2">Resolution</p>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      Resolved {formatDistanceToNow(new Date(selectedError.resolved_at), { addSuffix: true })}
                    </p>
                    {selectedError.resolution_notes && (
                      <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                        {selectedError.resolution_notes}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
