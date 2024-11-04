// src/components/CategoryCarousel.jsx
import React from 'react';
import './CategoryCarousel.css';

const CategoryCarousel = () => {
    const categories = [
        
    ];

    return (
        <div className="category-carousel">
            {categories.map(category => (
                <div key={category.id} className="category-section">
                    <h2>{category.name}</h2>
                    <div className="product-carousel">
                        {category.products.map(product => (
                            <div key={product.id} className="carousel-item">
                                <img src={product.image} alt={product.name} className="carousel-image" />
                                <p className="carousel-price">${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryCarousel;
