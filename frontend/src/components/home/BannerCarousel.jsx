import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BannerCarousel.css';
import banner1 from '../../assets/banners/banner1.jpg';
import banner2 from '../../assets/banners/banner2.png';
import banner3 from '../../assets/banners/banner3.png';  // Asegúrate de importar el banner3

const banners = [
  { image: banner1, productId: '67296054fb4606e93299ba70', type: 'venta' },
  { image: banner2, productId: '6729652efb4606e93299bb4a', type: 'flash' }, // Este banner es de "Subasta Flash"
  { image: banner3, productId: null, type: 'flash' },  // Este banner también es de "Subasta Flash"
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const handleBannerClick = (productId, type) => {
    // Si es una "Subasta Flash", redirigimos a la página de productos con ese filtro
    if (type === 'flash') {
      navigate('/allderrapin', { state: { selectedType: 'flash' } });  // Pasa el estado para filtrar
    } 
  };

  return (
    <div className="banner-carousel">
      <div className="carousel-content">
        <button className="carousel-button1 left" onClick={handlePrevious}>&lt;</button>
        
        <img
          src={banners[currentIndex].image}
          alt={`Banner ${currentIndex + 1}`}
          className="banner-image"
          onClick={() => handleBannerClick(banners[currentIndex].productId, banners[currentIndex].type)}
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
