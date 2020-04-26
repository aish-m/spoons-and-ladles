import React, {useEffect} from "react";
import error404 from './images/error-404.gif';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import './Error404Page.css';
import mascot404 from './images/mascot-error-404.png';
import mascot from "./images/mascot.png";
import text from "./images/snl-text.png";

function Error404Page() {
    useEffect(() => {
        document.getElementById("pageHeader").classList.add("loginMode");
        document.getElementById("pageFooter").classList.add("loginMode");
    }, []);

    function displayHeadersAndFooters() {
        document.getElementById("pageHeader").classList.remove("loginMode");
        document.getElementById("pageFooter").classList.remove("loginMode");
    }

    return(
        <div className="error-404-div">
            <div className="header-left-error-404-page">
                <NavLink to="/">
                    <img id="error-page-mascot" src={mascot} alt="Spoons & Ladles mascot"/>
                    <img id="error-page-companyName" src={text} alt="Spoons & Ladles text" />
                </NavLink>
            </div>
            <div id="notFoundText"> Umm, are you sure you're on the right page? </div>
            <div id="notFoundTextSubtitle"> ERROR 404: Page Not found </div>
            <div id="404pageImages">
                {/*<img*/}
                {/*    src={mascot404}*/}
                {/*    alt="404 Error GIF"*/}
                {/*    id="mascotError404"*/}
                {/*/>*/}
                <img
                    src={error404}
                    alt="404 Error GIF"
                    className="error-404-gif"
                />
            </div>
           <NavLink to="/" className="nav-links">
                <Button variant="contained"
                        id="goBackToSnL"
                        size="large"
                        onClick={() => displayHeadersAndFooters()}
                >
                    RETURN TO HOME PAGE
                </Button>
            </NavLink>
        </div>
    )
}

export default Error404Page;
