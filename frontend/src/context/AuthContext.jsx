import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const avatar = localStorage.getItem('avatar');

    setIsAuthenticated(!!token);
    setUserRole(role);
    setUserAvatar(avatar);
  }, []);

  const login = (token, role, avatar) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('avatar', avatar);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserAvatar(avatar);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserAvatar(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userAvatar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
