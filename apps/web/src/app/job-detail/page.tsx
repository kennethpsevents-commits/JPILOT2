import { notFound } from "next/navigation";
import { LegalInsights } from "@/components/legal-insights";

async function getJob(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?id=${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.results?.[0] || data; // Handle both single job and array response
}

async function getUserTier(): Promise<string> {
  // This would normally check the user's subscription tier
  // For now, return 'pro' to show legal insights
  return 'pro';
}

export default async function JobDetail({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) return notFound();
  
  const userTier = await getUserTier();
  
  // Extract country from location (simple approach)
  const location = job.location || '';
  const country = location.split(',').pop()?.trim() || 'NL';

  return (
    <main className="min-h-screen bg-white pt-32">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-cockpit">{job.title}</h1>
        <p className="text-lg text-slate-600">{job.company} — {job.location}</p>

        {job.description ? (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">What we want from you</h2>
            <ul className="list-disc ml-6">{job.description.what_we_want.map((d:string) => <li key={d}>{d}</li>)}</ul>
            <h2 className="text-xl font-semibold">What we offer</h2>
            <ul className="list-disc ml-6">{job.description.what_we_offer.map((o:string) => <li key={o}>{o}</li>)}</ul>
          </div>
        ) : (
          <div className="mt-6 p-6 border-2 border-dashed border-sky text-center rounded-xl">
            <p className="mb-4">Upgrade to see full job details 🚀</p>
            <a href="/pricing" className="rounded bg-sky px-4 py-2 text-white hover:bg-sky-dark">
              See Plans
            </a>
          </div>
        )}

        {job.ai_match_score && (
          <div className="mt-6 bg-sky-light p-4 rounded-xl">
            <p className="font-semibold">AI Match Score: {job.ai_match_score}%</p>
            <p className="text-slate-600">{job.application_tips}</p>
          </div>
        )}

        {/* Legal Insights - Only for Pro tier */}
        <LegalInsights country={country} userTier={userTier} />
      </div>
    </main>
  );
}