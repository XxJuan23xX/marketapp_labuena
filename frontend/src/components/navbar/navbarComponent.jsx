import React, { useContext, useEffect, useState } from 'react';
import './navbarComponent.css';
import { FaShoppingCart, FaStore } from 'react-icons/fa'; 
import { AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';

const decryptText = (element, originalText) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let iterations = 0;
  const interval = setInterval(() => {
    element.innerHTML = originalText
      .split('')
      .map((letter, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join('');
    if (iterations >= originalText.length) clearInterval(interval);
    iterations += 1 / 3;
  }, 20);
};

const Navbar = () => {
  const { isAuthenticated, userRole, userAvatar, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll('.navbar-links a');
    links.forEach(link => {
      const originalText = link.dataset.originalText;
      link.addEventListener('mouseover', () => decryptText(link, originalText));
    });
  }, [userRole]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li><a href="/" data-original-text="Inicio">Inicio</a></li>
          <li><a href="/products" data-original-text="Productos">Productos</a></li>
          {userRole === 'admin' ? (
            <li><a href="/dashboard" data-original-text="Dashboard">Dashboard</a></li>
          ) : (
            <li><a href="#" data-original-text="Historial">Historial</a></li>
          )}
        </ul>

        <input type="text" placeholder="Buscar productos..." className="search-bar" />

        {userRole !== 'admin' && (
          <>
            <div className="cart-icon">
              <FaShoppingCart />
            </div>
            <div className="heart-icon">
              <AiOutlineHeart />
            </div>
            <button className="sell-button">
              <FaStore className="sell-icon" /> Vender
            </button>
          </>
        )}

        {isAuthenticated ? (
          <div className="avatar-container" onClick={toggleMenu}>
            <img
              src={userAvatar ? `http://localhost:5000/${userAvatar}` : '/uploads/avatar-default.webp'}
              alt="User Avatar"
              className="user-avatar"
              onError={(e) => { e.target.src = '/uploads/avatar-default.webp'; }} // Fallback si hay error en la carga
            />

            {menuOpen && (
              <div className="dropdown-menu">
                <a href="/Account" onClick={closeMenu}>Account</a>
                <a href="/settings" onClick={closeMenu}>Settings</a>
                <a href="#" onClick={() => { logout(); closeMenu(); }}>Log Out</a>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="launch-app-btn">Iniciar Sesión ↗</a>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
