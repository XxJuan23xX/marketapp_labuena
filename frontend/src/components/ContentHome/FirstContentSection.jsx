import React, { useState, useEffect } from "react";
import Img1 from "../../assets/phone.png";
import Img2 from "../../assets/mario.jpg";
import Img3 from "../../assets/dino.jpg";
import "./ContentSection.css";

const FirstContentSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      image: Img1,
      description: "Celular marca Zero de medio uso pero en buenas condiciones."
    },
    {
      image: Img2,
      description: "Set de icónicos personajes de la franquicia Mario Bros en excelentes condiciones."
    },
    {
      image: Img3,
      description: "Dinosaurio de juguete de tamaño chico 30 x 15 cm."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [items.length]);

  return (
    <div className="content-section">
      <h2>Ven y Conoce las Ventas del Momento.</h2>
      <div className="image-grid">
        {items.map((item, index) => (
          <div
            className={`image-item ${index === currentIndex ? "active" : ""}`}
            key={index}
          >
            <img src={item.image} alt={`Image ${index + 1}`} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstContentSection;
