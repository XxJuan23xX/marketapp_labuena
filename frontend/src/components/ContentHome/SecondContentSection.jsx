// components/SecondContentSection.js
import React from "react";
import Img1 from "../../assets/v1.avif";
import Img2 from "../../assets/v2.webp";
import Img3 from "../../assets/v3.avif";
import "./ContentSection.css";

const SecondContentSection = () => {
  return (
    <div className="content-section">
      <h2>Explore the New World... Dive Deeper.</h2>
      <div className="image-grid">
        <div className="image-item">
          <img src={Img1} alt="Image 1" />
          <p>Discover the hidden secrets of New Eden.</p>
        </div>
        <div className="image-item">
          <img src={Img2} alt="Image 2" />
          <p>Meet the Animus Creatures.</p>
        </div>
        <div className="image-item">
          <img src={Img3} alt="Image 3" />
          <p>Witness the Evolution of Humanity.</p>
        </div>
      </div>
    </div>
  );
};

export default SecondContentSection;
