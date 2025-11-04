"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, DollarSign, Settings, Edit, Ban, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  name: string
  created_at: string
  subscription_status: string
  tier_name: string
}

interface SubscriptionTier {
  id: string
  name: string
  slug: string
  price_monthly: number
  price_yearly: number | null
  features: string[]
  is_active: boolean
}

interface AccessRule {
  feature_key: string
  feature_name: string
  is_free: boolean
  required_tier_slug: string | null
  is_enabled: boolean
}

export function AccessControlClient() {
  const [users, setUsers] = useState<User[]>([])
  const [tiers, setTiers] = useState<SubscriptionTier[]>([])
  const [rules, setRules] = useState<AccessRule[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [usersRes, tiersRes, rulesRes] = await Promise.all([
        fetch("/api/owner/users"),
        fetch("/api/owner/subscription-tiers"),
        fetch("/api/owner/access-rules"),
      ])

      if (usersRes.ok) setUsers(await usersRes.json())
      if (tiersRes.ok) setTiers(await tiersRes.json())
      if (rulesRes.ok) setRules(await rulesRes.json())
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load access control data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const blockUser = async (userId: string) => {
    try {
      const res = await fetch("/api/owner/users/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "block" }),
      })

      if (res.ok) {
        toast({ title: "User blocked successfully" })
        loadData()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to block user",
        variant: "destructive",
      })
    }
  }

  const grantFreeAccess = async (userId: string) => {
    try {
      const res = await fetch("/api/owner/users/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type: "grant_free" }),
      })

      if (res.ok) {
        toast({ title: "Free access granted" })
        loadData()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to grant access",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              Access Control
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage who can access your platform and what features they can use
            </p>
          </div>
          <Button asChild>
            <a href="/owner/dashboard">Back to Dashboard</a>
          </Button>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="tiers">
              <DollarSign className="w-4 h-4 mr-2" />
              Tiers
            </TabsTrigger>
            <TabsTrigger value="features">
              <Settings className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Control individual user access and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.name || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.tier_name || "Free"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.subscription_status === "active" ? "default" : "secondary"}>
                            {user.subscription_status || "free"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => grantFreeAccess(user.id)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => blockUser(user.id)}>
                              <Ban className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tiers Tab */}
          <TabsContent value="tiers">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Tiers</CardTitle>
                <CardDescription>Manage pricing plans and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {tiers.map((tier) => (
                    <Card key={tier.id}>
                      <CardHeader>
                        <CardTitle>{tier.name}</CardTitle>
                        <CardDescription>${(tier.price_monthly / 100).toFixed(2)}/mo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Switch checked={tier.is_active} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Access Rules</CardTitle>
                <CardDescription>Define which features are free and which require a subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Free Access</TableHead>
                      <TableHead>Required Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rules.map((rule) => (
                      <TableRow key={rule.feature_key}>
                        <TableCell className="font-medium">{rule.feature_name}</TableCell>
                        <TableCell>
                          <Badge variant={rule.is_free ? "default" : "secondary"}>{rule.is_free ? "Yes" : "No"}</Badge>
                        </TableCell>
                        <TableCell>
                          {rule.required_tier_slug ? <Badge variant="outline">{rule.required_tier_slug}</Badge> : "-"}
                        </TableCell>
                        <TableCell>
                          <Switch checked={rule.is_enabled} />
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
