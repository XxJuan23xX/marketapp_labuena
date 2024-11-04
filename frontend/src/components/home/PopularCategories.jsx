// src/components/PopularCategories.jsx
import React from 'react';
import './PopularCategories.css';

const PopularCategories = () => {
    const categories = [
        { id: 1, name: 'Electrónica', icon: '/path/to/electronics-icon.png' },
        { id: 2, name: 'Moda', icon: '/path/to/fashion-icon.png' },
        // Agrega más categorías según sea necesario
    ];

    return (
        <div className="popular-categories">
            <h2>Categorías Populares</h2>
            <div className="categories-container">
                {categories.map(category => (
                    <div key={category.id} className="category-card">
                        <img src={category.icon} alt={category.name} className="category-icon" />
                        <p className="category-name">{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;
