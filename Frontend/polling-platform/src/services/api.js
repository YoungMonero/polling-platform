import axios from 'axios';
import { getToken } from '../utils/auth.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', // Matches port 3000
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors (e.g., 401 logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error(message);
    if (error.response?.status === 401) {
      // Remove token and redirect to login (implement in frontend)
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;