// components/FirstContentSection.js
import React from "react";
import Img1 from "../../assets/v1.avif";
import Img2 from "../../assets/v2.webp";
import Img3 from "../../assets/v3.avif";
import "./ContentSection.css";

const FirstContentSection = () => {
  return (
    <div className="content-section">
      <h2>A Familiar World... Set on a Different Path.</h2>
      <div className="image-grid">
        <div className="image-item">
          <img src={Img1} alt="Image 1" />
          <p>Isolated within the New Eden safe zone, you witness humanity struggling to avoid descending into chaos.</p>
        </div>
        <div className="image-item">
          <img src={Img2} alt="Image 2" />
          <p>Animus Character</p>
        </div>
        <div className="image-item">
          <img src={Img3} alt="Image 3" />
          <p>Trailer V.004</p>
        </div>
      </div>
    </div>
  );
};

export default FirstContentSection;
