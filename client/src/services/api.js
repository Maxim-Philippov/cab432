import axios from 'axios';

const API_URL = 'http://13.210.19.5:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
