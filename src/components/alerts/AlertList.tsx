import React from 'react';
import type { Alert, AlertStatus } from '../../types';
import AlertCard from './AlertCard';

interface AlertListProps {
  alerts: Alert[];
  onUpdateStatus: (id: number, status: AlertStatus) => void;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, onUpdateStatus }) => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default AlertList;