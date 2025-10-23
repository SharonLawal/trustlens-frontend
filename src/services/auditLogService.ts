import { api } from './api';
import type { AuditLogResponse } from '../types';

export const auditLogService = {
  // We can add pagination/filters later
  getAuditLogs: async (): Promise<AuditLogResponse> => {
    const response = await api.get('/audit-logs');
    return response.data;
  },
};