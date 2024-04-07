import MobileMenu from "@/components/common/mobile-menu";
import React from "react";
import Footer from "@/components/common/default-footer";
import Cta from "@/components/home/home-v2/Cta";
import dynamic from 'next/dynamic';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

const Explore = dynamic(() => import('@/components/home/home-v2/Explore'));
const Header = dynamic(() => import('@/components/home/home-v2/Header'));
const About = dynamic(() => import('@/components/home/home-v2/about'));
const Hero = dynamic(() => import('@/components/home/home-v2/hero'));

export const metadata = {
  title: "MLS Assistant ",
};

const Home_V2 = () => {
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
      

      <div className='featured properties'>
        <div className='container'>
          <div className='headline'>
            <h2>Featured Listings</h2>
          </div>
          <div className='row'>
            <div className="property col-sm-12 col-md-6">
              <a href='single.html'>
                <div className='photo' style={{backgroundImage: 'url("/images/stock-photo-1.jpg")'}}>

                  <div className='mask'>
                    <div className='head'>
                      <div className='tag mr-auto theme darkFontColor'>Featured</div>
                      <div className='price ml-auto theme lightFontColor'>$1,525,000</div>
                    </div>
                    <div className='body'></div>
                    <div className='foot'>
                      <div className='address'>10 Nantasket Ave. Boston, MA</div>
                      <div className='remarks'><p>Spectacular high end renovation in the heart of Brighton.</p></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="footer-style1 at-home2 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Home_V2;
