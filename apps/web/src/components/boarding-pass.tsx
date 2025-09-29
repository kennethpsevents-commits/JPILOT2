export function BoardingPass({ username }: { username: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/boarding-pass/${username}`
  return (
    <div className="rounded-xl border-2 border-dashed border-sky p-6 shadow-cockpit bg-white">
      <h3 className="text-xl font-bold mb-2">Your Boarding Pass</h3>
      <p className="text-slate-600 mb-4">
        Share this ticket with friends. Each signup = +10 days premium.
      </p>
      <div className="flex items-center justify-between bg-sky-light p-4 rounded-lg">
        <span className="font-mono text-sky-dark">{url}</span>
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="rounded bg-sky px-3 py-1 text-white hover:bg-sky-dark"
        >
          Copy
        </button>
      </div>
    </div>
  )
}
