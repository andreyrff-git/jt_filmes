import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient.get('/me')
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem('authToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await apiClient.post('/login', credentials);
    const { access_token } = response.data;
    localStorage.setItem('authToken', access_token);
    const userResponse = await apiClient.get('/me');
    setUser(userResponse.data);
    navigate('/filmes');
  };

  const logout = () => {
    apiClient.post('/logout').finally(() => {
      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/login');
    });
  };

  const value = { user, isAuthenticated: !!user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);