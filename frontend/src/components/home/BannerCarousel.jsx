import React, { useState } from 'react';
import './BannerCarousel.css';
import banner1 from '../../assets/banners/banner1.jpg';
import banner2 from '../../assets/banners/banner2.png';

const banners = [banner1, banner2]; // Añade aquí todas tus imágenes de banners

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="banner-carousel">
      <div className="carousel-content">
        <button className="carousel-button left" onClick={handlePrevious}>&lt;</button>
        
        <img src={banners[currentIndex]} alt={`Banner ${currentIndex + 1}`} className="banner-image" />
        
        <button className="carousel-button right" onClick={handleNext}>&gt;</button>
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
