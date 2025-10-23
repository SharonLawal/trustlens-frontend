import { api } from './api';
import { useAuthStore } from '../store/authStore';

// Based on your backend's auth.py schema
interface LoginPayload {
  username: string; // This is the admin's email
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
      // Your FastAPI backend will expect form data for an OAuth2 token endpoint
      const formData = new URLSearchParams();
      formData.append('username', payload.username);
      formData.append('password', payload.password);

      const response = await api.post<LoginResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, user } = response.data;

      // Save to our Zustand store
      useAuthStore.getState().setAuth(access_token, user);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: () => {
    useAuthStore.getState().clearAuth();
    // No API call needed, just clear the local token
  },

  getCurrentUser: () => {
    return useAuthStore.getState().user;
  },

  isAuthenticated: () => {
    return useAuthStore.getState().isAuthenticated;
  },
};