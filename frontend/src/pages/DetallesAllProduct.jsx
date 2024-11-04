import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { FaArrowLeft, FaHeart } from "react-icons/fa"; // Importa el ícono de corazón
import "../pages/DetallesAllProducts.css";

const DetallesAllProducts = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false); // Estado para el corazón

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data);
                setSelectedImage(response.data.images[0]);

                if (response.data.type === "subasta") {
                    const bidResponse = await axios.get(`http://localhost:5000/api/bids/${productId}/bids`);
                    if (bidResponse.data.length > 0) {
                        const maxBid = Math.max(...bidResponse.data.map(bid => bid.bidAmount));
                        setHighestBid(maxBid);
                    } else {
                        setHighestBid(response.data.startingPrice);
                    }
                }
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleEnterAuction = () => {
        navigate(`/auction/${productId}`);
    };

    // Función para cambiar el estado del ícono de favorito
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (!product) return <div>Cargando...</div>;

    return (
        <div className="full-screen">
            <Navbar />
            <div className="product-details-container">
                <div className="header">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Regresar
                    </button>
                </div>
                <div className="thumbnail-column">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="thumbnail-image"
                            onMouseEnter={() => setSelectedImage(img)}
                        />
                    ))}
                </div>

                <div className="main-image-container">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="main-image"
                        />
                    )}
                </div>

                <div className="product-info">
                    <div className="product-title">
                        <h2>{product.name}</h2>
                        <FaHeart
                            onClick={toggleFavorite}
                            className={`favorite-icon ${isFavorite ? "favorite" : ""}`}
                        />
                    </div>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">Categoría: {product.category}</p>

                    {product.type === "subasta" ? (
                        <>
                            <p className="product-price">Precio inicial: ${product.startingPrice}</p>
                            <p className="current-bid">Valor actual: ${highestBid}</p>
                        </>
                    ) : (
                        <p className="product-price">Precio: ${product.price}</p>
                    )}

                    <p className="product-stock">Stock: {product.stock}</p>
                    <p className="product-status">Estado: {product.isActive ? "Activo" : "Inactivo"}</p>

                    {product.seller_id && (
                        <>
                            <p>Vendido por: {product.seller_id.name}</p>
                            <p>Correo del vendedor: {product.seller_id.email}</p>
                        </>
                    )}

                    <div className="button-container">
                        {product.type === "venta" ? (
                            <button className="buy-button">Comprar</button>
                        ) : (
                            <button className="bid-button" onClick={handleEnterAuction}>
                                Entrar a Subasta
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetallesAllProducts;
