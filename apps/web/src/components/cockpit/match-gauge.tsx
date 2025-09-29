interface MatchGaugeProps {
  score: number;
  label?: string;
  showLabel?: boolean;
}

export function MatchGauge({ score, label, showLabel = true }: MatchGaugeProps) {
  const percentage = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-sky-light p-6 shadow-cockpit">
      <h3 className="text-lg font-semibold text-cockpit mb-4">Job Match Gauge</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E0F2FE"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#0284C7"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-sky-dark">{percentage}%</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-slate-600 mt-4">
        {showLabel && label ? (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            label === 'qualified' ? 'bg-green-100 text-green-800' :
            label === 'needs_followup' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {label === 'qualified' ? 'Qualified' :
             label === 'needs_followup' ? 'Needs Follow-up' :
             'Dropout'}
          </span>
        ) : (
          percentage >= 80 ? 'Excellent match!' : 
          percentage >= 60 ? 'Good match' : 
          percentage >= 40 ? 'Fair match' : 'Keep searching'
        )}
      </p>
    </div>
  );
}
