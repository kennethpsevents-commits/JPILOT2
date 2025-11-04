import Link from "next/link"
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">WeAreJobPilot</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered job search platform helping you find your dream career in Europe.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/wearejobpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/wearejobpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/wearejobpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/wearejobpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/wearejobpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:Info@wearejobpilot.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Info@wearejobpilot.com
                </a>
              </li>
              <li className="text-muted-foreground text-xs pt-2">Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WeAreJobPilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
