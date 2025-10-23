import React from 'react';
import type { Activity } from '../../types';
import { ActionType } from '../../types';
import RiskBadge from '../common/RiskBadge';
import {
  FileText,
  FileDown,
  FileUp,
  FileX,
  LogIn,
  LogOut,
  AlertTriangle,
  Mail,
  Shield,
  UploadCloud,
  HelpCircle,
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
}

// Map action types to icons
const actionIcons: Record<ActionType, React.ElementType> = {
  [ActionType.FILE_ACCESS]: FileText,
  [ActionType.FILE_DOWNLOAD]: FileDown,
  [ActionType.FILE_UPLOAD]: FileUp,
  [ActionType.FILE_DELETE]: FileX,
  [ActionType.LOGIN]: LogIn,
  [ActionType.LOGOUT]: LogOut,
  [ActionType.FAILED_LOGIN]: AlertTriangle,
  [ActionType.EMAIL_SENT]: Mail,
  [ActionType.SYSTEM_ACCESS]: Shield,
  [ActionType.PRIVILEGE_ESCALATION]: Shield,
  [ActionType.DATA_EXFILTRATION]: UploadCloud,
  [ActionType.SUSPICIOUS_ACTIVITY]: HelpCircle,
};

// Format date to be more readable
const formatTimestamp = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ul role="list" className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const Icon = actionIcons[activity.action_type] || HelpCircle;
          return (
            <li key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.employee.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-1">
                    <RiskBadge score={activity.risk_score} />
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatTimestamp(activity.created_at)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;