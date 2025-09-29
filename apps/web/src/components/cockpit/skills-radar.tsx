interface SkillsRadarProps {
  skills: string[];
}

export function SkillsRadar({ skills }: SkillsRadarProps) {
  return (
    <div className="bg-white rounded-xl border border-sky-light p-6 shadow-cockpit">
      <h3 className="text-lg font-semibold text-cockpit mb-4">Skills Radar</h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={skill} className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{skill}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-sky-light rounded-full h-2">
                <div 
                  className="bg-sky h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(85 + (index * 5), 100)}%`,
                    transitionDelay: `${index * 200}ms`
                  }}
                />
              </div>
              <span className="text-xs text-slate-500 w-8">
                {Math.min(85 + (index * 5), 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-sky-light rounded-lg">
        <p className="text-xs text-sky-dark font-medium">
          💡 Focus on improving your weakest skills for better matches
        </p>
      </div>
    </div>
  );
}
