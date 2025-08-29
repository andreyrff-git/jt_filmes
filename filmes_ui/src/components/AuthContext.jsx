import React from 'react';
import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica token ao carregar o app
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token && token.includes('.')) {
      apiClient.get('/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      if (token) {
        localStorage.removeItem('authToken');
      }
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (credentials) => {

    try {
      const response = await apiClient.post('/login', credentials);

      const { access_token } = response.data;

      if (access_token && access_token.includes('.')) {
        localStorage.setItem('authToken', access_token);
      } else {
        localStorage.removeItem('authToken');
        return; 
      }

      // Busca dados do usuário autenticado
      const userResponse = await apiClient.get('/me');

      setUser(userResponse.data);
      navigate('/filmes');
    } catch (error) {
    }
  };

  // Logout
  const logout = () => {
    apiClient.post('/logout').finally(() => {
      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/login');
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
