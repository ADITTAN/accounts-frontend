import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'https://accounts-frontend-hcpzp2dyn-adittans-projects.vercel.app/', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include token in the Authorization header if logged in
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
