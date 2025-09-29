"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@wearejobpilot/ui";

interface Bug {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed' | 'wont_fix';
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  severity: 'critical' | 'high' | 'medium' | 'low';
  component: string;
  reporter: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  steps_to_reproduce?: string[];
  expected_result?: string;
  actual_result?: string;
}

interface QAMetrics {
  totalBugs: number;
  openBugs: number;
  criticalBugs: number;
  resolvedThisWeek: number;
  avgResolutionTime: number;
}

export default function QAPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [metrics, setMetrics] = useState<QAMetrics>({
    totalBugs: 0,
    openBugs: 0,
    criticalBugs: 0,
    resolvedThisWeek: 0,
    avgResolutionTime: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'critical'>('all');

  useEffect(() => {
    // Simulate fetching bugs from API
    const mockBugs: Bug[] = [
      {
        id: "BUG-001",
        title: "Job search returns no results on mobile",
        description: "When searching for jobs on mobile devices, the search returns empty results even when jobs exist.",
        status: "open",
        priority: "P1",
        severity: "high",
        component: "Job Search",
        reporter: "QA Team",
        created_at: "2025-01-15T10:30:00Z",
        updated_at: "2025-01-15T10:30:00Z",
        steps_to_reproduce: [
          "Open website on mobile device",
          "Navigate to /jobs",
          "Enter search term 'engineer'",
          "Click search button"
        ],
        expected_result: "Should return job listings",
        actual_result: "Returns empty results"
      },
      {
        id: "BUG-002",
        title: "A/B test variant not persisting across page refreshes",
        description: "Users see different A/B test variants when refreshing the pricing page.",
        status: "in_progress",
        priority: "P2",
        severity: "medium",
        component: "A/B Testing",
        reporter: "Product Team",
        assigned_to: "Dev Team",
        created_at: "2025-01-14T14:20:00Z",
        updated_at: "2025-01-15T09:15:00Z"
      },
      {
        id: "BUG-003",
        title: "Admin dashboard slow to load with large datasets",
        description: "Admin dashboard takes more than 5 seconds to load when there are many users.",
        status: "open",
        priority: "P2",
        severity: "medium",
        component: "Admin Dashboard",
        reporter: "Admin User",
        created_at: "2025-01-13T16:45:00Z",
        updated_at: "2025-01-13T16:45:00Z"
      },
      {
        id: "BUG-004",
        title: "Legal packs showing [UNCERTAIN] status incorrectly",
        description: "Legal packs are showing [UNCERTAIN] status even when they should be valid.",
        status: "closed",
        priority: "P3",
        severity: "low",
        component: "Legal Packs",
        reporter: "Legal Team",
        assigned_to: "Dev Team",
        created_at: "2025-01-12T11:30:00Z",
        updated_at: "2025-01-14T15:20:00Z"
      }
    ];

    setBugs(mockBugs);
    
    // Calculate metrics
    const totalBugs = mockBugs.length;
    const openBugs = mockBugs.filter(b => b.status === 'open').length;
    const criticalBugs = mockBugs.filter(b => b.priority === 'P1').length;
    const resolvedThisWeek = mockBugs.filter(b => 
      b.status === 'closed' && 
      new Date(b.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    
    setMetrics({
      totalBugs,
      openBugs,
      criticalBugs,
      resolvedThisWeek,
      avgResolutionTime: 2.5 // Mock data
    });
    
    setLoading(false);
  }, []);

  const filteredBugs = bugs.filter(bug => {
    if (filter === 'open') return bug.status === 'open';
    if (filter === 'critical') return bug.priority === 'P1';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-orange-100 text-orange-800';
      case 'P3': return 'bg-yellow-100 text-yellow-800';
      case 'P4': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'wont_fix': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-cockpit mb-8">QA & Bug Triage</h1>
          <p>Loading bug data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-cockpit mb-8">QA & Bug Triage 🐛</h1>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Total Bugs</h3>
              <p className="text-3xl font-bold text-blue-600">{metrics.totalBugs}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Open Bugs</h3>
              <p className="text-3xl font-bold text-red-600">{metrics.openBugs}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Critical (P1)</h3>
              <p className="text-3xl font-bold text-red-600">{metrics.criticalBugs}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Resolved This Week</h3>
              <p className="text-3xl font-bold text-green-600">{metrics.resolvedThisWeek}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Avg Resolution</h3>
              <p className="text-3xl font-bold text-purple-600">{metrics.avgResolutionTime}d</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              All Bugs
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'open' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Open Only
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'critical' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Critical Only
            </button>
          </div>
        </div>

        {/* Bug List */}
        <div className="space-y-4">
          {filteredBugs.map((bug) => (
            <Card key={bug.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-cockpit">{bug.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(bug.priority)}`}>
                        {bug.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(bug.status)}`}>
                        {bug.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{bug.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Component: {bug.component}</span>
                      <span>Reporter: {bug.reporter}</span>
                      {bug.assigned_to && <span>Assigned: {bug.assigned_to}</span>}
                      <span>Created: {new Date(bug.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {bug.steps_to_reproduce && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Steps to Reproduce:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {bug.steps_to_reproduce.map((step, index) => (
                        <li key={index} className="text-sm">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                    Resolve
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
                    Assign
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
