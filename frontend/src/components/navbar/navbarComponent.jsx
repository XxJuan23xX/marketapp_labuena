import React, { useContext, useEffect, useState } from 'react';
import './navbarComponent.css';
import { FaBell, FaStore } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import api from '../../../api';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { isAuthenticated, userRole, userId, logout } = useContext(AuthContext);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isVendedorMode, setIsVendedorMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState('/uploads/avatar-default.webp');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/api/notifications/user/${userId}`);
        const allNotifications = response.data;
        setNotifications(allNotifications);

        const unreadNotifications = allNotifications.filter(notification => !notification.read).length;
        setUnreadCount(unreadNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchAvatar = async () => {
      try {
        if (userId) {
          const response = await fetch(`https://marketapp-backend.onrender.com/api/users/${userId}/avatar`, {
            credentials: 'include',
          });
          const data = await response.json();
          if (data.avatar) {
            setAvatar(`https://marketapp-backend.onrender.com/${data.avatar}`);
          }
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    fetchNotifications();
    fetchAvatar();
  }, [userId]);

  const handleNotificationsClick = async () => {
    setNotificationMenuOpen(!notificationMenuOpen);
    setAccountMenuOpen(false);

    if (unreadCount > 0) {
      try {
        await api.put(`/api/notifications/user/${userId}/read`);
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
        setUnreadCount(0);
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    }
  };

  const handleAccountMenuClick = () => {
    setAccountMenuOpen(!accountMenuOpen);
    setNotificationMenuOpen(false);
  };

  const toggleVendedorMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsVendedorMode(!isVendedorMode);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Cambiando a modo {isVendedorMode ? 'Comprador' : 'Vendedor'}...</p>
        </div>
      )}

      <div className="navbar-container">
        <nav className="navbar">
          <div className="logo-container">
            <a href="https://marketapp-frontend.vercel.app">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </a>
          </div>

          <ul className="navbar-links">
            <li><a href="https://marketapp-frontend.vercel.app" data-original-text="Inicio">Inicio</a></li>
            {isVendedorMode ? (
              <>
                <li><a href="https://marketapp-frontend.vercel.app/products" data-original-text="Mis Productos">Mis Productos</a></li>
                <li><a href="https://marketapp-frontend.vercel.app/ventas" data-original-text="Ventas">Ventas</a></li>
              </>
            ) : (
              <>
                <li><a href="https://marketapp-frontend.vercel.app/allderrapin" data-original-text="Productos">Productos</a></li>
                {userRole === 'admin' ? (
                  <li><a href="https://marketapp-frontend.vercel.app/Dashboard" data-original-text="Dashboard">Dashboard</a></li>
                ) : (
                  <li><a href="https://marketapp-frontend.vercel.app/Historial" data-original-text="Historial">Historial</a></li>
                )}
              </>
            )}
          </ul>
    
          <input type="text" placeholder="Buscar productos..." className="search-bar1" />
    
          {userRole !== 'admin' && (
            <>
              {!isVendedorMode && (
                <>
                  <div className="notification-icon" onClick={handleNotificationsClick}>
                    <FaBell />
                    {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                    
                    {notificationMenuOpen && (
                      <div className="notification-dropdown">
                        <div className="notification-header">
                          <h4>Notificaciones</h4>
                          <span className="notification-clear" onClick={() => setNotifications([])}>Limpiar</span>
                        </div>
                        <div className="notification-content">
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <div
                                key={index}
                                className={`notification-item ${notification.read ? '' : 'unread'}`}
                              >
                                {notification.message}
                                <span className="notification-time">
                                  {new Date(notification.created_at).toLocaleTimeString()}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="no-notifications">No tienes notificaciones</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="heart-icon">
                    <AiOutlineHeart />
                  </div>
                </>
              )}
              <button className="sell-button" onClick={toggleVendedorMode}>
                <FaStore className="sell-icon" /> {isVendedorMode ? "Comprar" : "Vender"}
              </button>
            </>
          )}
    
          {isAuthenticated ? (
            <div className="avatar-container" onClick={handleAccountMenuClick}>
              <img
                src={avatar}
                alt="User Avatar"
                className="user-avatar"
                onError={(e) => { e.target.src = '/uploads/avatar-default.webp'; }}
              />
              {accountMenuOpen && (
                <div className="dropdown-menu">
                  <a href="https://marketapp-frontend.vercel.app/Account">Account</a>
                  <a href="https://marketapp-frontend.vercel.app/settings">Settings</a>
                  <a href="#" onClick={logout}>Log Out</a>
                </div>
              )}
            </div>
          ) : (
            <a href="https://marketapp-frontend.vercel.app/login" className="login-btn">Iniciar Sesión ↗</a>
          )}
        </nav>
      </div>
    </>
  );  
};

export default Navbar;
