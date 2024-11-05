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
  const [favorites, setFavorites] = useState([]);

  const backendUrl = 'https://marketapp-backend.onrender.com';

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

        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${decodedToken.id}`)) || [];
        setFavorites(storedFavorites);
      }
    }
  }, []);

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

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${backendUrl}/api/refresh-token`, { refreshToken });
      const { accessToken, newRefreshToken } = response.data;
      if (accessToken && newRefreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        const decodedToken = decodeToken(accessToken);

        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };

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

      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${decodedToken.id}`)) || [];
      setFavorites(storedFavorites);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('avatar');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserAvatar(null);
    setUserId(null);
    setFavorites([]);
  };

  const updateUserAvatar = (newAvatar) => {
    localStorage.setItem('avatar', newAvatar);
    setUserAvatar(newAvatar);
  };

  const toggleFavorite = (product) => {
    let updatedFavorites;
    const isFavorited = favorites.some(fav => fav.id_producto === product.id_producto);

    if (isFavorited) {
      updatedFavorites = favorites.filter(fav => fav.id_producto !== product.id_producto);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userRole,
      userAvatar,
      userId,
      favorites,
      login,
      logout,
      toggleFavorite,
      updateUserAvatar,
      refreshAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
