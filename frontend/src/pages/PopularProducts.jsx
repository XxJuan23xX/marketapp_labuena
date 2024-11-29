import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import "../pages/PopularProducts.css";

// Endpoint de la API de Mercado Libre para obtener productos
const BASE_URL = 'https://api.mercadolibre.com/sites/MLA/search?q=ropa&limit=10';  // Aquí se puede cambiar el término de búsqueda

const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await fetch(BASE_URL);
                const data = await response.json();
                
                // Aquí estamos mapeando la respuesta para mostrar solo los productos que necesitamos
                const products = data.results.map(product => ({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    category: product.category_id,
                    image: product.thumbnail,
                }));

                setPopularProducts(products);
            } catch (error) {
                console.error('Error al cargar los productos populares:', error);
            }
        };

        fetchPopularProducts();
    }, []);

    const goToProductDetails = (productId) => {
        navigate(`/detallesallproducts/${productId}`);
    };

    return (
        <div className="popular-products-container">
            <Navbar />

            <div className="popular-products-content">
                <h2 className="title">Productos Populares de Mercado Libre</h2>
                <div className="product-cards">
                    {popularProducts.length === 0 ? (
                        <p>No hay productos populares disponibles en este momento.</p>
                    ) : (
                        popularProducts.map(product => (
                            <div 
                                key={product.id} 
                                className="product-card" 
                                onClick={() => goToProductDetails(product.id)}
                            >
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="product-image" 
                                />
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-category">Categoría: {product.category}</p>
                                <p className="product-price">Precio: ${product.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PopularProducts;
