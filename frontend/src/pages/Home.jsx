// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/home/BannerCarousel';
import DailyDeals from '../components/home/DailyDeals';
import PopularCategories from '../components/home/PopularCategories';
import Recommendations from '../components/home/Recommendations';
import CategoryCarousel from '../components/home/CategoryCarousel';
import SpecialOffers from '../components/home/SpecialOffers';
import './Home.css';
import Navbar from '../components/navbar/navbarComponent';
import Footer from '../components/footer/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <Banner />
            <DailyDeals />
            <PopularCategories />
            <Recommendations />
            <CategoryCarousel />
            <SpecialOffers />
            <Footer></Footer>
        </div>
    );
};

export default Home;
