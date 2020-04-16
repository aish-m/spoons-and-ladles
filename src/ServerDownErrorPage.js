import React, { useEffect } from 'react';
import {NavLink} from "react-router-dom";
import serverDown from './images/serverDown.gif';
import Button from "@material-ui/core/Button";
import './ServerDownErrorPage.css';

function ServerDownErrorPage() {
    useEffect(() => {
        console.log("Component mounted!");
    }, []);

    return(
        <div className="server-down">
            <img
                src={serverDown}
                alt="Server Down"
            />
            <div className="server-down-text">
                <div id="text">
                    Don't fret! <br/> <br/>
                    Ms. Sassy Hass' minions are at work to fix the problem and bring Spoons & Ladles back up! <br/>
                    But you know, there’s always the
                    <a href="https://www.doordash.com/en-US" target="_blank" rel="noopener noreferrer"> easier option </a>.
                </div>
                <NavLink to="/" className="nav-links">
                    <Button variant="contained"
                            id="goBackHomeButton"
                            size="large"
                    >
                        GO BACK HOME
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}

export default ServerDownErrorPage;
