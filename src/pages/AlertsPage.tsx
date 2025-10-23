import React, { useEffect, useState } from 'react';
import type { Alert, AlertStatus } from '../types';
import { Severity } from '../types';
import AlertList from '../components/alerts/AlertList';
import { Loader2, AlertCircle, ShieldAlert } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_ALERTS: Alert[] = [
  {
    id: 1,
    employee_id: 101,
    activity_id: 1,
    description: 'Sensitive file download: C:\\Confidential\\client_list.csv',
    severity: Severity.CRITICAL,
    risk_score: 0.95,
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'OPEN',
    employee: { id: 101, name: 'John Doe', email: 'john.doe@c.com' },
  },
  {
    id: 2,
    employee_id: 101,
    activity_id: 3,
    description: 'Multiple failed login attempts (5) in 10 minutes',
    severity: Severity.HIGH,
    risk_score: 0.8,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'OPEN',
    employee: { id: 101, name: 'John Doe', email: 'john.doe@c.com' },
  },
  {
    id: 3,
    employee_id: 102,
    activity_id: null,
    description: 'Unusual after-hours activity detected',
    severity: Severity.MEDIUM,
    risk_score: 0.6,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: 'RESOLVED',
    employee: { id: 102, name: 'Jane Smith', email: 'jane.smith@c.com' },
  },
];
// --- END MOCK DATA ---

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        
        // --- USE THIS CODE WHEN YOUR BACKEND IS READY ---
        // const response = await alertService.getAlerts();
        // setAlerts(response.alerts);
        // ------------------------------------------------
        
        // --- USING MOCK DATA FOR NOW ---
        await new Promise(resolve => setTimeout(resolve, 500));
        setAlerts(MOCK_ALERTS);
        // ---------------------------------
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch alerts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleUpdateStatus = async (id: number, status: AlertStatus) => {
    // Optimistic UI update:
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: status } : alert
      )
    );

    try {
      // --- UNCOMMENT THIS WHEN YOUR BACKEND IS READY ---
      // await alertService.updateAlertStatus(id, status);
      // ------------------------------------------------
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

    } catch (err) {
      // Rollback on failure
      setError('Failed to update alert. Please try again.');
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === id ? { ...alert, status: 'OPEN' } : alert
        )
      );
    }
  };
  
  // Sort alerts to show OPEN ones first
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.status === 'OPEN' && b.status !== 'OPEN') return -1;
    if (a.status !== 'OPEN' && b.status === 'OPEN') return 1;
    // @ts-ignore
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Security Alerts
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 mt-4">
            An error occurred
          </h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <ShieldAlert className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            No Alerts
          </h3>
          <p className="text-gray-500 mt-1">
            No high-risk activities have been flagged.
          </p>
        </div>
      )}
      
      {!loading && !error && alerts.length > 0 && (
        <AlertList alerts={sortedAlerts} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
};

export default AlertsPage;