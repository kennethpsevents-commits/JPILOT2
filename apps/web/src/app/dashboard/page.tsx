"use client";

import { useEffect } from "react";
import { MatchGauge, SkillsRadar, FlightLog } from "@/components/cockpit"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function DashboardPage() {
  const { trackPageView, events, fetchEvents } = useAnalytics();

  useEffect(() => {
    trackPageView('dashboard', { tier: 'buddy' });
    fetchEvents(20); // Fetch last 20 events
  }, [trackPageView, fetchEvents]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-cockpit mb-6">Cockpit Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MatchGauge score={82} />
          <SkillsRadar skills={["React", "TypeScript", "SQL"]} />
          <FlightLog 
            logs={[{ event: "Applied to Job #123", ts: "2025-09-29" }]} 
            snapshots={[]}
            events={events}
          />
        </div>
      </div>
    </div>
  )
}