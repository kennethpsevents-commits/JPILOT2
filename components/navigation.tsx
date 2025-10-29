"use client"

import { Button } from "@/components/ui/button"
import { Plane, Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface NavigationProps {
  user?: {
    email?: string
  } | null
}

export function Navigation({ user }: NavigationProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold text-white">JobPilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/jobs" className="text-white hover:text-cyan-400 transition">
            Job Radar
          </Link>
          <Link href="/dashboard" className="text-white hover:text-cyan-400 transition">
            Cockpit
          </Link>
          <Link href="/about" className="text-white hover:text-cyan-400 transition">
            Mission Control
          </Link>
          {user ? (
            <>
              <Link href="/profile" className="text-white hover:text-cyan-400 transition">
                Profile
              </Link>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 bg-transparent"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold">
                  Launch Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur z-40 p-6 border-b border-slate-800">
          <Link href="/jobs" className="block py-3 text-white hover:text-cyan-400">
            Job Radar
          </Link>
          <Link href="/dashboard" className="block py-3 text-white hover:text-cyan-400">
            Cockpit
          </Link>
          <Link href="/about" className="block py-3 text-white hover:text-cyan-400">
            Mission Control
          </Link>
          {user ? (
            <>
              <Link href="/profile" className="block py-3 text-white hover:text-cyan-400">
                Profile
              </Link>
              <Button onClick={handleSignOut} className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block py-3 text-white hover:text-cyan-400">
                Sign In
              </Link>
              <Link href="/auth/sign-up">
                <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900">Launch Now</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
