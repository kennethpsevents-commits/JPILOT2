export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-sky-light pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-cockpit mb-6">How It Works ✈️</h1>
        <p className="text-lg text-slate-700 mb-12">
          Finding a job with WeAreJobPilot is as smooth as a flight plan. Here's your journey:
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-cockpit p-6 rounded-xl">
            <h3 className="font-bold text-xl mb-2">1. Onboard</h3>
            <p>Answer a few quick questions with Buddy AI to set your flight path.</p>
          </div>
          <div className="bg-white shadow-cockpit p-6 rounded-xl">
            <h3 className="font-bold text-xl mb-2">2. Discover</h3>
            <p>See job matches tailored to your skills, preferences, and location.</p>
          </div>
          <div className="bg-white shadow-cockpit p-6 rounded-xl">
            <h3 className="font-bold text-xl mb-2">3. Apply</h3>
            <p>Use AI tools to tailor your CV and apply with confidence—fast and stress-free.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
