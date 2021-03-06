import React, { useEffect } from "react";
import one from './images/carousel/1.jpg';
import two from './images/carousel/2.jpg';
import three from './images/carousel/3.jpg';
import four from './images/carousel/4.jpg';
import oneMobile from './images/mobile-carousel/1.png';
import twoMobile from './images/mobile-carousel/2.png';
import threeMobile from './images/mobile-carousel/3.png';
import fourMobile from './images/mobile-carousel/4.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { changeTabValue } from "./redux/actionCreators";

function ImageCarousel(props) {

    useEffect(()=> {
        props.changeTabValue(-1);
    }, []);

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
                <Link to="/addIngredients">
                    <div className="img-div">
                        <img src={one} alt="Carousel 1" className="carousel-image"/>
                    </div>
                </Link>
                <Link to="/recipes">
                    <div className="img-div">
                        <img src={two} alt="Carousel 2" className="carousel-image"/>
                    </div>
                </Link>
                <Link to="/submitRecipe">
                    <div className="img-div">
                        <img src={three} alt="Carousel 3" className="carousel-image"/>
                    </div>
                </Link>
                <div>
                    <img src={four} alt="Carousel 4" className="carousel-image"/>
                </div>
            </Carousel>

            <div id="mobile-image-grid">
                <Link to="/addIngredients">
                    <img src={oneMobile} alt="Carousel mobile 1" className="mobile-carousel-image"/>
                </Link>
                <Link to="/recipes">
                    <img src={twoMobile} alt="Carousel mobile 2" className="mobile-carousel-image"/>
                </Link>
                <Link to="/submitRecipe">
                    <img src={threeMobile} alt="Carousel mobile 3" className="mobile-carousel-image"/>
                </Link>
                <img src={fourMobile} alt="Carousel mobile 4" className="mobile-carousel-image"/>
            </div>
        </div>
    )
}

export default connect(null, { changeTabValue })(ImageCarousel);
