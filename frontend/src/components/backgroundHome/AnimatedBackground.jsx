// components/AnimatedBackground.js
import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/valo.webp"; // Ajusta la ruta de tu imagen
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  const [shrinkBackground, setShrinkBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShrinkBackground(true);
      } else {
        setShrinkBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`animated-background ${shrinkBackground ? "shrink" : ""}`}>
      <img src={backgroundImage} alt="Background" className="background-img" />
      <div className="text-container">
        <h1 className="main-title">MARKETAPP MX.</h1>
        <p className="subtext">
          Hechos para darle una segunda vida a tus productos.
        </p>
      </div>
    </div>
  );
};

export default AnimatedBackground;
