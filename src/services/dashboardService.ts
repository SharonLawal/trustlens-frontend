import { api } from './api';
import type { DashboardData } from '../types';

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Your backend will provide a single, aggregated endpoint
    const response = await api.get('/dashboard/all');
    return response.data;
  },
};