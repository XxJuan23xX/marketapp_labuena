import React, { useEffect, useState, useContext } from 'react';
import './MyProducts.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = 'https://marketapp-backend.onrender.com/api';

const MyProducts = () => {
  const { isAuthenticated, userId, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todos');
  const navigate = useNavigate();

  useEffect(() => {
    // Si isAuthenticated es false y userId es null, espera antes de redirigir
    if (isAuthenticated === false && !userId) {
      console.warn("Esperando a la autenticación completa antes de redirigir.");
      return; // No hacemos nada hasta que se complete la autenticación
    }

    if (isAuthenticated && userId) {
      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            console.warn("Token no encontrado en localStorage.");
            navigate("/login");
            return;
          }

          const response = await fetch(`${BASE_URL}/products/user-products`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 401) {
            console.error("No autorizado: Token inválido o expirado");
            logout();
            navigate("/login");
            return;
          }

          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
            setFilteredProducts(data);
          } else {
            console.error("Error: La respuesta no es un array como se esperaba:", data);
          }
        } catch (error) {
          console.error("Error al obtener productos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [isAuthenticated, userId, navigate, logout]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'todos' || (product.isActive ? 'activo' : 'inactivo') === statusFilter)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, statusFilter, products]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const handleDelete = async (productId) => {
    try {
      await fetch(`${BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await fetch(`${BASE_URL}/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ isActive: newStatus }),
      });
      setProducts(products.map(product =>
        product._id === productId ? { ...product, isActive: newStatus } : product
      ));
    } catch (error) {
      console.error("Error al cambiar estado del producto:", error);
    }
  };

  return (
    <div className="my-products-page">
      <div className="my-products-container">
        <button className="back-home-button" onClick={() => navigate('/')}>Regresar al Home</button>
        <h1 className="my-products-title">Mis Productos</h1>
        
        <div className="header-actions">
          <button className="create-product-button" onClick={() => navigate('/createproducts')}>
            Crear Producto
          </button>
        </div>

        <div className="summary">
          <span>Total de productos: {products.length}</span>
          <span>Activos: {products.filter(p => p.isActive).length}</span>
          <span>En subasta: {products.filter(p => p.type === 'subasta').length}</span>
        </div>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <select value={statusFilter} onChange={handleStatusFilter} className="filter-select">
            <option value="todos">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>

        {loading ? (
          <p>Cargando productos...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.isActive ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    {product.orderId ? (
                      <Link to={`/PedidoEstado/${product.orderId}`} className="action-button">
                        Detalles
                      </Link>
                    ) : (
                      'Sin orden'
                    )}
                    <button className="action-button delete" onClick={() => handleDelete(product._id)}>Eliminar</button>
                    {product.isActive ? (
                      <button
                        className="action-button deactivate"
                        onClick={() => handleToggleStatus(product._id, product.isActive)}
                      >
                        Desactivar
                      </button>
                    ) : (
                      <button
                        className="action-button activate"
                        onClick={() => handleToggleStatus(product._id, product.isActive)}
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
