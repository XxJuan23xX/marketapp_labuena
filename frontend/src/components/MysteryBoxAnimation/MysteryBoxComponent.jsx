import React, { useState } from 'react';
import './MysteryBoxComponent.css';
import boxImage from '../../assets/box.jpeg'; // Imagen principal de la caja
import product1 from '../../assets/product1.webp'; // Imagen de producto 1
import product2 from '../../assets/product2.png'; // Imagen de producto 2
import product3 from '../../assets/product3.png'; // Imagen de producto 3

const MysteryBoxComponent = () => {
  const [isHolding, setIsHolding] = useState(false);

  const handleMouseDown = () => {
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
  };

  return (
    <div
      className={`mystery-box-container ${isHolding ? 'zoom' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img src={boxImage} alt="Mystery Box" className="box-image" />

      {isHolding && (
        <div className="products-display">
        <div className="product product1">
          <img src={product1} alt="Product 1" className="product-image" />
        </div>
        <div className="product product2">
          <img src={product2} alt="Product 2" className="product-image" />
        </div>
        <div className="product product3">
          <img src={product3} alt="Product 3" className="product-image" />
        </div>
      </div>
      
      )}
    </div>
  );
};

export default MysteryBoxComponent;
