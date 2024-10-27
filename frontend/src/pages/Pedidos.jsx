import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './Pedidos.css';

const pedidosData = [
  { id: 1, cliente: 'Juan Perez', fecha: '2023-10-10', estado: 'Pendiente', total: 150 },
  { id: 2, cliente: 'Ana Gomez', fecha: '2023-10-11', estado: 'Completado', total: 300 },
  { id: 3, cliente: 'Carlos Lopez', fecha: '2023-10-12', estado: 'Cancelado', total: 50 },
  // Añade más pedidos si es necesario
];

const Pedidos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPedidos, setFilteredPedidos] = useState(pedidosData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const pedidosPerPage = 10;

  // Filtrar pedidos por término de búsqueda
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPedidos(
      pedidosData.filter(
        pedido =>
          pedido.cliente.toLowerCase().includes(term) ||
          pedido.id.toString().includes(term)
      )
    );
  };

  // Paginación
  const indexOfLastPedido = currentPage * pedidosPerPage;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
  const currentPedidos = filteredPedidos.slice(indexOfFirstPedido, indexOfLastPedido);
  const totalPages = Math.ceil(filteredPedidos.length / pedidosPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Mostrar modal de detalles
  const handleVerDetalles = (pedido) => setSelectedPedido(pedido);

  return (
    <div className="pedidos-container">
      <Sidebar />
      <div className="pedidos-content">
        <h1 className="pedidos-title">Pedidos</h1>

        {/* Métricas rápidas */}
        <div className="metricas-rapidas">
          <div>Total de Pedidos: {pedidosData.length}</div>
          <div>Pedidos Pendientes: {pedidosData.filter(p => p.estado === 'Pendiente').length}</div>
          <div>Pedidos Completados: {pedidosData.filter(p => p.estado === 'Completado').length}</div>
          <div>Pedidos Cancelados: {pedidosData.filter(p => p.estado === 'Cancelado').length}</div>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <label>Buscar pedido: </label>
          <input
            type="text"
            placeholder="ID o Cliente"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Tabla de pedidos */}
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.fecha}</td>
                <td className={pedido.estado.toLowerCase()}>{pedido.estado}</td>
                <td>${pedido.total}</td>
                <td>
                  <button className="action-button view-button" onClick={() => handleVerDetalles(pedido)}>Ver Detalles</button>
                  {pedido.estado === 'Pendiente' && <button className="action-button complete-button">Completar</button>}
                  {pedido.estado === 'Pendiente' && <button className="action-button cancel-button">Cancelar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`page-button ${currentPage === page + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>

        {/* Modal de detalles */}
        {selectedPedido && (
          <div className="modal">
            <div className="modal-content">
              <h2>Detalles del Pedido</h2>
              <p>ID Pedido: {selectedPedido.id}</p>
              <p>Cliente: {selectedPedido.cliente}</p>
              <p>Fecha: {selectedPedido.fecha}</p>
              <p>Estado: {selectedPedido.estado}</p>
              <p>Total: ${selectedPedido.total}</p>
              <button onClick={() => setSelectedPedido(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
