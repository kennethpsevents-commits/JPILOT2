import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-white shadow-cockpit fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-cockpit">WeAreJobPilot</Link>
        <div className="flex gap-6">
          <Link href="/jobs" className="hover:text-sky-dark">Jobs</Link>
          <Link href="/how-it-works" className="hover:text-sky-dark">How it Works</Link>
          <Link href="/pricing" className="hover:text-sky-dark">Pricing</Link>
          <Link href="/dashboard" className="rounded bg-sky px-4 py-2 text-white font-semibold hover:bg-sky-dark">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}
