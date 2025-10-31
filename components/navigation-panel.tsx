"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Briefcase,
  LayoutDashboard,
  User,
  Info,
  Shield,
  ChevronLeft,
  ChevronRight,
  Plane,
  LogIn,
  UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@supabase/ssr"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  requiresAuth?: boolean
}

const navigationItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Job Radar", href: "/jobs", icon: Briefcase },
  { name: "Cockpit", href: "/dashboard", icon: LayoutDashboard, requiresAuth: true },
  { name: "Profile", href: "/profile", icon: User, requiresAuth: true },
  { name: "Mission Control", href: "/about", icon: Info },
  { name: "Privacy", href: "/privacy", icon: Shield },
]

const authItems: NavItem[] = [
  { name: "Sign In", href: "/auth/login", icon: LogIn },
  { name: "Sign Up", href: "/auth/sign-up", icon: UserPlus },
]

export function NavigationPanel() {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("[v0] Error fetching user:", error)
        setUser(null)
      }
    }

    fetchUser()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const visibleItems = navigationItems.filter((item) => {
    if (item.requiresAuth && !user) return false
    return true
  })

  const visibleAuthItems = user ? [] : authItems

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-800 transition-all duration-300 z-40",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            {!collapsed && <span className="text-xl font-bold text-white">JobPilot</span>}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  active
                    ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white",
                  collapsed && "justify-center",
                )}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.name}</span>}
                {active && !collapsed && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400" />}
              </Link>
            )
          })}

          {/* Auth Items (if not logged in) */}
          {visibleAuthItems.length > 0 && (
            <>
              <div className="my-4 border-t border-slate-800" />
              {visibleAuthItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      active
                        ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white",
                      collapsed && "justify-center",
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 border-t border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-40">
        <div className="flex items-center justify-around px-2 py-3">
          {visibleItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]",
                  active ? "text-cyan-400" : "text-slate-400 hover:text-white",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate w-full text-center">{item.name}</span>
                {active && <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1" />}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
