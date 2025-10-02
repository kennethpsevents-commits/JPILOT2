"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav role="navigation" className="container mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="text-2xl font-bold">JobPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/career-autopilot" className="text-sm font-medium hover:text-primary transition-colors">
            Career Autopilot
          </Link>
          <Link href="/companies" className="text-sm font-medium hover:text-primary transition-colors">
            Companies
          </Link>
          <Link href="/salary-intelligence" className="text-sm font-medium hover:text-primary transition-colors">
            Salary Intelligence
          </Link>
          <Link href="/alerts" className="text-sm font-medium hover:text-primary transition-colors">
            Job Alerts
          </Link>
          <Link href="/applications" className="text-sm font-medium hover:text-primary transition-colors">
            Applications
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="outline" size="sm" className="bg-transparent">
            Log In
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <Link
              href="/career-autopilot"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Career Autopilot
            </Link>
            <Link href="/companies" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Companies
            </Link>
            <Link
              href="/salary-intelligence"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Salary Intelligence
            </Link>
            <Link href="/alerts" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Job Alerts
            </Link>
            <Link href="/applications" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Applications
            </Link>
            <div className="pt-4 border-t border-border space-y-3">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Log In
              </Button>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
