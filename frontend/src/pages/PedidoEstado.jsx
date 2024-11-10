import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import './PedidoEstado.css';

const PedidoEstado = () => {
  const { orderId } = useParams(); // Obtenemos orderId desde la URL
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(2); // Comienza en fase 2: Venta en proceso

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/api/orders/${orderId}`);
        console.log("Datos de la orden:", response.data); // Verifica que datos recibes aquí
        setOrder(response.data);
    
        if (response.data.status === 'completado') {
          setOrderStatus(3);
        }
      } catch (error) {
        console.error("Error al obtener detalles de la orden:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleFinalizeSale = async () => {
    try {
      await api.put(`/api/orders/finalize/${orderId}`, { status: 'completado' });
      alert("Venta finalizada con éxito.");
      setOrderStatus(3); // Cambiar a estado de venta finalizada
    } catch (error) {
      console.error("Error al finalizar la venta:", error);
      alert("Error al finalizar la venta.");
    }
  };

  const getProgressWidth = () => {
    switch (orderStatus) {
      case 1:
        return '33%';
      case 2:
        return '66%';
      case 3:
        return '100%';
      default:
        return '0%';
    }
  };

  if (!order) return <p>Cargando detalles de la orden...</p>;

  return (
    <div className="pedido-estado-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/products" className="breadcrumb-link">← Volver a Mis Productos</Link>
      </div>

      <div className="pedido-estado-card">
        <h1>Detalles del Pedido</h1>
        <div className="phase-indicator">
          <div className="phase completed">
            <div className="phase-circle completed">1</div>
            Venta Iniciada
          </div>
          <div className={`phase ${orderStatus >= 2 ? 'completed' : ''}`}>
            <div className={`phase-circle ${orderStatus >= 2 ? 'completed' : ''}`}>2</div>
            Venta en Proceso
          </div>
          <div className={`phase ${orderStatus === 3 ? 'completed' : ''}`}>
            <div className={`phase-circle ${orderStatus === 3 ? 'completed' : ''}`}>3</div>
            Venta Finalizada
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: getProgressWidth() }}></div>
          </div>
        </div>

        <div className="product-info">
          <p><strong>Precio:</strong> ${order.price}</p>
          <p><strong>Comprador:</strong> {order.buyer_id?.name || "Nombre del comprador no disponible"}</p>
        </div>

        {orderStatus < 3 && (
          <button className="finalize-sale-button" onClick={handleFinalizeSale}>
            Confirmar y Finalizar Venta
          </button>
        )}

        {orderStatus === 3 && (
          <p className="completed-message">La venta ha sido completada exitosamente.</p>
        )}
      </div>
    </div>
  );
};

export default PedidoEstado;
