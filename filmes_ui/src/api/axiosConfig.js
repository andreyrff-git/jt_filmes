import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.4:8000/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  if (token && token.includes('.')) {
    const tokenPreview = token.substring(0, 15) + '...';
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (token) {
      console.warn('Token inválido encontrado no storage, não será enviado:', token);
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
