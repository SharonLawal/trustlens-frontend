import { api } from './api';
import type { AlertListResponse, Alert, AlertStatus } from '../types';

export const alertService = {
  // We can add filters later (e.g., ?status=OPEN)
  getAlerts: async (): Promise<AlertListResponse> => {
    const response = await api.get('/alerts');
    return response.data;
  },

  updateAlertStatus: async (
    alertId: number,
    status: AlertStatus
  ): Promise<Alert> => {
    // Your backend would have an endpoint like this
    // The backend would then create an AuditLog entry
    const response = await api.patch(`/alerts/${alertId}/status`, { status });
    return response.data;
  },
};