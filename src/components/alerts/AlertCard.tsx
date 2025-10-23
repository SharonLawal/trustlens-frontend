import React from 'react';
import type { Alert, AlertStatus } from '../../types';
import SeverityBadge from '../common/SeverityBadge';
import { Check, X, User, Clock } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onUpdateStatus: (id: number, status: AlertStatus) => void;
}

const formatTimestamp = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const AlertCard: React.FC<AlertCardProps> = ({ alert, onUpdateStatus }) => {
  const isActionable = alert.status === 'OPEN';

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-5 border-l-4 ${
        isActionable ? 'border-orange-500' : 'border-gray-300'
      } ${!isActionable ? 'opacity-70' : ''}`}
    >
      <div className="flex justify-between items-start">
        {/* Left Side: Details */}
        <div>
          <SeverityBadge severity={alert.severity} showIcon />
          <h3 className="text-lg font-semibold text-gray-900 mt-2">
            {alert.description}
          </h3>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1.5" />
              {alert.employee.name}
            </span>
            <span className="flex items-center mt-1 sm:mt-0">
              <Clock className="w-4 h-4 mr-1.5" />
              {formatTimestamp(alert.created_at)}
            </span>
          </div>
        </div>
        
        {/* Right Side: Actions */}
        <div className="flex-shrink-0 ml-4">
          {isActionable ? (
            <div className="flex space-x-2">
              <button
                onClick={() => onUpdateStatus(alert.id, 'RESOLVED')}
                title="Resolve"
                className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-green-100 hover:text-green-600"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => onUpdateStatus(alert.id, 'DISMISSED')}
                title="Dismiss"
                className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <span className="text-sm font-medium text-gray-500">
              {alert.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;