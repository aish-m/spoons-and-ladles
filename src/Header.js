import React from "react";
import mascot from "./images/mascot.png";
import text from "./images/snl-text.png";
import HomeIcon from '@material-ui/icons/Home';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import './Header.css';
import { connect } from 'react-redux';
import { openMobileCartModal, closeMobileCartModal, showIngAlert,
    stopIngAlert, recipesWithIng, recipesWithoutIng, setRedirectUrl,
    toggleUserLogin, resetUser, setExpertChefFlag } from './redux/actionCreators';
import SearchIcon from '@material-ui/icons/Search';
import cartIcon from './images/cart-icon.png';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from "@material-ui/core/Modal";
import noIngredients from "./images/no-ingredients.png";
import Button from "@material-ui/core/Button";
import IngredientCartDetails from "./IngredientCartDetails";
import {
    NavLink
} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withRouter } from 'react-router-dom';

function toggleUserOptionsMenu() {
    if(document.getElementById("userOptionsDiv").classList.contains("open")) {
        document.getElementById("userOptionsDiv").classList.remove("open");
        document.getElementById("expandMoreIcon").classList.remove("close");
        document.getElementById("expandLessIcon").classList.add("close");
    }
else {
        document.getElementById("userOptionsDiv").classList.add("open");
        document.getElementById("expandMoreIcon").classList.add("close");
        document.getElementById("expandLessIcon").classList.remove("close");
    }
}

const mapStateToProps = state => ({
    currentTab: state.currentTab,
    loggedIn: state.loggedIn,
    isExpert: state.isUserExpert,
    selectedIngredientsCount: state.selectedIngredients.length,
    isMobileCartModalOpen: state.isMobileCartModalOpen,
    ingredientsList: state.IngredientsList,
    selectedIngredients: state.selectedIngredients,
    showIngAlert: state.showIngAlert,
    user: state.loggedInUser
});

function styles() {
    let top = 0;
    let left = 0;
    let width = '15%';

    if(document.getElementById("userProfileRectangle") !== null) {
        const rectangle = document.getElementById("userProfileRectangle").getBoundingClientRect();
        top = rectangle.bottom;
        left = rectangle.left;
        width = document.getElementById("userProfileRectangle").offsetWidth + 40;
        console.log('width: ' + width);
    }

    return {
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        width: width
    }
}

function Header(props) {

    function toggleHamburgerIcon() {
        if(document.getElementById("mobileMenu").classList.contains("desktop")) {
            document.getElementById("mobileMenu").classList.remove("desktop");
            document.getElementById("mobileMenu").classList.add("mobile");
        }
        else if(document.getElementById("mobileMenu").classList.contains("mobile")) {
            document.getElementById("mobileMenu").classList.remove("mobile");
            document.getElementById("mobileMenu").classList.add("desktop");
        }
    }

    function logUserOut() {
        props.toggleUserLogin();
        props.resetUser();
        props.setExpertChefFlag(false);
        document.getElementById("userOptionsDiv").classList.remove("open");
        window.location.replace('/');
    }

    return (
        <header id="pageHeader">
                <div className="non-sticky-header">
                    <div className="header-left">
                        <NavLink to="/">
                            <img id="mascot" src={mascot} alt="Spoons & Ladles mascot"/>
                            <img id="companyName" src={text} alt="Spoons & Ladles text" />
                        </NavLink>
                    </div>
                    <div className="header-right">
                        <div className="search-bar">
                            <SearchIcon fontSize="large"/>
                            <input type="search" placeholder="Search..."/>
                        </div>
                        <div>
                            <NavLink className= "evaluateLink" to={"/admin"} className="nav-links" >
                                <Button className="admin" id="adminButton" variant="contained" color="primary"> ADMIN </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="sticky-nav-bar">
                    <div id="homeIcon">
                        <NavLink to="/">
                            <HomeIcon htmlColor="white" fontSize="large"/>
                        </NavLink>
                    </div>
                    <div className="material-ui-tabs">
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
                            <NavLink to="/addIngredients" className="nav-links" activeClassName="active-nav-links">
                                <Tab id="addIngredientsTab" label="add ingredients" />
                            </NavLink>
                            <NavLink to="/recipes" className="nav-links" activeClassName="active-nav-links">
                                <Tab id="recipesTab" label="recipes" />
                            </NavLink>
                            <Tab id="submitRecipeTab"
                                 label="Submit A Recipe"
                                 onClick={() => {
                                     if(!props.loggedIn) {
                                         props.setRedirectUrl('submitRecipe');
                                         props.history.push('login');
                                     }
                                     else window.location.replace('/submitRecipe');
                                 }}
                            />
                            {(!props.isExpert) ?
                                <NavLink to="/aboutus" className="nav-links" activeClassName="active-nav-links">
                                    <Tab id="aboutUs" label="about us" />
                                </NavLink> :
                                null }
                            {(props.loggedIn && props.isExpert) ?
                                <NavLink to="/evaluateRecipes" className="nav-links" activeClassName="active-nav-links">
                                    <Tab id="evaluateRecipesTab" label="Evaluate Recipes" />
                                </NavLink> :
                                null }
                            
                        </Tabs>
                    </div>
                    <MenuIcon id="hamburgerIcon" htmlColor="white" fontSize="large" onClick={() => toggleHamburgerIcon()}/>
                    <SearchIcon fontSize="large" onClick={() => console.log("Search mobile..")} id="mobileSearchIcon" htmlColor="white"/>
                    {
                        props.loggedIn ?
                            <div className="user-profile"
                                 id="userProfileRectangle"
                                 onClick={toggleUserOptionsMenu}
                            >
                                    <img
                                        src = {require("./images/Users/" + props.user.pictureLink)}
                                        alt="User's profile"
                                        className="user-icon"
                                    />
                                    <p id="helloUserText"> { props.user.firstName } </p>
                                    <ExpandMoreIcon id="expandMoreIcon" fontSize="large"/>
                                    <ExpandLessIcon id="expandLessIcon" fontSize="large" className="close"/>
                            </div>
                            :
                            <div className="header-login-buttons">
                                <NavLink to="/login" className="nav-links">
                                    <Button variant="contained"
                                            id="headerLoginButton"
                                            onClick={() => { props.setRedirectUrl(window.location.pathname) }}
                                    >
                                        Log In
                                    </Button>
                                </NavLink>
                                <NavLink to="/signup" className="nav-links">
                                    <Button variant="contained"
                                            id="headerSignupButton"
                                            onClick={() => { props.setRedirectUrl(window.location.pathname) }}
                                    >
                                        Sign Up
                                    </Button>
                                </NavLink>
                            </div>
                    }
                    <div id="cartDiv" onClick={props.openMobileCartModal}>
                        <img src={cartIcon} alt="Ingredient cart" id="cartIcon"/>
                        <div id="cartCount"> { props.selectedIngredientsCount } </div>
                    </div>
                </div>
                <div id="mobileMenu" className="mobile-nav-bar desktop">
                    <ul>
                        <li>
                            <NavLink to="/addIngredients" className="nav-links-mobile" activeClassName="active-nav-links-mobile"> ADD INGREDIENTS </NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipes" className="nav-links-mobile" activeClassName="active-nav-links-mobile"> RECIPES </NavLink>
                        </li>
                        <li>
                            <NavLink to="/submitRecipe" className="nav-links-mobile" activeClassName="active-nav-links-mobile"> SUBMIT A RECIPE </NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutus" className="nav-links-mobile" activeClassName="active-nav-links-mobile"> ABOUT US </NavLink>
                        </li>
                        {(props.loggedIn && props.isExpert) ?
                            <li>
                                <NavLink to="/evaluateRecipes" className="nav-links-mobile" activeClassName="active-nav-links-mobile"> EVALUATE RECIPES </NavLink>
                            </li> : null
                        }
                        <li>
                            <NavLink to="/admin" className="nav-links-mobile" activeClassName="active-nav-links-mobile">
                                ADMIN
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Modal
                    open={props.isMobileCartModalOpen}
                    onClose={props.closeMobileCartModal}
                >
                    {
                        props.selectedIngredientsCount === 0 ?
                            <div className="cart-empty-div">
                                <img src={noIngredients} alt="No ingredients added to cart" />
                                <NavLink to="/addIngredients" className="nav-links">
                                    <Button className="ok-button" variant="contained"
                                            onClick={() => {
                                                props.closeMobileCartModal();
                                                if(document.getElementById("mobileMenu").classList.contains("mobile")) {
                                                    document.getElementById("mobileMenu").classList.remove("mobile");
                                                    document.getElementById("mobileMenu").classList.add("desktop");
                                                }                                        }}>
                                        OK
                                    </Button>
                                </NavLink>
                            </div> :
                            <div className="cart-full-div">
                                <IngredientCartDetails
                                    toggleHandler = {props.closeMobileCartModal}
                                />
                            </div>
                    }
                </Modal>
                <div id="userOptionsDiv" className="user-options-div" style={styles()}>
                    <ul>
                        <li> My account </li>
                        <li> My recipes </li>
                        <li onClick={logUserOut}> Logout </li>
                    </ul>
                </div>
        </header>
    )
}

export default connect(mapStateToProps,
    { openMobileCartModal, closeMobileCartModal, showIngAlert,
        stopIngAlert, recipesWithIng, recipesWithoutIng, setRedirectUrl,
        toggleUserLogin, resetUser, setExpertChefFlag
    })(withRouter(Header));
