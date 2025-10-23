import { api } from './api';
import type { ActivityFeedResponse } from '../types';

export const activityService = {
  getActivityFeed: async (): Promise<ActivityFeedResponse> => {
    const response = await api.get('/activities');
    return response.data;
  },
};