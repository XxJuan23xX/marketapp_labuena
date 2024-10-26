import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Función para decodificar el token manualmente
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])); // Decodifica la parte del payload del JWT
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
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
        setUserAvatar(localStorage.getItem('avatar') || '/uploads/avatar-default.webp');
      }
    }
  }, []);

  const login = (token, role, avatar) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('avatar', avatar);

    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUserId(decodedToken.id);
      setUserRole(role);
      setIsAuthenticated(true);
      setUserAvatar(avatar);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserAvatar(null);
    setUserId(null);
  };

  const updateUserAvatar = (newAvatar) => {
    localStorage.setItem('avatar', newAvatar);
    setUserAvatar(newAvatar);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userAvatar, userId, login, logout, updateUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};
