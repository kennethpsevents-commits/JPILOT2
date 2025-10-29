import { Plane } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Plane className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold text-white">JobPilot</span>
            </Link>
            <p className="text-sm text-slate-400">Your career co-pilot for life.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/jobs" className="hover:text-cyan-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about#pricing" className="hover:text-cyan-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  Careers
                </Link>
              </li>
              <li>
                <a href="mailto:contact@wearejobpilot.com" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm text-slate-400">
              marketing@wearejobpilot.com
              <br />
              partnerships@wearejobpilot.com
              <br />
              @WeAreJobPilot
            </p>
          </div>
        </div>
        <Separator className="bg-slate-800 mb-6" />
        <p className="text-center text-sm text-slate-500">
          © 2025 WeAreJobPilot.com. All rights reserved. Proprietary and confidential.
        </p>
      </div>
    </footer>
  )
}
