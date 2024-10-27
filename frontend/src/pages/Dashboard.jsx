import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { FaDollarSign, FaBox, FaUser } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Sección de estadísticas superiores */}
        <div className="top-stats">
          <div className="stat-card">
            <FaDollarSign className="stat-icon" style={{ color: '#34D399' }} />
            <h2>Ganancias</h2>
            <p className="stat-value">$16,580</p>
            <p className="stat-change positive">↗ 5% En el último mes</p>
          </div>
          <div className="stat-card">
            <FaBox className="stat-icon" style={{ color: '#F59E0B' }} />
            <h2>Productos Vendidos</h2>
            <p className="stat-value">3,679</p>
            <p className="stat-change positive">↗ 2% En el último mes</p>
          </div>
          <div className="stat-card">
            <FaUser className="stat-icon" style={{ color: '#6366F1' }} />
            <h2>Clientes</h2>
            <p className="stat-value">51,801</p>
            <p className="stat-change negative">↘ 3% En el último mes</p>
          </div>
        </div>

        {/* Contenedor de bienvenida */}
        <div className="middle-stats">
  <div className="welcome-card">
    <h2>Bienvenido de nuevo,</h2>
    <h1>Juan Manuel</h1>
    <p>Estoy alegre de volverte a ver</p>
    <button className="record-button">Tap to record →</button>
  </div>
  <div className="additional-card">
    <h2>Estadísticas Rápidas</h2>
    <ul>
      <li>Dato 1</li>
      <li>Dato 2</li>
      <li>Dato 3</li>
    </ul>
  </div>
</div>

        {/* Nueva sección de estadísticas inferiores */}
        <div className="bottom-stats">
          <div className="bottom-card">
            <h2>Últimos Clientes Agregados</h2>
            <ul>
              <li>Cliente 1</li>
              <li>Cliente 2</li>
              <li>Cliente 3</li>
              <li>Cliente 4</li>
              <li>Cliente 5</li>
            </ul>
          </div>
          <div className="bottom-card">
            <h2>Productos Más Vendidos</h2>
            <ul>
              <li>Producto A</li>
              <li>Producto B</li>
              <li>Producto C</li>
              <li>Producto D</li>
              <li>Producto E</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
