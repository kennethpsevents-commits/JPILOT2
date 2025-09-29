export default function JobsPage() {
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Amsterdam", salary: "€50k-70k" },
    { id: 2, title: "Backend Engineer", company: "DataFlow", location: "Berlin", salary: "€60k-80k" },
    { id: 3, title: "Full Stack Dev", company: "StartupXYZ", location: "Remote", salary: "€45k-65k" },
    { id: 4, title: "DevOps Specialist", company: "CloudTech", location: "London", salary: "€70k-90k" },
    { id: 5, title: "Product Manager", company: "InnovateLab", location: "Paris", salary: "€55k-75k" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Job Search ✈️</h1>
        
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                  <p className="text-green-600 font-semibold mt-2">{job.salary}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Showing 5 of 2,000+ jobs</p>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Load More Jobs
          </button>
        </div>
      </div>
    </main>
  );
}
