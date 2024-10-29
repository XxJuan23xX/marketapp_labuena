// src/pages/DetallesAllProducts.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/navbarComponent";
import Footer from "../components/footer/Footer";
import axios from "axios";
import "../pages/DetallesAllProducts.css"; // Asegúrate de agregar estilos específicos para esta página.

const DetallesAllProducts = () => {
    const { productId } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    console.log("Product ID:", productId);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);

                setProduct(response.data);
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
            <div className="product-details-container">
                <h2>{product.name}</h2>
                <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
                <p>{product.description}</p>
                <p>Categoría: {product.category}</p>
                <p>Precio: ${product.price}</p>
                <p>Descuento: {product.discount}%</p>
                <p>Tipo: {product.type === 'venta' ? 'Venta' : 'Subasta'}</p>
                {product.type === 'subasta' && (
                    <>
                        <p>Precio inicial: ${product.startingPrice}</p>
                        <p>Finaliza en: {new Date(product.auctionEndTime).toLocaleString()}</p>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DetallesAllProducts;
