import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import "../pages/DetallesAllProducts.css";

// URL directa del backend
const BASE_URL = 'https://marketapp-backend.onrender.com';

const DetallesAllProducts = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/products/${productId}`);
                const productData = await response.json();
                setProduct(productData);
                setSelectedImage(productData.images[0]);

                if (productData.type === "subasta") {
                    const bidResponse = await fetch(`${BASE_URL}/api/bids/${productId}/bids`);
                    const bidData = await bidResponse.json();
                    if (bidData.length > 0) {
                        const maxBid = Math.max(...bidData.map(bid => bid.bidAmount));
                        setHighestBid(maxBid);
                    } else {
                        setHighestBid(productData.startingPrice);
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

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handlePurchase = async () => {
        try {
            if (!userId) {
                alert("Por favor inicia sesión para realizar la compra.");
                navigate("/login");
                return;
            }

            const orderData = {
                product_id: productId,
                buyer_id: userId,
                seller_id: product.seller_id?._id || product.seller_id,
                price: product.price,
            };

            console.log("Datos de la orden que se están enviando:", orderData);

            const response = await fetch(`${BASE_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert("¡Compra en proceso! El vendedor confirmará tu compra.");
            } else {
                console.error("Error al procesar la compra:", await response.json());
                alert("Hubo un problema al realizar la compra. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            alert("Hubo un problema al realizar la compra. Inténtalo de nuevo.");
        }
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
                            <button className="buy-button" onClick={handlePurchase}>Comprar</button>
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
