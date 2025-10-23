import React from 'react';
import { Severity } from '../../types';
import {
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

interface SeverityBadgeProps {
  severity: Severity;
  showIcon?: boolean;
}

const severityMap = {
  [Severity.LOW]: {
    label: 'Low',
    color: 'bg-blue-100 text-blue-800',
    icon: ShieldCheck,
  },
  [Severity.MEDIUM]: {
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800',
    icon: AlertCircle,
  },
  [Severity.HIGH]: {
    label: 'High',
    color: 'bg-orange-100 text-orange-800',
    icon: AlertTriangle,
  },
  [Severity.CRITICAL]: {
    label: 'Critical',
    color: 'bg-red-200 text-red-900',
    icon: ShieldAlert,
  },
};

const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  showIcon = false,
}) => {
  const { label, color, icon: Icon } = severityMap[severity] || severityMap.low;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {label}
    </span>
  );
};

export default SeverityBadge;