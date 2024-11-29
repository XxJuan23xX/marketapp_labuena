import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import "../pages/PopularProducts.css";

const BASE_URL = 'https://api.mercadolibre.com/sites/MLA/search?category=';

const PopularProducts = () => {
    const [categories, setCategories] = useState([]); // Para las categorías disponibles
    const [selectedCategory, setSelectedCategory] = useState(""); // La categoría seleccionada
    const [products, setProducts] = useState([]); // Productos de la API
    const [loading, setLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores
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

    const fetchProductsByCategory = async (categoryId) => {
        setLoading(true); // Activar el loading
        setError(null); // Limpiar cualquier error previo
        try {
            // Usar la categoría ID para filtrar los productos
            const response = await fetch(`${BASE_URL}${categoryId}`);
            const data = await response.json();
            
            // Verificamos que haya resultados antes de actualizar el estado
            if (data.results && data.results.length > 0) {
                setProducts(data.results); // Actualizar los productos con la respuesta de la API
            } else {
                setProducts([]); // No se encontraron productos
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            setError('Hubo un problema al cargar los productos. Intenta de nuevo.');
        } finally {
            setLoading(false); // Desactivar el loading
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
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

            {/* Mostrar errores si ocurre alguno */}
            {error && <p className="error-message">{error}</p>}

            {/* Mostrar productos o mensaje de carga */}
            <div className="product-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PopularProducts;
