// components/AnimatedBackground.js
import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/home2.jpg"; // Ajusta la ruta de tu imagen
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  const [mainTitle, setMainTitle] = useState("");
  const [subText, setSubText] = useState("");
  const [shrinkBackground, setShrinkBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrinkBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fullTitle = "MARKET APP MX.";
    const fullSubText = "Hechos para darle una segunda vida a tus productos.";
    let titleIndex = 0;
    let subTextIndex = 0;

    const typeTitle = () => {
      if (titleIndex < fullTitle.length) {
        setMainTitle(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
        setTimeout(typeTitle, 150);
      } else {
        typeSubText();
      }
    };

    const typeSubText = () => {
      if (subTextIndex < fullSubText.length) {
        setSubText(fullSubText.slice(0, subTextIndex + 1));
        subTextIndex++;
        setTimeout(typeSubText, 100);
      }
    };

    // Iniciar el efecto de escritura
    typeTitle();
  }, []);

  return (
    <div className={`animated-background ${shrinkBackground ? "shrink" : ""}`}>
      <img src={backgroundImage} alt="Background" className="background-img" />
      <div className="text-container">
        <h1 className="main-title">{mainTitle}</h1>
        <p className="subtext">{subText}</p>
      </div>
    </div>
  );
};

export default AnimatedBackground;
