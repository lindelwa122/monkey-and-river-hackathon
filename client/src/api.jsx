import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update if your backend runs on a different port
});

// Optionally attach token if you're using JWT
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
