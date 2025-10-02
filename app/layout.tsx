import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "WeAreJobPilot – AI Job Hunter & Career Copilot",
  description:
    "Your AI-powered copilot for career navigation. Upload your CV, get AI-powered edits, and apply to jobs faster.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <div className="fixed top-4 left-6 z-50 flex items-center gap-3 group" role="banner">
          <Link href="/" className="flex items-center gap-3" aria-label="WeAreJobPilot Home">
            <Image
              src="/logo.jpg"
              alt="JobPilot Logo"
              width={32}
              height={32}
              className="h-8 w-8 group-hover:opacity-80 transition-opacity"
              priority
            />
            <span className="text-base font-semibold tracking-tight text-foreground">
              we are <span className="text-primary">JOBPILOT</span>.
            </span>
          </Link>
        </div>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
