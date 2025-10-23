import React from 'react';
import type { Activity } from '../../types';
import RiskBadge from '../common/RiskBadge';
import { Link } from 'react-router-dom';

const formatTimestamp = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    timeStyle: 'short',
  });
};

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent High-Risk Activity
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {activities.length > 0 ? (
          activities.slice(0, 5).map((activity) => ( // Show top 5
            <li key={activity.id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {activity.employee.name}
                  </p>
                  <p className="text-sm text-gray-500" title={activity.description}>
                    {activity.description.substring(0, 40)}...
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <RiskBadge score={activity.risk_score} />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatTimestamp(activity.created_at)}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No high-risk activity found.</p>
        )}
      </ul>
      <div className="mt-4 text-right">
        <Link
          to="/activities"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View all activity &rarr;
        </Link>
      </div>
    </div>
  );
};

export default RecentActivities;