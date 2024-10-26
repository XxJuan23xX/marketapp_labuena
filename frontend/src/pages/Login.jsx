import React, { useState, useContext } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaSteam, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
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

      // Asegúrate de que el backend esté devolviendo `avatar` correctamente.
      if (data.token && data.user && data.user.role && data.user.avatar) {
        // Pasar `token`, `role`, y `avatar` al contexto de autenticación
        login(data.token, data.user.role.roleName, data.user.avatar);

        // Redirigir al dashboard o a la página principal
        window.location.href = '/';
      } else {
        setErrorMessage('Error: Datos de usuario incompletos.');
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión, intenta de nuevo.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="login-page">
      <div>
        <FaArrowLeft className="back-icon" onClick={() => (window.location.href = '/')} />
      </div>
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
