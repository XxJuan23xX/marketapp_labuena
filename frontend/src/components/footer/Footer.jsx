import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bar">
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="lightblue">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-6h2v6zm4 0h-2v-6h2v6zm2-8h-8V8h8v2z"/>
          </svg>
          Hover Me
        </h3>
      </div>
      <div className="footer-content">
        <div className="footer-column">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contáctanos</h4>
          <ul>
            <li><a href="#">Email: 23090467@alumno.utmetropolitana.com.mx</a></li>
            <li><a href="#">Phone: +52 9995406380</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Join Our Newsletter</h4>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="lorem@loremipsum.com" />
          <input type="submit" value="Subscribe" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
