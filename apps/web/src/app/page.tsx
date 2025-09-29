export default function HomePage() {
  return (
    <main className="min-h-screen bg-sky-light">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sky-light to-white pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold tracking-tight text-cockpit">
            Pilot your <span className="text-sky-dark">AI Career</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Your personal AI Flight Scout for job matching, CV tailoring, and automated applications.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/signup"
               className="rounded-lg bg-sky px-6 py-3 font-semibold text-white shadow hover:bg-sky-dark">
              Get your Boarding Pass
            </a>
            <a href="/jobs"
               className="rounded-lg border border-sky px-6 py-3 font-semibold text-sky hover:bg-sky-light">
              Start Searching
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
