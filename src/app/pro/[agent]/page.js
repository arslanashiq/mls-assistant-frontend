"use client"
import MobileMenu from "@/components/common/mobile-menu";
import React from "react";
import Footer from "@/components/common/default-footer";
import Cta from "@/components/home/home-v2/Cta";
import dynamic from 'next/dynamic';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
import { useAppContext } from "@/custom-hooks/AppContext";
const Explore = dynamic(() => import('@/components/home/home-v2/Explore'));
const Header = dynamic(() => import('@/components/home/home-v2/Header'));
const About = dynamic(() => import('@/components/home/home-v2/about'));
const Hero = dynamic(() => import('@/components/home/home-v2/hero'));
const FeaturedListings = dynamic(() => import('@/components/home/home-v2/FeatuerdListings'));

// export const metadata = {
//   title: "MLS Assistant ",
// };

const Home_V2 = () => {
  const { isLoggedIn, handleOpenLoginModal, currentDomain, isDomainAvailable, proUsername, isProUser, matchedJsonObject } = useAppContext();
  return (
    <>
      <Header />
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          <div className='swiper-slide' style={{backgroundImage: 'url("/images/stock-photo-1.jpg")', height: '500px'}}></div>
          <div className='swiper-slide' style={{backgroundImage: 'url("/images/stock-photo-4.jpg")', height: '500px'}}></div>
          <div className='swiper-slide' style={{backgroundImage: 'url("/images/stock-photo-5.jpg")', height: '500px'}}></div>
        </div>
        <div className='swiper-content static'>
          <div className='container'>
            <div className='copy theme lightFontColor'>
              <h1>The path to success starts here.</h1>
              <p>Starter is a premium real estate template designed to meet your needs.</p>
            </div>
          </div>
        </div>
      </div>
      <Hero />
      <div className="container mt80 mt-md-0" dangerouslySetInnerHTML={{ __html: matchedJsonObject?.websiteContent }}></div>

      <div className='featured properties'>
        <div className='container py-3'>
          <div className='headline'>
            <h2 className="">Featured Listings</h2>
          </div>
          <div className='row'>
            <FeaturedListings/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home_V2;
