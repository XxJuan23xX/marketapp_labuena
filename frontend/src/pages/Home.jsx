// pages/HomePage.js
import React from "react";
import Navbar from "../components/navbar/navbarComponent";
import AnimatedBackground from "../components/backgroundHome/AnimatedBackground";
import FirstContentSection from "../components/ContentHome/FirstContentSection";
import SecondContentSection from "../components/ContentHome/SecondContentSection";
import MysteryBoxComponent from "../components/MysteryBoxAnimation/MysteryBoxComponent";
import Footer from "../components/footer/Footer";
import './Home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <AnimatedBackground />
      <FirstContentSection />
      <SecondContentSection />
      <MysteryBoxComponent />
      <Footer />
    </div>
  );
};

export default HomePage;
