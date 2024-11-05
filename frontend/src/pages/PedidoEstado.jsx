import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const PedidoEstado = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleFinalizeSale = async () => {
    try {
      await api.put(`/orders/finalize/${productId}`);
      alert("Venta finalizada con éxito.");
      navigate('/Historial');
    } catch (error) {
      console.error("Error al finalizar la venta:", error);
      alert("Error al finalizar la venta.");
    }
  };

  if (!product) return <p>Cargando detalles del producto...</p>;

  return (
    <div className="pedido-estado-page">
      <h1>Detalles del Pedido</h1>
      <p><strong>Producto:</strong> {product.name}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Estado:</strong> {product.isActive ? "Activo" : "Inactivo"}</p>

      <button className="finalize-sale-button" onClick={handleFinalizeSale}>
        Finalizar Venta
      </button>
    </div>
  );
};

export default PedidoEstado;
