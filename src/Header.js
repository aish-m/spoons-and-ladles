import React from "react";
import mascot from "./images/mascot.png";
import text from "./images/snl-text.png";
import HomeIcon from '@material-ui/icons/Home';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './Header.css';
import { connect } from 'react-redux';
import { changeTabValue } from './redux/actionCreators';
import SearchIcon from '@material-ui/icons/Search';
import user from './images/user-icon.png';
import andy from './images/andy-samberg.jpg';
import boyle from './images/boyle.jpeg';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const mapStateToProps = state => ({
    currentTab: state.currentTab,
    loggedIn: state.loggedIn,
    isExpert: state.isUserExpert,
    selectedIngredientsCount: state.selectedIngredients.length
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
                        <div className="search-bar">
                            <SearchIcon fontSize="large"/>
                            <input type="search" placeholder="Search..."/>
                        </div>
                    </div>
                </div>
                <div className="sticky-nav-bar">
                    <div onClick={() => props.changeTabValue(0)} id="home-icon">
                        <HomeIcon htmlColor="white" fontSize="large"/>
                    </div>
                    <div className="material-ui-tabs">
                        <Tabs
                            value={props.currentTab - 1}
                            aria-label="tabs for home page"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: '#b6e64f',
                                    height: '3px'
                                }
                            }}
                        >
                            <Tab id="look-up-recipes-tab" label="add ingredients" onClick={() => props.changeTabValue(1)}/>
                            <Tab id="recipes-tab" label="recipes" onClick={() => props.changeTabValue(2)}/>
                            <Tab id="submit-a-recipe-tab" label="Submit A Recipe" onClick={() => props.changeTabValue(3)}/>
                            {(props.loggedIn && props.isExpert) ?
                            <Tab id="evaluate-recipes-tab" label="Evaluate Recipes" onClick={() => props.changeTabValue(4)}/>:
                                null }
                        </Tabs>
                    </div>
                    <MenuIcon id="hamburger-icon" htmlColor="white" fontSize="large"/>
                    <SearchIcon fontSize="large" onClick={() => console.log("Search mobile..")} id="mobile-search-icon" htmlColor="white"/>
                    {props.loggedIn ? <img className="user-icon" src={user} alt="user profile" onClick={() => console.log("User options mobile")}/> : null }
                    <div id="ingredient-cart-div">
                        <ShoppingCartIcon fontSize="large" onClick={() => console.log("Cart mobile")} id="mobile-cart-icon" htmlColor="white"/>
                        <div id="cart-count"> { props.selectedIngredientsCount } </div>
                    </div>
                </div>
        </header>
    )
}

export default connect(mapStateToProps, { changeTabValue })(Header);
