import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home'; // Ejemplo de otro componente

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para el home */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para la página de login */}
        <Route path="/login" element={<Login />} />
        
        {/* Otras rutas pueden ir aquí */}
      </Routes>
    </Router>
  );
}

export default App;
