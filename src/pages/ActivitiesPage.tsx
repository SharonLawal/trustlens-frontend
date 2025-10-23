import React, { useEffect, useState } from 'react';
import type { Activity } from '../types';
import { activityService } from '../services/activityService';
import { ActionType } from '../types';
import ActivityFeed from '../components/activities/ActivityFeed';
import { AlertCircle, Loader2 } from 'lucide-react';

// --- MOCK DATA ---
// We'll use this so you can see the UI without a running backend.
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    employee_id: 101,
    device_id: 1,
    action_type: ActionType.FILE_ACCESS,
    description: 'User accessed file: C:\\Confidential\\client_list.csv',
    risk_score: 0.8,
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
  {
    id: 3,
    employee_id: 101,
    device_id: 1,
    action_type: ActionType.FAILED_LOGIN,
    description: 'Failed login attempt detected on device.',
    risk_score: 0.5,
    flagged: false,
    created_at: new Date(Date.now() - 600000).toISOString(),
    employee: { id: 101, name: 'John Doe', email: 'john@c.com', department: 'Sales' },
  },
];
// --- END MOCK DATA ---


const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        
        // --- USE THIS CODE WHEN YOUR BACKEND IS READY ---
        // const response = await activityService.getActivityFeed();
        // setActivities(response.activities);
        // ------------------------------------------------
        
        // --- USING MOCK DATA FOR NOW ---
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setActivities(MOCK_ACTIVITIES);
        // ---------------------------------
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch activity feed. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    
    // We can add a simple poll to refresh the data
    const interval = setInterval(fetchActivities, 30000); // Refresh every 30s
    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Live Activity Feed
      </h1>

      {loading && activities.length === 0 && (
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

      {!loading && !error && activities.length === 0 && (
        <div className="text-center h-64">
          <h3 className="text-lg font-semibold text-gray-700">No Activity</h3>
          <p className="text-gray-500 mt-1">
            No activities have been logged yet.
          </p>
        </div>
      )}
      
      {activities.length > 0 && (
        <ActivityFeed activities={activities} />
      )}
    </div>
  );
};

export default ActivitiesPage;