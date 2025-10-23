import { api } from './api';
import type { ActivityFeedResponse } from '../types';

export const activityService = {
  // We'll add pagination later
  getActivityFeed: async (): Promise<ActivityFeedResponse> => {
    const response = await api.get('/activities');
    return response.data;
  },
};