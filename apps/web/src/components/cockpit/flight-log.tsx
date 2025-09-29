interface FlightLogEntry {
  event: string;
  ts: string;
  status?: 'success' | 'pending' | 'failed';
}

interface SnapshotEntry {
  id: string;
  session_id: string;
  score: number;
  label: string;
  created_at: string;
}

interface UserEvent {
  id: string;
  event_type: string;
  metadata: any;
  created_at: string;
}

interface FlightLogProps {
  logs: FlightLogEntry[];
  snapshots?: SnapshotEntry[];
  events?: UserEvent[];
}

export function FlightLog({ logs, snapshots = [], events = [] }: FlightLogProps) {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'pending':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '📝';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-sky-light p-6 shadow-cockpit">
      <h3 className="text-lg font-semibold text-cockpit mb-4">Flight Log</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {/* AI Session Snapshots */}
        {snapshots.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">AI Session Results</h4>
            {snapshots.map((snapshot) => (
              <div key={snapshot.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg mb-2">
                <span className="text-lg">📸</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    Session Score: {snapshot.score}% ({snapshot.label})
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(snapshot.created_at).toLocaleString('nl-NL')}
                  </p>
                </div>
                <div className={`px-2 py-1 text-xs rounded ${
                  snapshot.score >= 70 ? 'bg-green-100 text-green-800' :
                  snapshot.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {snapshot.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* User Events */}
        {events.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Recent Activity</h4>
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg mb-2">
                <span className="text-lg">📊</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {event.event_type.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(event.created_at).toLocaleString('nl-NL')}
                  </p>
                  {event.metadata?.page && (
                    <p className="text-xs text-slate-400">
                      Page: {event.metadata.page}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regular Activity Logs */}
        {logs.length === 0 && snapshots.length === 0 && events.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            No activity yet. Start applying to jobs!
          </p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-sky-light rounded-lg">
              <span className="text-lg">{getStatusIcon(log.status)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {log.event}
                </p>
                <p className={`text-xs ${getStatusColor(log.status)}`}>
                  {new Date(log.ts).toLocaleString('nl-NL')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {logs.length > 0 && (
        <div className="mt-4 p-3 bg-cockpit text-white rounded-lg">
          <p className="text-xs font-medium">
            🚀 Keep up the momentum! Your next opportunity is just one application away.
          </p>
        </div>
      )}
    </div>
  );
}
