import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbarComponent"; // Importación de Navbar
import "../pages/AllProducts.css";
import Footer from "../components/footer/Footer";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    // Array de productos con tipo: 'auction' para subastas y 'sale' para ventas
    const productData = [
        { id: 1, name: "4K Dual Camera Foldable Toy Drones", type: "auction", currentBid: 14750, timeRemaining: "00 : 00 : 00" },
        { id: 2, name: "Apple MacBook Air Laptop 2022", type: "sale", price: 1850 },
        { id: 3, name: "Foldable Drone with 4K Pro Camera", type: "auction", currentBid: 24500, timeRemaining: "00 : 00 : 00" },
        { id: 4, name: "Smart Watch Series 6", type: "sale", price: 299 },
        { id: 5, name: "Gaming Chair with RGB Lighting", type: "sale", price: 399 },
        { id: 6, name: "Canon EOS R6 Mirrorless Camera", type: "auction", currentBid: 3250, timeRemaining: "02 : 45 : 10" },
        { id: 7, name: "Dell XPS 15 Laptop", type: "sale", price: 2200 },
        { id: 8, name: "Electric Scooter Model X1", type: "auction", currentBid: 550, timeRemaining: "03 : 20 : 30" },
        { id: 9, name: "Bluetooth Wireless Earbuds", type: "sale", price: 75 },
        { id: 10, name: "Sony 55-inch 4K Ultra HD TV", type: "auction", currentBid: 1250, timeRemaining: "01 : 15 : 05" },
        { id: 11, name: "Samsung Galaxy S21 Ultra", type: "sale", price: 999 },
        { id: 12, name: "Apple iPad Pro 11-inch", type: "sale", price: 850 },
        { id: 13, name: "DJI Mini 2 Drone", type: "auction", currentBid: 450, timeRemaining: "04 : 10 : 00" },
        { id: 14, name: "Xbox Series X Console", type: "sale", price: 499 },
        { id: 15, name: "GoPro HERO9 Action Camera", type: "auction", currentBid: 350, timeRemaining: "06 : 30 : 00" },
        { id: 16, name: "Nike Air Max Sneakers", type: "sale", price: 120 },
        { id: 17, name: "Logitech G502 Gaming Mouse", type: "sale", price: 60 },
        { id: 18, name: "Dyson V11 Vacuum Cleaner", type: "auction", currentBid: 300, timeRemaining: "05 : 25 : 45" },
        { id: 19, name: "PlayStation 5 Console", type: "sale", price: 499 },
        { id: 20, name: "OLED Gaming Monitor 27-inch", type: "auction", currentBid: 950, timeRemaining: "02 : 00 : 00" },
    ];

    // Mezcla aleatoria de productos al montar el componente
    useEffect(() => {
        const shuffledProducts = productData.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
    }, []);

    return (
        <div className="subastas-container">
            <Navbar />

            <div className="subastas-controls">
                <div className="select-box">
                    <label>Sort By :</label>
                    <select>
                        <option>All</option>
                        <option>Ropa</option>
                        <option>Tecnologia</option>
                        <option>Juguetes</option>
                    </select>
                </div>

                <div className="search-box">
                    <input type="text" placeholder="Item Name..." />
                    <button>🔍</button>
                </div>
            </div>

            {/* Sección de Tarjetas de Productos */}
            <div className="auction-cards">
                {products.map((product) => (
                    <div key={product.id} className="auction-card">
                        {/* Ícono de martillo para subastas */}
                        {product.type === "auction" && <div className="hammer-icon">🔨</div>}
                        <div className="placeholder-image"></div>
                        <h3>{product.name}</h3>
                        <div className="dotted-line"></div>

                        {/* Información específica para subastas o ventas */}
                        {product.type === "auction" ? (
                            <>
                                <div className="info-section">
                                    <span>Current Bid:</span>
                                    <span className="bid-amount">${product.currentBid} (USD)</span>
                                </div>
                                <div className="info-section">
                                    <span>Ends In:</span>
                                    <span className="time-remaining">{product.timeRemaining}</span>
                                </div>
                                <button className="bid-button">Submit A Bid</button>
                            </>
                        ) : (
                            <>
                                <div className="info-section">
                                    <span>Price:</span>
                                    <span className="sale-price">${product.price} (USD)</span>
                                </div>
                                <button className="buy-button">Buy Now</button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="pagination-container">
                <button className="pagination-button">❮</button>
                <button className="pagination-number">01</button>
                <button className="pagination-number active">02</button>
                <button className="pagination-number">03</button>
                <button className="pagination-number">04</button>
                <button className="pagination-number">05</button>
                <button className="pagination-button">❯</button>
            </div>

           <Footer></Footer>
        </div>
    );
};

export default AllProducts;
