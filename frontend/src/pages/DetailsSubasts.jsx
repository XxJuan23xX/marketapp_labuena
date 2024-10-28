import React, { useState, useEffect } from "react";
import "../pages/DetailsSubastas.css";
import Navbar from "../components/navbar/navbarComponent";

const DetailsSubastas = () => {
    const [selectedImage, setSelectedImage] = useState("https://m.media-amazon.com/images/I/61ME8jRwbVL._AC_UF894,1000_QL80_.jpg");
    const [timeRemaining, setTimeRemaining] = useState(32 * 60 + 42); // Inicializa en 32 minutos y 42 segundos
    const [price, setPrice] = useState(322.68); // Precio base por unidad
    const [quantity, setQuantity] = useState(1); // Cantidad inicial
    const [totalPrice, setTotalPrice] = useState(price); // Precio total inicial
    const [activeTab, setActiveTab] = useState("description"); // Estado para la pestaña activa

    const thumbnails = [
        "https://m.media-amazon.com/images/I/61ME8jRwbVL._AC_UF894,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/61DIPt9DAHL._AC_UF894,1000_QL80_.jpg",
        "https://ss628.liverpool.com.mx/xl/1112123896.jpg",
        "https://ss628.liverpool.com.mx/xl/1112123896.jpg",
    ];

    // Función para convertir el tiempo en formato mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Efecto para disminuir el tiempo cada segundo
    useEffect(() => {
        if (timeRemaining > 0) {
            const intervalId = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timeRemaining]);

    // Efecto para actualizar el precio total basado en la cantidad
    useEffect(() => {
        setTotalPrice(price * quantity);
    }, [quantity, price]);

    // Función para incrementar la cantidad
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Función para disminuir la cantidad
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    };

    return (
        <div className="details-subastas-container">

            <Navbar />

            {/* Bloque de Imágenes y Detalles del Producto */}
            <div className="product-section">
                <div className="product-display">
                    <img
                        src={selectedImage}
                        alt="MacBook Pro"
                        className="product-image-large"
                    />
                    <div className="thumbnail-gallery">
                        {thumbnails.map((thumbnail, index) => (
                            <img
                                key={index}
                                src={thumbnail}
                                alt={`Thumbnail ${index + 1}`}
                                className={selectedImage === thumbnail ? "active" : ""}
                                onClick={() => setSelectedImage(thumbnail)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-info">
                    <h2>2023 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 512GB SSD Storage) - Space Gray</h2>
                    <div className="ratings">
                        <span>⭐ 6,280 ratings / 341 answered questions</span>
                    </div>
                    <div className="total-price">
                        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                    </div>
                    <div className="price">
                        <div className="quantity-selector">
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    </div>
                    <div className="product-details">
                        <p><strong>Brand:</strong> Apple</p>
                        <p><strong>Series:</strong> MacBook Pro</p>
                        <p><strong>Screen Size:</strong> 13.3 Inches</p>
                        <p><strong>Color:</strong> Silver</p>
                        <p><strong>Hard Disk Size:</strong> 128 GB</p>
                        <p><strong>CPU Model:</strong> Intel Core i5-4430</p>
                        <p><strong>RAM Memory:</strong> 8 GB</p>
                    </div>
                    <button className="bid-button">Submit A Bid</button>
                </div>
            </div>

            {/* Bloque de Detalles de la Subasta */}
            <div className="auction-details">
                <h3>Apple Macbook Pro Laptop</h3>
                <div className="auction-info">
                    <div className="current-price">
                        <p>Current Price</p>
                        <h2>US $700.00</h2>
                        <p>Buyer's Premium: 20.00%</p>
                        <p>Bid Increment (US): $70.00</p>
                    </div>
                    <div className="auction-timer">
                        <p>This Auction Ends in:</p>
                        <h2 className="timer">{formatTime(timeRemaining)}</h2>
                        <p>78 Active Bidders</p>
                        <p>678 Watching</p>
                        <p>100 Total Bids</p>
                    </div>
                </div>
                <input type="text" placeholder="Enter your bid amount" className="bid-input"/>
                <button className="submit-bid">Submit A Bid</button>
                <div className="auction-actions">
                    <button className="buy-now">Buy Now: $4,200</button>
                    <button className="wishlist">Add To Wishlist</button>
                    <div className="share">
                        <span>Share to:</span>
                        <i className="fa fa-facebook"></i>
                        <i className="fa fa-instagram"></i>
                        <i className="fa fa-twitter"></i>
                        <i className="fa fa-linkedin"></i>
                    </div>
                </div>
            </div>

            {/* Sección de Pestañas */}
            <div className="tabs-container">
                <div className="tabs">
                    <button 
                        className={activeTab === "description" ? "tab active" : "tab"} 
                        onClick={() => setActiveTab("description")}
                    >
                        DESCRIPTION
                    </button>
                    <button 
                        className={activeTab === "delivery" ? "tab active" : "tab"} 
                        onClick={() => setActiveTab("delivery")}
                    >
                        DELIVERY OPTIONS
                    </button>
                    <button 
                        className={activeTab === "bidHistory" ? "tab active" : "tab"} 
                        onClick={() => setActiveTab("bidHistory")}
                    >
                        BID HISTORY (40)
                    </button>
                    <button 
                        className={activeTab === "questions" ? "tab active" : "tab"} 
                        onClick={() => setActiveTab("questions")}
                    >
                        QUESTIONS
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === "description" && (
                        <div className="tab-panel">
                            <h3>Description</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>
                    )}
                    {activeTab === "delivery" && (
                        <div className="tab-panel">
                            <h3>Delivery Options</h3>
                            <p>Information about shipping and delivery options...</p>
                        </div>
                    )}
                    {activeTab === "bidHistory" && (
                        <div className="tab-panel">
                            <h3>Bid History</h3>
                            <p>Details about previous bids and bidding activity...</p>
                        </div>
                    )}
                    {activeTab === "questions" && (
                        <div className="tab-panel">
                            <h3>Questions</h3>
                            <p>Common questions and answers about the product...</p>
                        </div>
                    )}
                </div>
            </div> 
            <div className="contact-section">
            <div className="contact-info">
                <h3>Contact Us</h3>
                <p>📞 +1 559 154 2587</p>
                <p>✉️ example@mail.com</p>
            </div>
            <div className="social-media">
                <h3>Follow Us</h3>
                <p>📘 Facebook</p>
                <p>🐦 Twitter</p>
                <p>🎮 Twitch</p>
                <p>📺 Youtube</p>
            </div>
        </div>
        </div>
        
        
    );
};

export default DetailsSubastas;
