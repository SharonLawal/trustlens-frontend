import React from 'react';
import type { Alert } from '../../types';
import SeverityBadge from '../common/SeverityBadge';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

interface AlertPanelProps {
  alerts: Alert[];
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Open Alerts
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {alerts.length > 0 ? (
          alerts.slice(0, 5).map((alert) => ( // Show top 5
            <li key={alert.id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {alert.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {alert.employee.name}
                  </p>
                </div>
                <SeverityBadge severity={alert.severity} />
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No open alerts. Great job!</p>
        )}
      </ul>
      <div className="mt-4 text-right">
        <Link
          to="/alerts"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View all alerts &rarr;
        </Link>
      </div>
    </div>
  );
};

export default AlertPanel;