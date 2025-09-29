'use client';

import { useEffect, useState } from 'react';
import { Button } from '@wearejobpilot/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@wearejobpilot/ui';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: string;
  region: string;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  tier: string;
  status: string;
  started_at: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

interface Referral {
  id: string;
  inviter_id: string;
  invitee_id: string;
  reward_days: number;
  created_at: string;
}

interface PaddleEvent {
  id: string;
  event_type: string;
  user_id: string;
  subscription_id?: string;
  status: string;
  created_at: string;
}

interface ReferralData {
  id: string;
  invitee_email: string;
  status: string;
  reward_days: number;
  created_at: string;
}

interface FallbackData {
  id: string;
  session_id: string;
  trigger_type: string;
  trigger_value: string;
  fallback_action?: string;
  new_session_id?: string;
  created_at: string;
}

interface SnapshotData {
  id: string;
  session_id: string;
  user_id: string;
  score: number;
  label: string;
  created_at: string;
}

interface LegalPackData {
  id: string;
  country: string;
  content: any;
  loaded_at: string;
  expires_at: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralData, setReferralData] = useState<ReferralData[]>([]);
  const [paddleEvents, setPaddleEvents] = useState<PaddleEvent[]>([]);
  const [fallbackData, setFallbackData] = useState<FallbackData[]>([]);
  const [snapshotData, setSnapshotData] = useState<SnapshotData[]>([]);
  const [legalPackData, setLegalPackData] = useState<LegalPackData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'subscriptions' | 'referrals' | 'events' | 'fallbacks' | 'snapshots' | 'legal'>('users');
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>('all');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // TODO: Add admin role check in production
        // For now, we'll load dummy data
        setUsers([
          { id: '1', email: 'test@demo.com', role: 'buddy', region: 'NL', created_at: '2024-01-15' },
          { id: '2', email: 'user2@demo.com', role: 'coach', region: 'DE', created_at: '2024-01-14' },
          { id: '3', email: 'user3@demo.com', role: 'buddy', region: 'PL', created_at: '2024-01-13' },
        ]);

        setSubscriptions([
          { id: '1', user_id: '1', tier: 'buddy', status: 'active', started_at: '2024-01-15', expires_at: '2024-02-15', created_at: '2024-01-15', updated_at: '2024-01-15' },
          { id: '2', user_id: '2', tier: 'coach', status: 'active', started_at: '2024-01-14', expires_at: '2024-02-14', created_at: '2024-01-14', updated_at: '2024-01-14' },
          { id: '3', user_id: '3', tier: 'buddy', status: 'canceled', started_at: '2024-01-13', expires_at: '2024-02-13', created_at: '2024-01-13', updated_at: '2024-01-20' },
          { id: '4', user_id: '4', tier: 'manager', status: 'active', started_at: '2024-01-12', expires_at: '2024-02-12', created_at: '2024-01-12', updated_at: '2024-01-12' },
          { id: '5', user_id: '5', tier: 'lawyer', status: 'paused', started_at: '2024-01-11', expires_at: '2024-02-11', created_at: '2024-01-11', updated_at: '2024-01-18' },
        ]);

        setPaddleEvents([
          { id: '1', event_type: 'subscription.created', user_id: '1', subscription_id: '1', status: 'active', created_at: '2024-01-15' },
          { id: '2', event_type: 'subscription.updated', user_id: '2', subscription_id: '2', status: 'active', created_at: '2024-01-14' },
          { id: '3', event_type: 'subscription.canceled', user_id: '3', subscription_id: '3', status: 'canceled', created_at: '2024-01-20' },
          { id: '4', event_type: 'transaction.completed', user_id: '4', subscription_id: '4', status: 'active', created_at: '2024-01-12' },
          { id: '5', event_type: 'subscription.paused', user_id: '5', subscription_id: '5', status: 'paused', created_at: '2024-01-18' },
        ]);

        setReferrals([
          { id: '1', inviter_id: '1', invitee_id: '2', reward_days: 10, created_at: '2024-01-14' },
          { id: '2', inviter_id: '2', invitee_id: '3', reward_days: 10, created_at: '2024-01-13' },
        ]);

        setReferralData([
          { id: '1', invitee_email: 'friend1@example.com', status: 'pending', reward_days: 10, created_at: '2024-01-15' },
          { id: '2', invitee_email: 'friend2@example.com', status: 'accepted', reward_days: 10, created_at: '2024-01-14' },
          { id: '3', invitee_email: 'friend3@example.com', status: 'expired', reward_days: 10, created_at: '2024-01-10' },
        ]);

        setFallbackData([
          { id: '1', session_id: 'session-1', trigger_type: 'keyword', trigger_value: 'error', fallback_action: 'switch_ai', new_session_id: 'session-2', created_at: '2024-01-15' },
          { id: '2', session_id: 'session-3', trigger_type: 'keyword', trigger_value: 'help', fallback_action: 'upgrade', new_session_id: 'session-4', created_at: '2024-01-14' },
          { id: '3', session_id: 'session-5', trigger_type: 'keyword', trigger_value: 'broken', fallback_action: 'dashboard', new_session_id: 'session-6', created_at: '2024-01-13' },
        ]);

        setSnapshotData([
          { id: '1', session_id: 'session-1', user_id: '1', score: 85, label: 'qualified', created_at: '2024-01-15' },
          { id: '2', session_id: 'session-2', user_id: '2', score: 45, label: 'needs_followup', created_at: '2024-01-14' },
          { id: '3', session_id: 'session-3', user_id: '3', score: 25, label: 'dropout', created_at: '2024-01-13' },
          { id: '4', session_id: 'session-4', user_id: '1', score: 92, label: 'qualified', created_at: '2024-01-12' },
          { id: '5', session_id: 'session-5', user_id: '4', score: 38, label: 'dropout', created_at: '2024-01-11' },
        ]);

        setLegalPackData([
          { id: '1', country: 'NL', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
          { id: '2', country: 'DE', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
          { id: '3', country: 'PL', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
          { id: '4', country: 'FR', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
          { id: '5', country: 'ES', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
          { id: '6', country: 'IT', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
          { id: '7', country: 'UK', content: { meta: { last_updated: '2025-01-29' } }, loaded_at: '2025-01-29', expires_at: '2025-02-28' },
        ]);

      } catch (err) {
        setError('Failed to load admin data');
        console.error('Admin data error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, [supabase.auth, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🛠 Owner Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Beheer gebruikers, abonnementen en referrals
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push('/admin/analytics')}>
                📊 Analytics
              </Button>
              <Button variant="outline" onClick={() => router.push('/admin/performance')}>
                ⚡ Performance
              </Button>
              <Button variant="outline" onClick={() => router.push('/admin/conversion')}>
                🎯 Conversion
              </Button>
              <Button variant="outline" onClick={() => router.push('/admin/qa')}>
                🐛 QA & Bugs
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                Terug naar Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-8 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Totaal Gebruikers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Actieve Abonnementen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions.filter(s => s.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Premium Gebruikers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions.filter(s => s.status === 'active' && ['coach', 'manager', 'lawyer'].includes(s.tier)).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Paddle Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paddleEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI Fallbacks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fallbackData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI Snapshots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{snapshotData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Legal Packs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{legalPackData.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'users', name: 'Gebruikers', count: users.length },
                { id: 'subscriptions', name: 'Abonnementen', count: subscriptions.length },
                { id: 'referrals', name: 'Referrals', count: referralData.length },
                { id: 'events', name: 'Paddle Events', count: paddleEvents.length },
                { id: 'fallbacks', name: 'AI Fallbacks', count: fallbackData.length },
                { id: 'snapshots', name: 'AI Snapshots', count: snapshotData.length },
                { id: 'legal', name: 'Legal Packs', count: legalPackData.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle>Gebruikers</CardTitle>
              <CardDescription>
                Overzicht van alle geregistreerde gebruikers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-gray-600">
                        {user.role} • {user.region} • {new Date(user.created_at).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'coach' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'manager' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'lawyer' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'subscriptions' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Abonnementen</CardTitle>
                  <CardDescription>
                    Overzicht van alle abonnementen en hun status
                  </CardDescription>
                </div>
                <select
                  value={subscriptionFilter}
                  onChange={(e) => setSubscriptionFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">Alle Status</option>
                  <option value="active">Actief</option>
                  <option value="canceled">Geannuleerd</option>
                  <option value="paused">Gepauzeerd</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions
                  .filter(sub => subscriptionFilter === 'all' || sub.status === subscriptionFilter)
                  .map((sub) => (
                    <div key={sub.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">User {sub.user_id}</p>
                        <p className="text-sm text-gray-600">
                          {sub.tier} • {new Date(sub.started_at).toLocaleDateString('nl-NL')}
                          {sub.expires_at && ` • Verloopt: ${new Date(sub.expires_at).toLocaleDateString('nl-NL')}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          sub.tier === 'buddy' ? 'bg-green-100 text-green-800' :
                          sub.tier === 'coach' ? 'bg-blue-100 text-blue-800' :
                          sub.tier === 'manager' ? 'bg-purple-100 text-purple-800' :
                          sub.tier === 'lawyer' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sub.tier}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          sub.status === 'active' ? 'bg-green-100 text-green-800' :
                          sub.status === 'canceled' ? 'bg-red-100 text-red-800' :
                          sub.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'referrals' && (
          <Card>
            <CardHeader>
              <CardTitle>Referrals</CardTitle>
              <CardDescription>
                Overzicht van alle referral activiteit en uitnodigingen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralData.map((ref) => (
                  <div key={ref.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{ref.invitee_email}</p>
                      <p className="text-sm text-gray-600">
                        {ref.reward_days} dagen beloning • {new Date(ref.created_at).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        ref.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        ref.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ref.status}
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                        +{ref.reward_days} dagen
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'events' && (
          <Card>
            <CardHeader>
              <CardTitle>Paddle Events</CardTitle>
              <CardDescription>
                Overzicht van alle Paddle webhook events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paddleEvents.map((event) => (
                  <div key={event.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{event.event_type}</p>
                      <p className="text-sm text-gray-600">
                        User {event.user_id} • {event.subscription_id && `Sub ${event.subscription_id} • `}
                        {new Date(event.created_at).toLocaleDateString('nl-NL')} {new Date(event.created_at).toLocaleTimeString('nl-NL')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        event.event_type.includes('created') ? 'bg-green-100 text-green-800' :
                        event.event_type.includes('updated') ? 'bg-blue-100 text-blue-800' :
                        event.event_type.includes('canceled') ? 'bg-red-100 text-red-800' :
                        event.event_type.includes('paused') ? 'bg-yellow-100 text-yellow-800' :
                        event.event_type.includes('completed') ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'fallbacks' && (
          <Card>
            <CardHeader>
              <CardTitle>AI Fallbacks</CardTitle>
              <CardDescription>
                Overzicht van alle AI fallback triggers en handovers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fallbackData.map((fallback) => (
                  <div key={fallback.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Session {fallback.session_id}</p>
                      <p className="text-sm text-gray-600">
                        Trigger: "{fallback.trigger_value}" • Type: {fallback.trigger_type}
                        {fallback.new_session_id && ` • New Session: ${fallback.new_session_id}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(fallback.created_at).toLocaleDateString('nl-NL')} {new Date(fallback.created_at).toLocaleTimeString('nl-NL')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-800">
                        {fallback.trigger_type}
                      </span>
                      {fallback.new_session_id && (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          Handover
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'snapshots' && (
          <Card>
            <CardHeader>
              <CardTitle>AI Snapshots</CardTitle>
              <CardDescription>
                Overzicht van alle AI sessie resultaten en scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {snapshotData.map((snapshot) => (
                  <div key={snapshot.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">User {snapshot.user_id} • Session {snapshot.session_id}</p>
                      <p className="text-sm text-gray-600">
                        Score: {snapshot.score}% • Label: {snapshot.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(snapshot.created_at).toLocaleDateString('nl-NL')} {new Date(snapshot.created_at).toLocaleTimeString('nl-NL')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        snapshot.score >= 70 ? 'bg-green-100 text-green-800' :
                        snapshot.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {snapshot.score}%
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        snapshot.label === 'qualified' ? 'bg-green-100 text-green-800' :
                        snapshot.label === 'needs_followup' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {snapshot.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'legal' && (
          <Card>
            <CardHeader>
              <CardTitle>Legal Packs</CardTitle>
              <CardDescription>
                Overzicht van alle juridische informatie per land
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {legalPackData.map((pack) => {
                  const isExpired = new Date(pack.expires_at) < new Date();
                  const daysUntilExpiry = Math.ceil((new Date(pack.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={pack.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{pack.country} Legal Pack</p>
                        <p className="text-sm text-gray-600">
                          Loaded: {new Date(pack.loaded_at).toLocaleDateString('nl-NL')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Expires: {new Date(pack.expires_at).toLocaleDateString('nl-NL')}
                          {isExpired ? ' (EXPIRED)' : ` (${daysUntilExpiry} days left)`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          isExpired ? 'bg-red-100 text-red-800' :
                          daysUntilExpiry <= 7 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {isExpired ? 'Expired' : 
                           daysUntilExpiry <= 7 ? 'Expires Soon' : 'Current'}
                        </span>
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                          {pack.country}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
