// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

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
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); // Debugging

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken); // Debugging

      if (decodedToken) {
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
        setUserAvatar(localStorage.getItem('avatar') || '/uploads/avatar-default.webp');
        console.log("User authenticated:", decodedToken.role); // Debugging
      }
    }
  }, []);

  const login = (token, role, avatar) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('avatar', avatar);

    const decodedToken = decodeToken(token);
    console.log("Token set on login:", decodedToken); // Debugging

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

  console.log("AuthProvider - isAuthenticated:", isAuthenticated, "userRole:", userRole); // Final state check

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userAvatar, userId, login, logout, updateUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};
