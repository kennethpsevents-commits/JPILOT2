export function JobCard({ job }: { job: any }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-sky bg-white p-4 shadow-cockpit">
      <h3 className="text-xl font-semibold text-cockpit">{job.title}</h3>
      <p className="text-slate-600">{job.company} — {job.location}</p>

      {job.salary_min && (
        <p className="text-slate-500 mt-2">
          €{job.salary_min} – €{job.salary_max}
        </p>
      )}

      {!job.description && (
        <div className="mt-3 text-center text-sm text-slate-500">
          <p>Upgrade to see full job details ✈️</p>
        </div>
      )}
    </div>
  );
}