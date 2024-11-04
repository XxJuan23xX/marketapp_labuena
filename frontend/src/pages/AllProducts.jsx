import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar/navbarComponent";
import "../pages/AllProducts.css";
import Footer from "../components/footer/Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AllProducts = () => {
    const { userId } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("venta"); // Mostrar "venta" por defecto
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const goToDetails = (productId) => {
        navigate(`/detallesallproducts/${productId}`);
    };

    const getAuctionStatus = (auctionEndTime) => {
        const now = new Date();
        const endDate = new Date(auctionEndTime);

        if (now >= endDate) {
            return "Subasta finalizada";
        } else {
            return "Subasta en curso";
        }
    };

    // Filtrar productos según el tipo y la categoría seleccionada
    const filteredProducts = products.filter(product => 
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.type === selectedType &&
        (product.seller_id._id || product.seller_id) !== userId
    );

    return (
        <div className="all-products-container">
            <Navbar />
            <div className="filters-container">
                <div className="type-filter">
                    <button 
                        className={`type-button ${selectedType === "venta" ? "active" : ""}`} 
                        onClick={() => handleTypeChange("venta")}
                    >
                        Venta
                    </button>
                    <button 
                        className={`type-button ${selectedType === "subasta" ? "active" : ""}`} 
                        onClick={() => handleTypeChange("subasta")}
                    >
                        Subasta
                    </button>
                </div>
                <div className="category-filter">
                    <button 
                        className={`category-button ${selectedCategory === "All" ? "active" : ""}`} 
                        onClick={() => handleCategoryChange("All")}
                    >
                        Todas
                    </button>
                    {categories.map(category => (
                        <button 
                            key={category._id} 
                            className={`category-button ${selectedCategory === category.name ? "active" : ""}`} 
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="product-section">
                <h2 className="section-title">
                    {selectedType === "venta" ? "Productos en Venta" : "Productos en Subasta"}
                </h2>
                <div className="auction-cards">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="auction-card" onClick={() => goToDetails(product._id)}>
                            <div className="product-image-container">
                                <img 
                                    src={product.images[0]} 
                                    alt={product.name} 
                                    className="product-image" 
                                />
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-category">Categoría: {product.category}</p>
                            
                            {product.type === 'venta' ? (
                                <>
                                    <p className="product-price">Precio: ${product.price}</p>
                                    <p className="product-status">Aún en venta</p>
                                </>
                            ) : (
                                <>
                                    <p className="product-price">Precio inicial: ${product.startingPrice}</p>
                                    <p className="product-status">
                                        {product.auctionEndTime 
                                            ? getAuctionStatus(product.auctionEndTime) 
                                            : 'Fecha de finalización no disponible'}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AllProducts;
