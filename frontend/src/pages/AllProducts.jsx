import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar/navbarComponent";
import "../pages/AllProducts.css";
import Footer from "../components/footer/Footer";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AllProducts = () => {
    const { userId } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [favorites, setFavorites] = useState({});
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const toggleFavorite = (productId) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [productId]: !prevFavorites[productId]
        }));
    };

    const goToDetails = (productId) => {
        navigate(`/detallesallproducts/${productId}`);
    };

    // Filtrar productos según el tipo, categoría y seller_id
    const filteredProducts = products.filter(product => {
        const sellerId = product.seller_id._id || product.seller_id;
        return (selectedCategory === "All" || product.category === selectedCategory) &&
               (selectedType === "All" || product.type === selectedType) &&
               (sellerId.toString() !== userId.toString());
    });

    return (
        <div className="all-products-container">
            <Navbar />
            <div className="subastas-controls">
                <div className="filter-buttons">
                    <button 
                        className={`filter-button ${selectedType === "venta" ? "active" : ""}`} 
                        onClick={() => setSelectedType("venta")}
                    >
                        Venta
                    </button>
                    <button 
                        className={`filter-button ${selectedType === "subasta" ? "active" : ""}`} 
                        onClick={() => setSelectedType("subasta")}
                    >
                        Subasta
                    </button>
                </div>

                <div className="select-box">
                    <label>Sort By :</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="search-box">
                    <input type="text" placeholder="Item Name..." />
                    <button>🔍</button>
                </div>
            </div>

            <div className="product-list">
    <h2>Productos en Venta</h2>
    <div className="auction-cards">
        {filteredProducts.map(product => (
            <div key={product._id} className="auction-card" onClick={() => goToDetails(product._id)}>
                <img 
                    src={`http://localhost:5000/${product.images[0]}`} 
                    alt={product.name} 
                    className="placeholder-image" 
                />
                <h3>{product.name}</h3>
                <div className="dotted-line"></div>

                <div className="hover-text">
                    <span className="hover-icon">⏸️</span> Hover Me
                </div>
                
                <div className="info-section">
                    <span>Precio:</span>
                    <span className="sale-price">${product.price}</span>
                </div>
            </div>
        ))}
    </div>
</div>


            <Footer />
        </div>
    );
};

export default AllProducts;
