import React from "react";
import one from './images/carousel/1.png';
import two from './images/carousel/2.png';
import three from './images/carousel/3.png';
import four from './images/carousel/4.png';
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
            >
                <div>
                    <img src={one} alt="Carousel image 1" className="carousel-image"/>
                </div>
                <div>
                    <img src={two} alt="Carousel image 2" className="carousel-image"/>
                </div>
                <div>
                    <img src={three} alt="Carousel image 3" className="carousel-image"/>
                </div>
                <div>
                    <img src={four} alt="Carousel image 4" className="carousel-image"/>
                </div>
            </Carousel>
        </div>
    )
}

export default ImageCarousel;
