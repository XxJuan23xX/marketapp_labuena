import React, { useEffect, useState, useContext } from 'react';
import './MyProducts.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api'; // Importa la instancia configurada de api
import { AuthContext } from '../context/AuthContext';

const MyProducts = () => {
  const { userId } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todos');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/user-products');
        console.log("Response from /api/user-products:", response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      console.log("User ID from AuthContext:", userId);
      fetchProducts();
    } else {
      console.log("User ID is not set in AuthContext.");
    }
  }, [userId]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'todos' || (product.isActive ? 'activo' : 'inactivo') === statusFilter)
    );
    setFilteredProducts(filtered);
    console.log("Filtered Products:", filtered);
  }, [searchTerm, statusFilter, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      console.log("Product deleted successfully:", productId);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleToggleStatus = async (productId, newStatus) => {
    try {
      const response = await api.patch(`/products/${productId}/status`, { isActive: newStatus });
      setProducts(products.map(product => 
        product._id === productId ? { ...product, isActive: newStatus } : product
      ));
      console.log("Product status updated:", productId, newStatus);
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
                    <Link to={`/edit-product/${product._id}`} className="action-button">Editar</Link>
                    <button className="action-button delete" onClick={() => handleDelete(product._id)}>Eliminar</button>
                    <button 
                      className={`action-button ${product.isActive ? 'deactivate' : 'activate'}`} 
                      onClick={() => handleToggleStatus(product._id, product.isActive)}
                    >
                      {product.isActive ? 'Desactivar' : 'Activar'}
                    </button>
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