import { api } from './api';
import { useAuthStore } from '../store/authStore';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (payload: LoginPayload): Promise<boolean> => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', payload.username);
      formData.append('password', payload.password);

      const response = await api.post<LoginResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, user } = response.data;

      useAuthStore.getState().setAuth(access_token, user);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: () => {
    useAuthStore.getState().clearAuth();
  },

  getCurrentUser: () => {
    return useAuthStore.getState().user;
  },

  isAuthenticated: () => {
    return useAuthStore.getState().isAuthenticated;
  },
};