import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import "../pages/PopularProducts.css";

const BASE_URL = 'https://api.mercadolibre.com/sites/MLA/search?q=';

const PopularProducts = () => {
    const [categories, setCategories] = useState([]); // Para las categorías disponibles
    const [selectedCategory, setSelectedCategory] = useState(""); // La categoría seleccionada
    const [products, setProducts] = useState([]); // Productos de la API
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar categorías disponibles
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`${BASE_URL}${category}`);
            const data = await response.json();
            setProducts(data.results);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            // Redirigir y cargar productos de la categoría seleccionada
            fetchProductsByCategory(selectedCategory);
        }
    };

    return (
        <div className="popular-products-container">
            <Navbar />
            <div className="form-container">
                <h2>Buscar productos populares</h2>
                <form onSubmit={handleSubmit}>
                    <div className="category-select">
                        <label htmlFor="category">Selecciona una categoría</label>
                        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Selecciona una categoría</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </div>

            <div className="product-list">
                {products.length > 0 ? (
                    <div className="products">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.thumbnail} alt={product.title} className="product-image" />
                                <h3>{product.title}</h3>
                                <p>Precio: ${product.price}</p>
                                <a href={product.permalink} target="_blank" rel="noopener noreferrer">Ver más</a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay productos disponibles para esta categoría.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PopularProducts;
