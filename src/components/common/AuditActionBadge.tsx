import React from 'react';
import { AuditAction } from '../../types';

interface AuditActionBadgeProps {
  action: AuditAction;
}

// Helper to format the enum
const formatAction = (action: string) => {
  return action
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getActionColor = (action: AuditAction): string => {
  if (action.includes('FAILED')) {
    return 'bg-red-100 text-red-800';
  }
  if (action.includes('CREATED') || action.includes('COMPLETED') || action.includes('VERIFIED')) {
    return 'bg-green-100 text-green-800';
  }
  if (action.includes('DEACTIVATED') || action.includes('DISMISSED')) {
    return 'bg-yellow-100 text-yellow-800';
  }
  if (action.includes('ADMIN') || action.includes('UPDATED')) {
    return 'bg-blue-100 text-blue-800';
  }
  return 'bg-gray-100 text-gray-800'; // Default for sync, logged, etc.
};

const AuditActionBadge: React.FC<AuditActionBadgeProps> = ({ action }) => {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${getActionColor(
        action
      )}`}
    >
      {formatAction(action)}
    </span>
  );
};

export default AuditActionBadge;