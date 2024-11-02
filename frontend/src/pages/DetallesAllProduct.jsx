// src/pages/DetallesAllProducts.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "../pages/DetallesAllProducts.css";

const DetallesAllProducts = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data);
                setSelectedImage(response.data.images[0]); // Setea la primera imagen como principal por defecto
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) return <div>Cargando...</div>;

    return (
        <div>
            <Navbar />
            {/* Botón de regresar */}
            <button className="back-button" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Regresar
            </button>

            <div className="product-details-container">
                {/* Columna de miniaturas */}
                <div className="thumbnail-column">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/${img}`}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className={`thumbnail-image ${selectedImage === img ? 'selected' : ''}`}
                            onClick={() => setSelectedImage(img)} // Cambia la imagen principal al hacer clic
                        />
                    ))}
                </div>

                {/* Contenedor de la imagen principal */}
                <div className="main-image-container">
                    {selectedImage && (
                        <img
                            src={`http://localhost:5000/${selectedImage}`}
                            alt={product.name}
                            className="main-image"
                        />
                    )}
                </div>

                {/* Información del producto */}
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">Categoría: {product.category}</p>
                    <p className="product-price">Precio: ${product.price}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                    <p className="product-status">Estado: {product.isActive ? "Activo" : "Inactivo"}</p>

                    {product.seller_id && (
                        <>
                            <p>Vendido por: {product.seller_id.name}</p>
                            <p>Correo del vendedor: {product.seller_id.email}</p>
                        </>
                    )}

                    <div className="button-container">
                        {product.type === 'venta' ? (
                            <button className="buy-button">Comprar</button>
                        ) : (
                            <button className="bid-button">Pujar</button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetallesAllProducts;
    