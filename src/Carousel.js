import React from "react";
import one from './images/carousel/1.png';
import two from './images/carousel/2.png';
import three from './images/carousel/3.png';
import four from './images/carousel/4.png';
import oneMobile from './images/mobile-carousel/1.png';
import twoMobile from './images/mobile-carousel/2.png';
import threeMobile from './images/mobile-carousel/3.png';
import fourMobile from './images/mobile-carousel/4.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';

function ImageCarousel() {
    return(
        <div className="carousel-div">
            <Carousel
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                useKeyboardArrows={true}
                autoPlay={true}
                interval={4000}
                transitionTime={1000}
                className="desktop-carousel"
            >
                <div>
                    <img src={one} alt="Carousel 1" className="carousel-image"/>
                </div>
                <div>
                    <img src={two} alt="Carousel 2" className="carousel-image"/>
                </div>
                <div>
                    <img src={three} alt="Carousel 3" className="carousel-image"/>
                </div>
                <div>
                    <img src={four} alt="Carousel 4" className="carousel-image"/>
                </div>
            </Carousel>

            <div id="mobile-image-grid">
                <img src={oneMobile} alt="Carousel mobile 1" className="mobile-carousel-image"/>
                <img src={twoMobile} alt="Carousel mobile 2" className="mobile-carousel-image"/>
                <img src={threeMobile} alt="Carousel mobile 3" className="mobile-carousel-image"/>
                <img src={fourMobile} alt="Carousel mobile 4" className="mobile-carousel-image"/>
            </div>
        </div>
    )
}

export default ImageCarousel;
