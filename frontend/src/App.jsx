import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'; // Asegúrate de que la ruta a AuthContext sea correcta
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduccion from './pages/Crearproducto';


import UserProfile from './pages/UserProfile';
b092366aa4b42adec8e6c72ef9ec4155c25c8

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta para el home */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} />

      
        <Route path="/products" element={<Products />}/>

        <Route path="/createproducts" element={<CreateProduccion/>}/>
        
        {/* Otras rutas pueden ir aquí */}
        
      </Routes>
    </Router>
          {/* Ruta para la página de register */}
          <Route path="/register" element={<Register />} />
          
          {/* Otras rutas pueden ir aquí */}
          <Route path="/Account" element={<UserProfile />} />
      
    </AuthProvider>
  );
};

export default App;
