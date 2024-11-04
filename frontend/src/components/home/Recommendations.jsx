// src/components/Recommendations.jsx
import React from 'react';
import './Recommendations.css';

const Recommendations = () => {
    const recommendedProducts = [
        { id: 1, name: 'Producto A', price: 59.99, image: '/path/to/imageA.jpg' },
        { id: 2, name: 'Producto B', price: 89.99, image: '/path/to/imageB.jpg' },
        // Agrega más productos según sea necesario
    ];

    return (
        <div className="recommendations">
            <h2>Recomendados para Ti</h2>
            <div className="recommendations-container">
                {recommendedProducts.map(product => (
                    <div key={product.id} className="recommendation-card">
                        <img src={product.image} alt={product.name} className="recommendation-image" />
                        <h3 className="recommendation-name">{product.name}</h3>
                        <p className="recommendation-price">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
