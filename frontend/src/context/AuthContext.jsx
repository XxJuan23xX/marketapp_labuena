// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Función para decodificar el token JWT
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
        setUserAvatar(localStorage.getItem('avatar') || '/uploads/avatar-default.webp');
        checkTokenExpiration();
      }
    }
  }, []);

  // Verificar si el token ha expirado y refrescar si es necesario
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = decodeToken(token);
      const isTokenExpired = decodedToken && decodedToken.exp * 1000 < Date.now();

      if (isTokenExpired) {
        refreshAccessToken();
      }
    }
  };

  // Función para refrescar el accessToken
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://localhost:5000/api/refresh-token', { refreshToken });
      
      const { accessToken, newRefreshToken } = response.data;
      if (accessToken && newRefreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        const decodedToken = decodeToken(accessToken);

        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
      } else {
        logout(); // En caso de falla en el refresco, se cierra la sesión
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };

  // Inicio de sesión y almacenamiento de tokens
  const login = (accessToken, refreshToken, avatar) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('avatar', avatar);

    const decodedToken = decodeToken(accessToken);
    if (decodedToken) {
      setUserId(decodedToken.id);
      setUserRole(decodedToken.role);
      setIsAuthenticated(true);
      setUserAvatar(avatar);
    }
  };

  // Cerrar sesión y limpiar almacenamiento
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('avatar');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserAvatar(null);
    setUserId(null);
  };

  // Actualizar avatar
  const updateUserAvatar = (newAvatar) => {
    localStorage.setItem('avatar', newAvatar);
    setUserAvatar(newAvatar);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userAvatar, userId, login, logout, updateUserAvatar, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
