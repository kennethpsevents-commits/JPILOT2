"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@wearejobpilot/ui";

interface ABTestData {
  id: string;
  name: string;
  variant: string;
  outcome: string | null;
  created_at: string;
}

interface FunnelMetrics {
  stageCounts: Record<string, number>;
  conversionRate: number;
  totalEvents: number;
}

interface ConversionData {
  abTests: ABTestData[];
  funnelMetrics: FunnelMetrics;
}

export default function ConversionPage() {
  const [data, setData] = useState<ConversionData>({
    abTests: [],
    funnelMetrics: { stageCounts: {}, conversionRate: 0, totalEvents: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [abTestsRes, funnelRes] = await Promise.all([
          fetch("/api/abtest"),
          fetch("/api/funnel")
        ]);

        const abTests = await abTestsRes.json();
        const funnelData = await funnelRes.json();

        setData({
          abTests: abTests.tests || [],
          funnelMetrics: funnelData.metrics || { stageCounts: {}, conversionRate: 0, totalEvents: 0 }
        });
      } catch (error) {
        console.error("Error fetching conversion data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-cockpit mb-8">Conversion Analytics</h1>
          <p>Loading conversion data...</p>
        </div>
      </div>
    );
  }

  // Calculate A/B test metrics
  const testMetrics = data.abTests.reduce((acc, test) => {
    if (!acc[test.name]) {
      acc[test.name] = { A: 0, B: 0, conversions: { A: 0, B: 0 } };
    }
    acc[test.name][test.variant as 'A' | 'B']++;
    if (test.outcome === 'conversion' || test.outcome === 'upgrade') {
      acc[test.name].conversions[test.variant as 'A' | 'B']++;
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-cockpit mb-8">Conversion Analytics 📊</h1>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold text-green-600">
                {data.funnelMetrics.conversionRate}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-blue-600">
                {data.funnelMetrics.totalEvents}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Active Tests</h3>
              <p className="text-3xl font-bold text-purple-600">
                {Object.keys(testMetrics).length}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cockpit mb-2">Pricing Views</h3>
              <p className="text-3xl font-bold text-orange-600">
                {data.funnelMetrics.stageCounts.pricing_view || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Stages */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Funnel Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.funnelMetrics.stageCounts).map(([stage, count]) => (
                <div key={stage} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium capitalize">
                    {stage.replace(/_/g, ' ')}
                  </span>
                  <span className="text-2xl font-bold text-cockpit">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* A/B Test Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>A/B Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(testMetrics).map(([testName, metrics]) => {
                const totalA = metrics.A;
                const totalB = metrics.B;
                const conversionsA = metrics.conversions.A;
                const conversionsB = metrics.conversions.B;
                const rateA = totalA > 0 ? (conversionsA / totalA * 100).toFixed(1) : 0;
                const rateB = totalB > 0 ? (conversionsB / totalB * 100).toFixed(1) : 0;
                const winner = parseFloat(rateA) > parseFloat(rateB) ? 'A' : 'B';

                return (
                  <div key={testName} className="border rounded-lg p-4">
                    <h4 className="font-bold text-lg mb-4 capitalize">
                      {testName.replace(/_/g, ' ')}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${winner === 'A' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                        <h5 className="font-semibold">Variant A</h5>
                        <p className="text-sm text-gray-600">Users: {totalA}</p>
                        <p className="text-sm text-gray-600">Conversions: {conversionsA}</p>
                        <p className="text-lg font-bold text-green-600">{rateA}%</p>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${winner === 'B' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                        <h5 className="font-semibold">Variant B</h5>
                        <p className="text-sm text-gray-600">Users: {totalB}</p>
                        <p className="text-sm text-gray-600">Conversions: {conversionsB}</p>
                        <p className="text-lg font-bold text-green-600">{rateB}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      Winner: <span className="font-bold text-green-600">Variant {winner}</span>
                      {winner === 'A' && parseFloat(rateA) > parseFloat(rateB) && (
                        <span> (+{((parseFloat(rateA) - parseFloat(rateB)) / parseFloat(rateB) * 100).toFixed(1)}% improvement)</span>
                      )}
                      {winner === 'B' && parseFloat(rateB) > parseFloat(rateA) && (
                        <span> (+{((parseFloat(rateB) - parseFloat(rateA)) / parseFloat(rateA) * 100).toFixed(1)}% improvement)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent A/B Test Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent A/B Test Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.abTests.slice(0, 10).map((test) => (
                <div key={test.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{test.name}</span>
                    <span className="text-gray-500 ml-2">Variant {test.variant}</span>
                    {test.outcome && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {test.outcome}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(test.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
