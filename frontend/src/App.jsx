import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'; // Asegúrate de que la ruta a AuthContext sea correcta
//import { UserProductsProvider } from './context/UserProductsContext';
import { UserProductsProvider } from './context/UserProductsContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduccion from './pages/Crearproducto';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    <AuthProvider>
      <UserProductsProvider>
      <Router>
        <Routes>
          {/* Ruta para el home */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Products />}/>

        <Route path="/createproducts" element={<CreateProduccion/>}/>
        
        {/* Otras rutas pueden ir aquí */}
          {/* Ruta para la página de register */}
          <Route path="/register" element={<Register />} />
          
          {/* Otras rutas pueden ir aquí */}
          <Route path="/Account" element={<UserProfile />} />
          </Routes>
          </Router>
          </UserProductsProvider>
    </AuthProvider>
  );
};

export default App;
