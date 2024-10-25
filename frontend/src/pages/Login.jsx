import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="triangle-left"></div>
      <div className="triangle-right"></div>

      <div className="login-form-container">
        <h2>Iniciar Sesión</h2>
        <form>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" placeholder="Introduce tu correo" />
          
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Introduce tu contraseña" />
          
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
