import React from 'react';
import './navbarComponent.css';
import { FaShoppingCart, FaStore } from 'react-icons/fa'; 
import { AiOutlineHeart } from 'react-icons/ai'; // Icono de corazón sin relleno (borde)

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="#">Productos</a></li>
        </ul>

        <input type="text" placeholder="Buscar productos..." className="search-bar" />

        {/* Icono de carrito de compras */}
        <div className="cart-icon">
          <FaShoppingCart />
        </div>

        {/* Icono de corazón con borde */}
        <div className="heart-icon">
          <AiOutlineHeart />
        </div>

        {/* Botón de vender */}
        <button className="sell-button">
          <FaStore className="sell-icon" /> Vender
        </button>

        <a href="#" className="launch-app-btn">Iniciar Sesión ↗</a>
      </nav>
    </div>
  );
};

export default Navbar;
