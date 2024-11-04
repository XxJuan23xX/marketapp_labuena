import React, { useEffect, useState } from 'react';
import api from '../../../api';
import './CategoriesSection.css';
import { FaLaptop, FaShoePrints, FaHome, FaSpa, FaTshirt } from 'react-icons/fa';

const categoryIcons = {
    "Electrónica": <FaLaptop />,
    "Calzado": <FaShoePrints />,
    "Hogar": <FaHome />,
    "Productos de belleza": <FaSpa />,
    "Ropa": <FaTshirt />
};

const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories'); // Endpoint para obtener categorías
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories-section">
            <h2 className="categories-title">Explora por Categoría</h2>
            <div className="categories-grid">
                {categories.slice(0, 5).map((category) => (
                    <div className="category-card" key={category._id}>
                        <div className="category-icon">
                            {categoryIcons[category.name] || <FaHome />} {/* Ícono por defecto */}
                        </div>
                        <h3 className="category-name">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
