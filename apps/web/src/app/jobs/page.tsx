"use client";

import { useState, useEffect } from "react";
import { JobCard } from "@/components/job-card";
import { SearchFilters } from "@/components/search-filters";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackPageView, trackError } = useAnalytics();

  useEffect(() => {
    // Track page view
    trackPageView('jobs', { tier: 'buddy' });

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.results);
        setLoading(false);
      })
      .catch((error) => {
        trackError('jobs_fetch_failed', error.message);
        setLoading(false);
      });
  }, [trackPageView, trackError]);

  return (
    <main className="min-h-screen bg-sky-light pt-32">
      <section className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-cockpit mb-6">Job Search ✈️</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <SearchFilters />
          </aside>

          {/* Results */}
          <div className="md:col-span-3 space-y-4">
            {loading && <p className="text-slate-500">Loading jobs…</p>}
            {!loading && jobs.length === 0 && (
              <p className="text-slate-500">No jobs found. Try adjusting filters.</p>
            )}
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}