import React, { useContext, useEffect, useState } from 'react';
import './navbarComponent.css';
import { FaBell, FaStore } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import api from '../../../api';

const Navbar = () => {
  const { isAuthenticated, userRole, userId, logout } = useContext(AuthContext);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // Estado para el menú de la cuenta
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false); // Estado para el menú de notificaciones
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isVendedorMode, setIsVendedorMode] = useState(false);
  const [avatar, setAvatar] = useState('/uploads/avatar-default.webp');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/user/${userId}`);
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
          const response = await fetch(`http://localhost:5000/api/users/${userId}/avatar`, {
            credentials: 'include',
          });
          const data = await response.json();
          if (data.avatar) {
            setAvatar(`http://localhost:5000/${data.avatar}`);
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
    setAccountMenuOpen(false); // Cierra el menú de la cuenta al abrir el de notificaciones

    if (unreadCount > 0) {
      try {
        await api.put(`/notifications/user/${userId}/read`);
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
        setUnreadCount(0);
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    }
  };

  const handleAccountMenuClick = () => {
    setAccountMenuOpen(!accountMenuOpen);
    setNotificationMenuOpen(false); // Cierra el menú de notificaciones al abrir el de la cuenta
  };

  const toggleVendedorMode = () => setIsVendedorMode(!isVendedorMode);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li><a href="/" data-original-text="Inicio">Inicio</a></li>
          {isVendedorMode ? (
            <>
              <li><a href="/products" data-original-text="Mis Productos">Mis Productos</a></li>
              <li><a href="/ventas" data-original-text="Ventas">Ventas</a></li>
            </>
          ) : (
            <>
              <li><a href="/allderrapin" data-original-text="Productos">Productos</a></li>
              {userRole === 'admin' ? (
                <li><a href="/Dashboard" data-original-text="Dashboard">Dashboard</a></li>
              ) : (
                <li><a href="/Historial" data-original-text="Historial">Historial</a></li>
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
                <a href="/Account">Account</a>
                <a href="/settings">Settings</a>
                <a href="#" onClick={logout}>Log Out</a>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="login-btn">Iniciar Sesión ↗</a>
        )}
      </nav>
    </div>
  );  
};

export default Navbar;
