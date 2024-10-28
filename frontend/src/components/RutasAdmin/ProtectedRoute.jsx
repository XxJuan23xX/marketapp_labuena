// components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario autenticado, redirigir a /login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado pero no es administrador, redirigir a /
  if (user && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si el usuario es administrador, mostrar el componente protegido
  return <Component />;
};

export default ProtectedRoute;
