"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@wearejobpilot/ui";

interface PerformanceMetrics {
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  webVitals: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
  };
  loadTest: {
    avgResponseTime: number;
    p95ResponseTime: number;
    errorRate: number;
    requestsPerSecond: number;
  };
  bundleSize: {
    total: number;
    gzipped: number;
    chunks: number;
  };
}

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lighthouse: {
      performance: 85,
      accessibility: 92,
      bestPractices: 88,
      seo: 90,
    },
    webVitals: {
      lcp: 2.1,
      fid: 45,
      cls: 0.05,
      fcp: 1.2,
      ttfb: 180,
    },
    loadTest: {
      avgResponseTime: 245,
      p95ResponseTime: 890,
      errorRate: 0.02,
      requestsPerSecond: 15.2,
    },
    bundleSize: {
      total: 1024,
      gzipped: 312,
      chunks: 8,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching performance data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getVitalColor = (value: number, thresholds: { good: number; needsImprovement: number }) => {
    if (value <= thresholds.good) return "text-green-600";
    if (value <= thresholds.needsImprovement) return "text-yellow-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-light pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading performance metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-light pt-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-cockpit mb-8">⚡ Performance Dashboard</h1>

        {/* Lighthouse Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getScoreColor(metrics.lighthouse.performance)}`}>
                {metrics.lighthouse.performance}
              </div>
              <p className="text-xs text-slate-500">Lighthouse Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getScoreColor(metrics.lighthouse.accessibility)}`}>
                {metrics.lighthouse.accessibility}
              </div>
              <p className="text-xs text-slate-500">Lighthouse Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getScoreColor(metrics.lighthouse.bestPractices)}`}>
                {metrics.lighthouse.bestPractices}
              </div>
              <p className="text-xs text-slate-500">Lighthouse Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getScoreColor(metrics.lighthouse.seo)}`}>
                {metrics.lighthouse.seo}
              </div>
              <p className="text-xs text-slate-500">Lighthouse Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Vitals */}
          <Card>
            <CardHeader>
              <CardTitle>Web Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Largest Contentful Paint</span>
                  <span className={`text-sm font-bold ${getVitalColor(metrics.webVitals.lcp, { good: 2.5, needsImprovement: 4.0 })}`}>
                    {metrics.webVitals.lcp}s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">First Input Delay</span>
                  <span className={`text-sm font-bold ${getVitalColor(metrics.webVitals.fid, { good: 100, needsImprovement: 300 })}`}>
                    {metrics.webVitals.fid}ms
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cumulative Layout Shift</span>
                  <span className={`text-sm font-bold ${getVitalColor(metrics.webVitals.cls, { good: 0.1, needsImprovement: 0.25 })}`}>
                    {metrics.webVitals.cls}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">First Contentful Paint</span>
                  <span className={`text-sm font-bold ${getVitalColor(metrics.webVitals.fcp, { good: 1.8, needsImprovement: 3.0 })}`}>
                    {metrics.webVitals.fcp}s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Time to First Byte</span>
                  <span className={`text-sm font-bold ${getVitalColor(metrics.webVitals.ttfb, { good: 600, needsImprovement: 1500 })}`}>
                    {metrics.webVitals.ttfb}ms
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Load Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Load Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg Response Time</span>
                  <span className="text-sm font-bold text-sky-600">
                    {metrics.loadTest.avgResponseTime}ms
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">P95 Response Time</span>
                  <span className="text-sm font-bold text-sky-600">
                    {metrics.loadTest.p95ResponseTime}ms
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Error Rate</span>
                  <span className={`text-sm font-bold ${metrics.loadTest.errorRate < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                    {(metrics.loadTest.errorRate * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Requests/Second</span>
                  <span className="text-sm font-bold text-sky-600">
                    {metrics.loadTest.requestsPerSecond}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bundle Analysis */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Bundle Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">
                  {(metrics.bundleSize.total / 1024).toFixed(1)} KB
                </div>
                <p className="text-sm text-gray-600">Total Bundle Size</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(metrics.bundleSize.gzipped / 1024).toFixed(1)} KB
                </div>
                <p className="text-sm text-gray-600">Gzipped Size</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {metrics.bundleSize.chunks}
                </div>
                <p className="text-sm text-gray-600">Code Chunks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600">⚠️</span>
                <div>
                  <p className="text-sm font-medium">Optimize Images</p>
                  <p className="text-xs text-gray-600">Consider using WebP format and lazy loading</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600">💡</span>
                <div>
                  <p className="text-sm font-medium">Enable Compression</p>
                  <p className="text-xs text-gray-600">Gzip compression is already enabled</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-green-600">✅</span>
                <div>
                  <p className="text-sm font-medium">Bundle Splitting</p>
                  <p className="text-xs text-gray-600">Code splitting is working well</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
