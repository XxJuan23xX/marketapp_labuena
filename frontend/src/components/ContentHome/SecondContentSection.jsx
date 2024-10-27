import React, { useState, useEffect } from "react";
import Img1 from "../../assets/home6.jpg";
import Img2 from "../../assets/subastaaaa.jpg";
import Img3 from "../../assets/subasta3.jpg";
import "./ContentSection.css";

const SecondContentSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      image: Img1,
      description: "Cámara en óptimas condiciones y gran calidad para tomar fotos en HD con buen alcance."
    },
    {
      image: Img2,
      description: "Kit de herramientas surtido para todo tipo de tareas con refacciones incluidas."
    },
    {
      image: Img3,
      description: "Máquina de escribir antigua, en buen estado y funcional."
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
      <h2>Las Subastas del Momento.</h2>
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

export default SecondContentSection;
