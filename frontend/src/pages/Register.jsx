import React, { useState } from 'react';
import './Register.css';
import illustration from '../assets/registro.png';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'comprador', // Rol por defecto
    address: '',
    phone: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role, // Si el usuario selecciona un rol, este campo se envía
          address: user.address,
          phone: user.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error creando el usuario');
        return;
      }

      const data = await response.json();
      console.log('Usuario creado:', data);

      // Redirigir al login después del registro exitoso
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="form-section">
          <h2>Sign up</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} required />

            <label htmlFor="email">Your Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} required />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />

            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={user.address} onChange={handleChange} required />

            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" value={user.phone} onChange={handleChange} required />

            {/* Si quieres que el usuario seleccione un rol, puedes agregar esto */}
            <label htmlFor="role">Role</label>
            <select name="role" value={user.role} onChange={handleChange} required>
              <option value="comprador">Comprador</option>
              <option value="vendedor">Vendedor</option>
            </select>

            <div className="terms-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="terms-label">
                I agree to all statements in <a href="#">Terms of Service</a>
              </label>
            </div>

            <button type="submit">REGISTER</button>
          </form>
        </div>
        <div className="image-section">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Register;
