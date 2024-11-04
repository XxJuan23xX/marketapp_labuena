import React, { useEffect, useState } from 'react';
import api from '../../../api';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await api.get('/products/recommendations');
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchRecommendedProducts();
  }, []);

  return (
    <div className="recommendations-section">
      <h2 className="recommendations-title">Recomendaciones para ti</h2>
      <div className="recommendations-grid">
        {recommendedProducts.slice(0, 6).map((product) => (
          <div className="recommendation-card" key={product._id}>
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150'}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            {product.type === 'venta' ? (
              <p className="product-price">${product.price}</p>
            ) : (
              <div className="auction-info">
                <p className="product-starting-price">Precio inicial: ${product.startingPrice}</p>
                <p className="auction-end-time">Termina: {new Date(product.auctionEndTime).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
