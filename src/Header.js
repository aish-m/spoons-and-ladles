import React from "react";
import mascot from "./images/mascot.png";
import text from "./images/snl-text.png";
import HomeIcon from '@material-ui/icons/Home';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './Header.css';
import { connect } from 'react-redux';
import { changeTabValue } from './redux/actionCreators';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import user from './images/user-icon.png';

const mapStateToProps = state => ({
    currentTab: state.currentTab
});

function Header(props) {
    return (
        <header>
                <div className="non-sticky-header">
                    <div onClick={() => props.changeTabValue(0)} className="header-left">
                        <img id="mascot" src={mascot} alt="Spoons & Ladles mascot"/>
                        <img id="company-name" src={text} alt="Spoons & Ladles text" />
                    </div>
                    <div className="header-right">
                        <Button variant="contained" id="login-button" href="/submit-a-recipe">Log In</Button>
                        <div className="search-bar">
                            <SearchIcon fontSize="large"/>
                            <input type="search" placeholder="Search..."/>
                        </div>
                    </div>
                </div>
                <div className="sticky-nav-bar">
                    <div onClick={() => props.changeTabValue(0)} className="header-left">
                        <HomeIcon htmlColor="white" fontSize="large"/>
                    </div>
                    <div className="sticky-right">
                    <Tabs
                        value={props.currentTab}
                        aria-label="tabs for home page"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#b6e64f',
                                height: '3px'
                            }
                        }}
                    >
                        <Tab label="Look Up Recipes" onClick={() => props.changeTabValue(0)}/>
                        <Tab label="Submit A Recipe" onClick={() => props.changeTabValue(1)}/>
                        <Tab label="Evaluate Recipes" onClick={() => props.changeTabValue(2)}/>
                    </Tabs>
                    <img className="user-icon" src={user} alt="user profile"/>
                    </div>
                </div>
        </header>
    )
}

export default connect(mapStateToProps, { changeTabValue })(Header);
