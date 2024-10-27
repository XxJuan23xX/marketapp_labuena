import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './AdminProduct.css';

const Productos = () => {
  return (
    <div className="productos-container">
      <Sidebar />
      <div className="productos-content">
        <h1 className="productos-title">Productos</h1>

        {/* Sección de estadísticas rápidas */}
        <div className="metricas-rapidas">
          <p>Total de Productos: 120</p>
          <p>Productos Activos: 100</p>
          <p>Productos Inactivos: 20</p>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input type="text" placeholder="Buscar producto o cliente" />
        </div>

        {/* Tabla de productos */}
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cliente</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Producto A</td>
              <td>Electrónica</td>
              <td>Juan Pérez</td>
              <td>$150</td>
              <td>20</td>
              <td>Activo</td>
              <td><button className="details-button">Ver Detalles</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Producto B</td>
              <td>Hogar</td>
              <td>Ana Gómez</td>
              <td>$300</td>
              <td>15</td>
              <td>Inactivo</td>
              <td><button className="details-button">Ver Detalles</button></td>
            </tr>
            {/* Agrega más filas de productos según sea necesario */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;
