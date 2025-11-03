"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Briefcase, Bot, DollarSign, LayoutDashboard, User, FileText, Mail, LogOut, Settings } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground">JobPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/jobs"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-foreground",
              isActive("/jobs") ? "text-primary-foreground" : "text-primary-foreground/80",
            )}
          >
            Find Jobs
          </Link>
          <Link
            href="/ai-assistant"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-foreground",
              isActive("/ai-assistant") ? "text-primary-foreground" : "text-primary-foreground/80",
            )}
          >
            AI Assistant
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-foreground",
              isActive("/pricing") ? "text-primary-foreground" : "text-primary-foreground/80",
            )}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-foreground",
              isActive("/contact") ? "text-primary-foreground" : "text-primary-foreground/80",
            )}
          >
            Contact
          </Link>
          <Link
            href="/owner/login"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-foreground",
              isActive("/owner/login") || isActive("/owner/dashboard")
                ? "text-primary-foreground"
                : "text-primary-foreground/60",
            )}
          >
            Owner
          </Link>
        </nav>

        {/* Desktop Auth/User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/applications" className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    My Applications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/subscription" className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="text-primary-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/jobs"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                  isActive("/jobs") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <Briefcase className="h-4 w-4" />
                Find Jobs
              </Link>
              <Link
                href="/ai-assistant"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                  isActive("/ai-assistant") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <Bot className="h-4 w-4" />
                AI Assistant
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                  isActive("/pricing") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <DollarSign className="h-4 w-4" />
                Pricing
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                  isActive("/contact") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>

              <Link
                href="/owner/login"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                  isActive("/owner/login") || isActive("/owner/dashboard")
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <User className="h-4 w-4" />
                Owner
              </Link>

              {user && (
                <>
                  <div className="border-t my-2" />
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                      isActive("/dashboard") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                      isActive("/profile") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/applications"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                      isActive("/applications") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    My Applications
                  </Link>
                  <Link
                    href="/settings/subscription"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium p-2 rounded-md transition-colors",
                      isActive("/settings/subscription") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <Settings className="h-4 w-4" />
                    Subscription
                  </Link>
                </>
              )}

              <div className="border-t my-2" />

              {user ? (
                <Button variant="destructive" onClick={handleSignOut} className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
