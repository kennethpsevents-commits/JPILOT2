"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@wearejobpilot/ui";

interface AnalyticsMetrics {
  dau: number;
  upgrades: number;
  topLocale: string;
  totalEvents: number;
  conversionRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  eventTypes: Array<{ type: string; count: number }>;
}

interface UserEvent {
  id: string;
  user_id: string;
  event_type: string;
  metadata: any;
  created_at: string;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    dau: 0,
    upgrades: 0,
    topLocale: 'NL',
    totalEvents: 0,
    conversionRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    eventTypes: []
  });
  const [recentEvents, setRecentEvents] = useState<UserEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analytics data
    // In a real app, this would call your analytics API
    const fetchAnalytics = async () => {
      try {
        // Mock data for demonstration
        setMetrics({
          dau: 127,
          upgrades: 23,
          topLocale: 'NL',
          totalEvents: 1847,
          conversionRate: 12.4,
          avgSessionDuration: 4.2,
          topPages: [
            { page: '/jobs', views: 456 },
            { page: '/dashboard', views: 234 },
            { page: '/pricing', views: 123 },
            { page: '/how-it-works', views: 89 }
          ],
          eventTypes: [
            { type: 'page_view', count: 892 },
            { type: 'ai_message', count: 234 },
            { type: 'job_application', count: 156 },
            { type: 'upgrade', count: 23 },
            { type: 'error', count: 12 }
          ]
        });

        setRecentEvents([
          {
            id: '1',
            user_id: 'user-1',
            event_type: 'upgrade',
            metadata: { upgrade_from: 'buddy', upgrade_to: 'pro' },
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            user_id: 'user-2',
            event_type: 'job_application',
            metadata: { job_id: 'job-123', page: '/jobs' },
            created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
          },
          {
            id: '3',
            user_id: 'user-3',
            event_type: 'ai_message',
            metadata: { ai_persona: 'buddy', message_type: 'sent' },
            created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString()
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-light pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-light pt-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-cockpit mb-8">📊 Analytics Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Daily Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sky">{metrics.dau}</div>
              <p className="text-xs text-green-600">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upgrades Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{metrics.upgrades}</div>
              <p className="text-xs text-slate-500">€{metrics.upgrades * 19} revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{metrics.conversionRate}%</div>
              <p className="text-xs text-slate-500">Free to paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Session Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{metrics.avgSessionDuration}m</div>
              <p className="text-xs text-slate-500">Per user session</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.topPages.map((page, index) => (
                  <div key={page.page} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{page.page}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-sky h-2 rounded-full" 
                          style={{ width: `${(page.views / metrics.topPages[0].views) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{page.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Types */}
          <Card>
            <CardHeader>
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.eventTypes.map((event) => (
                  <div key={event.type} className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">
                      {event.type.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">{event.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">
                      {event.event_type.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      User {event.user_id.slice(-4)}
                    </p>
                    {event.metadata && (
                      <p className="text-xs text-gray-500">
                        {JSON.stringify(event.metadata, null, 2)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(event.created_at).toLocaleTimeString('nl-NL')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(event.created_at).toLocaleDateString('nl-NL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
