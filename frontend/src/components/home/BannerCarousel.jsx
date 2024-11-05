import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BannerCarousel.css';
import banner1 from '../../assets/banners/banner1.jpg';
import banner2 from '../../assets/banners/banner2.png';

const banners = [
  { image: banner1, productId: '67296054fb4606e93299ba70' },
  { image: banner2, productId: '6729652efb4606e93299bb4a' },
];

const BannerCarousel = () => {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL); // Verifica el valor de la variable de entorno

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const handleBannerClick = (productId) => {
    navigate(`/detallesallproducts/${productId}`);
  };

  return (
    <div className="banner-carousel">
      <div className="carousel-content">
        <button className="carousel-button1 left" onClick={handlePrevious}>&lt;</button>
        
        <img
          src={banners[currentIndex].image}
          alt={`Banner ${currentIndex + 1}`}
          className="banner-image"
          onClick={() => handleBannerClick(banners[currentIndex].productId)}
          style={{ cursor: 'pointer' }}
        />
        
        <button className="carousel-button1 right" onClick={handleNext}>&gt;</button>
      </div>
      
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
