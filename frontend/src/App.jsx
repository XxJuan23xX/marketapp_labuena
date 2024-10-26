import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home'; // Ejemplo de otro componente
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduccion from './pages/Crearproducto';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para el home */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para la página de login */}
        <Route path="/login" element={<Login />} />

         {/* Ruta para la página de register*/}
        <Route path="/register" element={<Register />}/>
        
/
        <Route path="/products" element={<Products />}/>

        <Route path="/createproducts" element={<CreateProduccion/>}/>
        
        {/* Otras rutas pueden ir aquí */}
      </Routes>
    </Router>
  );
}

export default App;
