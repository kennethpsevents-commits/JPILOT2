"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Radar, Plane, Bot, Zap, Target, ArrowRight, Menu, X, Gauge, MapPin, Briefcase, Headphones } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ImageGrid } from "@/components/image-grid"
import { AILogo } from "@/components/ai-logo"

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("buddy")

  return (
    <>
      {/* === HERO SECTION === */}
      <header className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.jpg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <nav className="relative z-50 container mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold">JobPilot</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#radar" className="hover:text-cyan-400 transition">
              Radar
            </a>
            <a href="#cockpit" className="hover:text-cyan-400 transition">
              Cockpit
            </a>
            <a href="#mission" className="hover:text-cyan-400 transition">
              Mission Control
            </a>
            <a href="#route" className="hover:text-cyan-400 transition">
              Routeplanner
            </a>
            <Link href="/jobs">
              <Button
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 bg-transparent"
              >
                Launch Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur z-40 p-6">
            <a href="#radar" className="block py-2">
              Radar
            </a>
            <a href="#cockpit" className="block py-2">
              Cockpit
            </a>
            <a href="#mission" className="block py-2">
              Mission Control
            </a>
            <a href="#route" className="block py-2">
              Routeplanner
            </a>
          </div>
        )}

        <div className="relative z-10 container mx-auto px-6 pt-20 text-center">
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-400">
            <Zap className="w-3 h-3 mr-1" /> 99.9% Uptime • {"<"} 2s Global Load
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Your Career Co-Pilot Has Landed
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-4xl mx-auto">
            AI-powered job matching • Aviation-themed journey • 20-step validation • 10,000+ concurrent users supported
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold">
                Start Your Flight <Plane className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">{"<"} 2s</div>
              <div className="text-sm text-slate-400">Global Load</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">10K+</div>
              <div className="text-sm text-slate-400">Concurrent Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">{"<"} 0.1%</div>
              <div className="text-sm text-slate-400">Error Rate</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </header>

      {/* === SUPPORT IMAGES === */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <ImageGrid
            images={[
              {
                src: "/happy-smiling-female-customer-service-agent-in-mod.jpg",
                alt: "Professional customer support team in modern office",
              },
              {
                src: "/cheerful-male-customer-service-team-member-in-brig.jpg",
                alt: "Friendly support specialist helping users",
              },
            ]}
          />
        </div>
      </section>

      {/* === NAVIGATION RADAR === */}
      <section id="radar" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Navigation Radar</h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Choose your destination. Every path leads to action in ≤2 clicks.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Radar, label: "Job Radar", desc: "Scan opportunities", href: "/jobs" },
              { icon: Gauge, label: "Cockpit", desc: "Control your career", href: "/dashboard" },
              { icon: Target, label: "Mission Control", desc: "Plan & execute", href: "/dashboard" },
              { icon: MapPin, label: "Routeplanner", desc: "Map your future", href: "/profile" },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500 transition group cursor-pointer h-full">
                  <div className="p-6 text-center">
                    <item.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400 group-hover:scale-110 transition" />
                    <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === KEY FEATURES === */}
      <section id="cockpit" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Flight-Grade Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Bot,
                title: "AI-Powered Matching",
                desc: "ML algorithm + real-time insights",
                color: "from-cyan-500 to-blue-600",
              },
              {
                icon: Plane,
                title: "Aviation UX",
                desc: "Flight path progress + milestones",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: Briefcase,
                title: "Procedure Engine",
                desc: "Step-by-step applications & docs",
                color: "from-purple-500 to-pink-600",
              },
              {
                icon: Headphones,
                title: "AI Buddy System",
                desc: "Coach, Manager, Lawyer — 24/7",
                color: "from-orange-500 to-red-600",
              },
            ].map((feat, i) => (
              <Card key={i} className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition">
                <div className="p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg bg-gradient-to-br mb-4 flex items-center justify-center",
                      feat.color,
                    )}
                  >
                    <feat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <AILogo size="sm" />
                    <h3 className="font-semibold text-white">{feat.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{feat.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === AI BUDDY SYSTEM === */}
      <section id="mission" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Your AI Crew — Always Onboard</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800">
              <TabsTrigger value="buddy">Buddy</TabsTrigger>
              <TabsTrigger value="coach">Coach</TabsTrigger>
              <TabsTrigger value="manager">Manager</TabsTrigger>
              <TabsTrigger value="lawyer">Lawyer</TabsTrigger>
            </TabsList>
            <TabsContent value="buddy" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                  <Avatar className="w-24 h-24">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl">
                      👋
                    </div>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AILogo size="md" label="Your Friendly Buddy" />
                    </div>
                    <p className="text-slate-300">Casual guidance, daily check-ins, motivation, and quick answers.</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="coach" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                  <Avatar className="w-24 h-24">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-3xl">
                      🎯
                    </div>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AILogo size="md" label="Your Career Coach" />
                    </div>
                    <p className="text-slate-300">
                      Strategic advice, skill development, interview prep, and career planning.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="manager" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                  <Avatar className="w-24 h-24">
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-3xl">
                      📊
                    </div>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AILogo size="md" label="Your Project Manager" />
                    </div>
                    <p className="text-slate-300">
                      Task tracking, deadline management, application organization, and progress monitoring.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="lawyer" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                  <Avatar className="w-24 h-24">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-3xl">
                      ⚖️
                    </div>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AILogo size="md" label="Your Legal Advisor" />
                    </div>
                    <p className="text-slate-300">
                      Contract review, rights protection, compliance guidance, and legal documentation.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* === PRICING === */}
      <section id="pricing" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">Free Tier</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-6">
                  $0<span className="text-sm text-slate-400">/month</span>
                </p>
                <ul className="space-y-3 mb-8 text-slate-300">
                  <li>✓ Basic job search</li>
                  <li>✓ Limited AI Buddy</li>
                  <li>✓ 3 applications/month</li>
                </ul>
                <Link href="/auth/sign-up">
                  <Button className="w-full bg-transparent" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
            <Card className="bg-gradient-to-b from-cyan-900 to-slate-800 border-cyan-500 scale-105 shadow-2xl">
              <div className="p-8">
                <Badge className="mb-4">MOST POPULAR</Badge>
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-6">
                  $29.99<span className="text-sm text-slate-400">/month</span>
                </p>
                <ul className="space-y-3 mb-8 text-white">
                  <li>✓ Unlimited applications</li>
                  <li>✓ Full AI Crew access</li>
                  <li>✓ Priority matching</li>
                  <li>✓ Document manager</li>
                </ul>
                <Link href="/auth/sign-up">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900">Upgrade Now</Button>
                </Link>
              </div>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-emerald-400 mb-6">Custom</p>
                <ul className="space-y-3 mb-8 text-slate-300">
                  <li>✓ White-label platform</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ API access</li>
                  <li>✓ SLA 99.99%</li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
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
                  <Link href="/jobs">Features</Link>
                </li>
                <li>
                  <Link href="/about">Pricing</Link>
                </li>
                <li>
                  <Link href="/about">Roadmap</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/about">Careers</Link>
                </li>
                <li>
                  <Link href="/about">Contact</Link>
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
    </>
  )
}
