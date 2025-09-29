export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          WeAreJobPilot ✈️
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your AI-powered career co-pilot for stress-free job searching
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">🎯 Buddy AI</h3>
            <p>Personalized job matching with AI onboarding</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">🔍 Smart Search</h3>
            <p>Find jobs tailored to your skills and preferences</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">📈 Growth Tools</h3>
            <p>CV optimization and application automation</p>
          </div>
        </div>

        <div className="space-y-4">
          <a 
            href="/jobs" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 mr-4"
          >
            Start Job Search
          </a>
          <a 
            href="/pricing" 
            className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            View Pricing
          </a>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>🚀 Lightweight Development Version - Ready for Production</p>
        </div>
      </div>
    </main>
  );
}
