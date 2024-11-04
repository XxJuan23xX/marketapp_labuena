import React, { useEffect, useState } from 'react';
import api from '../../../api'; // Asegúrate de que el path sea el correcto para tu archivo api.js
import './DailyDeals.css'; // Asegúrate de crear un archivo CSS para los estilos

const DailyDeals = () => {
  const [dailyDeals, setDailyDeals] = useState([]);

  useEffect(() => {
    const fetchDailyDeals = async () => {
      try {
        const response = await api.get('/products/daily-deals');
        setDailyDeals(response.data);
      } catch (error) {
        console.error('Error fetching daily deals:', error);
      }
    };

    fetchDailyDeals();
  }, []);

  return (
    <div className="daily-deals-container">
      <h2>Ofertas del Día</h2>
      <div className="daily-deals-grid">
        {dailyDeals.map((product) => (
          <div className="daily-deal-card" key={product._id}>
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150'}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyDeals;
