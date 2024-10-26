import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'; // Asegúrate de que la ruta a AuthContext sea correcta
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta para el home */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para la página de register */}
          <Route path="/register" element={<Register />} />
          
          {/* Otras rutas pueden ir aquí */}
          <Route path="/Account" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
