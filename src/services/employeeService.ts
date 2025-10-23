import { api } from './api';
import type { EmployeeListResponse } from '../types';

export const employeeService = {
  getEmployees: async (): Promise<EmployeeListResponse> => {
    // This endpoint will likely join with risk data
    const response = await api.get('/employees');
    return response.data;
  },
};