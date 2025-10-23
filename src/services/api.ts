import axios from 'axios';
import { useAuthStore } from '../store/authStore'; // Import the store

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Add this interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      useAuthStore.getState().clearAuth();
      // Reload the page to force redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);