import React, { useEffect, useState } from 'react';
import type { DashboardData, Activity, Alert } from '../types';
import { dashboardService } from '../services/dashboardService';
import { Loader2, AlertCircle, Users, ShieldAlert, Activity as ActivityIcon, TrendingUp } from 'lucide-react';
import { ActionType, Severity } from '../types';
import StatsCard from '../components/dashboard/StatsCard';
import RiskTrendChart from '../components/dashboard/RiskTrendChart';
import AlertPanel from '../components/dashboard/AlertPanel';
import RecentActivities from '../components/dashboard/RecentActivities';

// --- MOCK DATA (Consolidated) ---
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    employee_id: 101,
    device_id: 1,
    action_type: ActionType.FILE_DOWNLOAD,
    description: 'User downloaded file: C:\\Confidential\\client_list.csv',
    risk_score: 0.95,
    flagged: true,
    created_at: new Date().toISOString(),
    employee: { id: 101, name: 'John Doe', email: 'john@c.com', department: 'Sales' },
  },
  {
    id: 2,
    employee_id: 102,
    device_id: 2,
    action_type: ActionType.LOGIN,
    description: 'User logged into workstation.',
    risk_score: 0.1,
    flagged: false,
    created_at: new Date(Date.now() - 300000).toISOString(),
    employee: { id: 102, name: 'Jane Smith', email: 'jane@c.com', department: 'Engineering' },
  },
];

const MOCK_ALERTS: Alert[] = [
  {
    id: 1,
    employee_id: 101,
    activity_id: 1,
    description: 'Sensitive file download: C:\\Confidential\\client_list.csv',
    severity: Severity.CRITICAL,
    risk_score: 0.95,
    created_at: new Date(Date.now() - 3600000).toISOString(),
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
    created_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'OPEN',
    employee: { id: 101, name: 'John Doe', email: 'john.doe@c.com' },
  },
];

const MOCK_DASHBOARD_DATA: DashboardData = {
  stats: {
    total_employees: 142,
    active_alerts: 2,
    high_risk_employees: 4,
    total_activities_today: 1245,
  },
  risk_trend: [
    { date: '2025-09-22', average_risk_score: 0.22 },
    { date: '2025-09-23', average_risk_score: 0.25 },
    { date: '2025-09-24', average_risk_score: 0.24 },
    { date: '2025-09-25', average_risk_score: 0.30 },
    { date: '2025-09-26', average_risk_score: 0.32 },
    { date: '2025-09-27', average_risk_score: 0.28 },
    { date: '2025-09-28', average_risk_score: 0.35 },
    { date: '2025-09-29', average_risk_score: 0.40 },
    { date: '2025-09-30', average_risk_score: 0.38 },
    { date: '2025-10-01', average_risk_score: 0.42 },
    { date: '2025-10-02', average_risk_score: 0.45 },
    { date: '2025-10-03', average_risk_score: 0.41 },
    { date: '2025-10-04', average_risk_score: 0.39 },
    { date: '2025-10-05', average_risk_score: 0.43 },
    { date: '2025-10-06', average_risk_score: 0.47 },
    { date: '2025-10-07', average_risk_score: 0.51 },
    { date: '2025-10-08', average_risk_score: 0.48 },
    { date: '2025-10-09', average_risk_score: 0.53 },
    { date: '2025-10-10', average_risk_score: 0.50 },
    { date: '2025-10-11', average_risk_score: 0.46 },
    { date: '2025-10-12', average_risk_score: 0.49 },
    { date: '2025-10-13', average_risk_score: 0.52 },
    { date: '2025-10-14', average_risk_score: 0.55 },
    { date: '2025-10-15', average_risk_score: 0.51 },
    { date: '2025-10-16', average_risk_score: 0.48 },
    { date: '2025-10-17', average_risk_score: 0.53 },
    { date: '2025-10-18', average_risk_score: 0.56 },
    { date: '2025-10-19', average_risk_score: 0.54 },
    { date: '2025-10-20', average_risk_score: 0.58 },
    { date: '2025-10-21', average_risk_score: 0.55 },
  ],
  open_alerts: MOCK_ALERTS.filter(a => a.status === 'OPEN'),
  recent_high_risk_activities: MOCK_ACTIVITIES,
};
// --- END MOCK DATA ---

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // --- USE THIS CODE WHEN YOUR BACKEND IS READY ---
        // const response = await dashboardService.getDashboardData();
        // setData(response);
        // ------------------------------------------------
        
        // --- USING MOCK DATA FOR NOW ---
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(MOCK_DASHBOARD_DATA);
        // ---------------------------------
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-6">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="text-lg font-semibold text-red-700 mt-4">
          An error occurred
        </h3>
        <p className="text-red-600 mt-1">{error || 'Could not load data.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section 1: Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={data.stats.total_employees}
          icon={Users}
          colorClassName="bg-blue-500"
        />
        <StatsCard
          title="Active Alerts"
          value={data.stats.active_alerts}
          icon={ShieldAlert}
          colorClassName="bg-red-500"
        />
        <StatsCard
          title="High-Risk Employees"
          value={data.stats.high_risk_employees}
          icon={TrendingUp}
          colorClassName="bg-orange-500"
        />
        <StatsCard
          title="Activities Today"
          value={data.stats.total_activities_today}
          icon={ActivityIcon}
          colorClassName="bg-green-500"
        />
      </div>

      {/* Section 2: Main Chart */}
      <div>
        <RiskTrendChart data={data.risk_trend} />
      </div>

      {/* Section 3: Alerts and Activities */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AlertPanel alerts={data.open_alerts} />
        <RecentActivities activities={data.recent_high_risk_activities} />
      </div>
    </div>
  );
};

export default DashboardPage;