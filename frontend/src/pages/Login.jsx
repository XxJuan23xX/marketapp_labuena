import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaSteam } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', { // Asegúrate de que la ruta es correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Login failed');
        return;
      }

      const data = await response.json();
console.log('Login Success:', data);

// Guardar el token en localStorage
localStorage.setItem('token', data.token);

// Redirigir al dashboard o a la página principal
window.location.href = '/';

    } catch (error) {
      setErrorMessage('Error al iniciar sesión, intenta de nuevo.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="login-form-container">
          <h2>Hello! Welcome back</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/reset-password">Reset Password!</a>
            </div>

            <button type="submit">Login</button>

            <div className="social-login">
              <p>or</p>
              <div className="social-icons">
                <button className="icon-button google"><FaGoogle /></button>
                <button className="icon-button facebook"><FaFacebookF /></button>
                <button className="icon-button apple"><FaApple /></button>
                <button className="icon-button"><FaSteam /></button>
              </div>
            </div>
          </form>
          <p>
            Don’t have an account? <a href="/register">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
