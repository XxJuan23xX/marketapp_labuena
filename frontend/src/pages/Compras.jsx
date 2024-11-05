import React, { useEffect, useState } from 'react';
import api from '../../api'; // Asegúrate de tener la configuración de Axios aquí
import './Compras.css'; // Puedes agregar estilos específicos en este archivo
import { useNavigate } from 'react-router-dom';

const Compras = () => {
  const [activePurchases, setActivePurchases] = useState([]);
  const [completedPurchases, setCompletedPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await api.get('/orders'); // Suponiendo que tengas un endpoint para obtener todas las compras
        const purchases = response.data;

        // Separar compras activas y completadas
        const active = purchases.filter(purchase => !purchase.isCompleted);
        const completed = purchases.filter(purchase => purchase.isCompleted);

        setActivePurchases(active);
        setCompletedPurchases(completed);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchPurchases();
  }, []);

  const goToPurchaseDetails = (orderId) => {
    navigate(`/compras/${orderId}`);
  };

  return (
    <div className="compras-page">
      <h2>Historial de Compras</h2>

      <section className="active-purchases">
        <h3>Compras en Curso</h3>
        {activePurchases.length > 0 ? (
          <div className="purchases-list">
            {activePurchases.map((purchase) => (
              <div className="purchase-card" key={purchase._id} onClick={() => goToPurchaseDetails(purchase._id)}>
                <h4>{purchase.productName}</h4>
                <p>Estado: {purchase.status}</p>
                <p>Fecha de Compra: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes compras en curso.</p>
        )}
      </section>

      <section className="completed-purchases">
        <h3>Historial de Compras Finalizadas</h3>
        {completedPurchases.length > 0 ? (
          <div className="purchases-list">
            {completedPurchases.map((purchase) => (
              <div className="purchase-card" key={purchase._id} onClick={() => goToPurchaseDetails(purchase._id)}>
                <h4>{purchase.productName}</h4>
                <p>Fecha de Finalización: {new Date(purchase.completionDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes compras finalizadas.</p>
        )}
      </section>
    </div>
  );
};

export default Compras;
