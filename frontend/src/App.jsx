import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProductsProvider } from './context/UserProductsContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/MyProducts';
import CreateProduccion from './pages/Crearproducto';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import Pedidos from './pages/Pedidos';
import Clientes from './pages/Clientes';
import Productos from './pages/AdminProduct';
import AuctionDetails from "./pages/AuctionDetails";
import Subastas from './pages/Subastas';
import DetallesAllProducts from './pages/DetallesAllProduct';
import CrearSubasta from './pages/CrearSubasta';
import AllProducts from './pages/AllProducts';






import ProtectedRoute from './components/RutasAdmin/ProtectedRoute'; // Asegúrate que la ruta sea correcta

const App = () => {
  return (
    <AuthProvider>
      <UserProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/createproducts" element={<CreateProduccion />} />
        <Route path="/subastasderrapin" element={<Subastas/>}/>
        <Route path="/" element={<AllProducts />} />
        <Route path="/detallesallproducts/:productId" element={<DetallesAllProducts />} />
        <Route path="/crearderrapin" element={<CrearSubasta/>}/>
        <Route path="/allderrapin" element={<AllProducts/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/Account" element={<UserProfile />} />
            <Route path="/auction/:productId" element={<AuctionDetails />} />

            
            {/* Rutas protegidas */}
            <Route path="/Dashboard" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/Pedidos" element={<ProtectedRoute component={Pedidos} />} />
            <Route path="/Clientes" element={<ProtectedRoute component={Clientes} />} />
            <Route path="/Productos" element={<ProtectedRoute component={Productos} />} />
          </Routes>
        </Router>
      </UserProductsProvider>
    </AuthProvider>
  );
};

export default App;
