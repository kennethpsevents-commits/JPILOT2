'use client';

import { useState, useEffect } from 'react';

interface LegalInsightsProps {
  country: string;
  userTier: string;
}

interface LegalData {
  meta: {
    country: string;
    last_updated: string;
    ttl_days: number;
    disclaimer: string;
    status: string;
    expired?: boolean;
    expired_at?: string;
  };
  employment: {
    contract_types: string[];
    notice_periods: {
      standard: string;
      probation: string;
      senior?: string;
    };
    vacation_days: string;
    sick_leave: string;
    working_hours: string;
    overtime: string;
    termination: string[];
    benefits: string[];
  };
  remote_work: {
    regulations: string[];
    tax_implications: string[];
  };
  compliance: {
    required_documents: string[];
    data_protection: string;
    health_safety: string;
  };
}

export function LegalInsights({ country, userTier }: LegalInsightsProps) {
  const [data, setData] = useState<LegalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userTier !== 'pro') return;

    const fetchLegalData = async () => {
      try {
        const response = await fetch(`/api/legal/${country}`);
        if (!response.ok) {
          throw new Error('Failed to fetch legal data');
        }
        const legalData = await response.json();
        setData(legalData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLegalData();
  }, [country, userTier]);

  if (userTier !== 'pro') {
    return (
      <div className="border-t mt-6 pt-4">
        <div className="bg-gradient-to-r from-sky-light to-blue-50 p-6 rounded-xl border-2 border-dashed border-sky">
          <h3 className="text-lg font-bold text-cockpit mb-2">⚖️ Legal Insights</h3>
          <p className="text-slate-600 mb-4">
            Upgrade to Pro tier to unlock detailed legal insights for this job location.
          </p>
          <a 
            href="/pricing" 
            className="inline-flex items-center px-4 py-2 bg-sky text-white rounded-lg hover:bg-sky-dark transition-colors"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border-t mt-6 pt-4">
        <h3 className="text-lg font-bold text-cockpit mb-2">⚖️ Legal Insights</h3>
        <p className="text-slate-500">Loading legal information...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border-t mt-6 pt-4">
        <h3 className="text-lg font-bold text-cockpit mb-2">⚖️ Legal Insights</h3>
        <p className="text-red-500">Error loading legal information: {error}</p>
      </div>
    );
  }

  return (
    <div className="border-t mt-6 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-cockpit">⚖️ Legal Insights</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{data.meta.country}</span>
          <span className={`px-2 py-1 text-xs rounded ${
            data.meta.status === 'CURRENT' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {data.meta.status}
          </span>
        </div>
      </div>

      {data.meta.expired && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <p className="text-orange-800 text-sm">
            ⚠️ Deze informatie kan verouderd zijn (verlopen op {new Date(data.meta.expired_at!).toLocaleDateString('nl-NL')}).
          </p>
        </div>
      )}

      <p className="text-sm text-slate-600 mb-4">{data.meta.disclaimer}</p>

      <div className="space-y-6">
        {/* Employment Information */}
        <div className="bg-sky-light p-4 rounded-lg">
          <h4 className="font-semibold text-cockpit mb-3">📋 Employment Details</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-slate-700">Contract Types:</p>
              <ul className="list-disc list-inside text-slate-600">
                {data.employment.contract_types.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-700">Notice Periods:</p>
              <ul className="text-slate-600 space-y-1">
                <li>Standard: {data.employment.notice_periods.standard}</li>
                <li>Probation: {data.employment.notice_periods.probation}</li>
                {data.employment.notice_periods.senior && (
                  <li>Senior: {data.employment.notice_periods.senior}</li>
                )}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-700">Vacation:</p>
              <p className="text-slate-600">{data.employment.vacation_days}</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Sick Leave:</p>
              <p className="text-slate-600">{data.employment.sick_leave}</p>
            </div>
          </div>
        </div>

        {/* Remote Work */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-cockpit mb-3">🏠 Remote Work</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-slate-700">Regulations:</p>
              <ul className="list-disc list-inside text-slate-600">
                {data.remote_work.regulations.map((regulation, index) => (
                  <li key={index}>{regulation}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-700">Tax Implications:</p>
              <ul className="list-disc list-inside text-slate-600">
                {data.remote_work.tax_implications.map((tax, index) => (
                  <li key={index}>{tax}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-cockpit mb-3">📄 Compliance</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-slate-700">Required Documents:</p>
              <ul className="list-disc list-inside text-slate-600">
                {data.compliance.required_documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-700">Data Protection:</p>
              <p className="text-slate-600">{data.compliance.data_protection}</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Health & Safety:</p>
              <p className="text-slate-600">{data.compliance.health_safety}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
