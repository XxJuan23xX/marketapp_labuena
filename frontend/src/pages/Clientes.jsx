import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './Clientes.css';

const clientesData = [
  { id: 1, nombre: 'Juan Perez', email: 'juan.perez@example.com', fechaRegistro: '2023-01-01', estado: 'Activo' },
  { id: 2, nombre: 'Ana Gomez', email: 'ana.gomez@example.com', fechaRegistro: '2023-02-15', estado: 'Activo' },
  { id: 3, nombre: 'Carlos Lopez', email: 'carlos.lopez@example.com', fechaRegistro: '2023-03-10', estado: 'Inactivo' },
  // Añade más clientes si es necesario
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState(clientesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const clientesPerPage = 10;

  // Filtrar clientes por término de búsqueda
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredClientes(
      clientesData.filter(
        cliente =>
          cliente.nombre.toLowerCase().includes(term) ||
          cliente.email.toLowerCase().includes(term)
      )
    );
  };

  // Paginación
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);
  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Modal de detalles
  const handleVerDetalles = (cliente) => setSelectedCliente(cliente);

  return (
    <div className="clientes-container">
      <Sidebar />
      <div className="clientes-content">
        <h1 className="clientes-title">Clientes</h1>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <label>Buscar cliente: </label>
          <input
            type="text"
            placeholder="Nombre o Email"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Tabla de clientes */}
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.fechaRegistro}</td>
                <td className={cliente.estado.toLowerCase()}>{cliente.estado}</td>
                <td>
                  <button className="action-button view-button" onClick={() => handleVerDetalles(cliente)}>Ver Detalles</button>
                  <button className="action-button toggle-button">{cliente.estado === 'Activo' ? 'Desactivar' : 'Activar'}</button>
                  <button className="action-button delete-button">Eliminar</button>
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
        {selectedCliente && (
          <div className="modal">
            <div className="modal-content">
              <h2>Detalles del Cliente</h2>
              <p>ID: {selectedCliente.id}</p>
              <p>Nombre: {selectedCliente.nombre}</p>
              <p>Email: {selectedCliente.email}</p>
              <p>Fecha de Registro: {selectedCliente.fechaRegistro}</p>
              <p>Estado: {selectedCliente.estado}</p>
              <button onClick={() => setSelectedCliente(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;
