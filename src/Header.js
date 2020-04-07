import React from "react";
import mascot from "./images/mascot.png";
import text from "./images/snl-text.png";
import HomeIcon from '@material-ui/icons/Home';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './Header.css';
import { connect } from 'react-redux';
import { changeTabValue, openMobileCartModal, closeMobileCartModal } from './redux/actionCreators';
import SearchIcon from '@material-ui/icons/Search';
import user from './images/user-icon.png';
import cartIcon from './images/cart-icon.png';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from "@material-ui/core/Modal";
import noIngredients from "./images/no-ingredients.png";
import Button from "@material-ui/core/Button";
import IngredientCartDetails from "./IngredientCartDetails";

const mapStateToProps = state => ({
    currentTab: state.currentTab,
    loggedIn: state.loggedIn,
    isExpert: state.isUserExpert,
    selectedIngredientsCount: state.selectedIngredients.length,
    isMobileCartModalOpen: state.isMobileCartModalOpen,
    user: state.loggedInUser
});

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

    function renderLoginComponent() {
        document.getElementById("appMainContent").classList.add("login");
        document.getElementById("loginComponent").classList.add("login");
    }

    return (
        <header>
                <div className="non-sticky-header">
                    <div onClick={() => props.changeTabValue(0)} className="header-left">
                        <img id="mascot" src={mascot} alt="Spoons & Ladles mascot"/>
                        <img id="companyName" src={text} alt="Spoons & Ladles text" />
                    </div>
                    <div className="header-right">
                        <div className="search-bar">
                            <SearchIcon fontSize="large"/>
                            <input type="search" placeholder="Search..."/>
                        </div>
                    </div>
                </div>
                <div className="sticky-nav-bar">
                    <div onClick={() => props.changeTabValue(0)} id="homeIcon">
                        <HomeIcon htmlColor="white" fontSize="large"/>
                    </div>
                    <div className="material-ui-tabs">
                        <Tabs
                            value={() => {if(props.currentTab<=4 && props.currentTab>=1) return props.currentTab - 1}}
                            aria-label="tabs for home page"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: '#b6e64f',
                                    height: '3px'
                                }
                            }}
                        >
                            <Tab id="addIngredientsTab" label="add ingredients" onClick={() => props.changeTabValue(1)}/>
                            <Tab id="recipesTab" label="recipes" onClick={() => props.changeTabValue(2)}/>
                            <Tab id="submitRecipeTab" label="Submit A Recipe" onClick={() => props.changeTabValue(3)}/>
                            {(props.loggedIn && props.isExpert) ?
                            <Tab id="evaluateRecipesTab" label="Evaluate Recipes" onClick={() => props.changeTabValue(4)}/> :
                                null }
                        </Tabs>
                    </div>
                    <MenuIcon id="hamburgerIcon" htmlColor="white" fontSize="large" onClick={() => toggleHamburgerIcon()}/>
                    <SearchIcon fontSize="large" onClick={() => console.log("Search mobile..")} id="mobileSearchIcon" htmlColor="white"/>
                    {
                        props.loggedIn ?
                        <p id="helloUserText"> Hello, {props.user.firstName} </p> :
                        <Button variant="contained"
                                id="headerLoginSignupButton"
                                onClick={renderLoginComponent}
                        >
                            Log In/Sign up
                        </Button>
                    }
                    <div id="cartDiv" onClick={props.openMobileCartModal}>
                        <img src={cartIcon} alt="Ingredient cart" id="cartIcon"/>
                        <div id="cartCount"> { props.selectedIngredientsCount } </div>
                    </div>
                </div>
                <div id="mobileMenu" className="mobile-nav-bar desktop">
                    <ul>
                        <li onClick={() => props.changeTabValue(1)}> ADD INGREDIENTS </li>
                        <li onClick={() => props.changeTabValue(2)}> RECIPES </li>
                        <li onClick={() => props.changeTabValue(3)}> SUBMIT A RECIPE </li>
                        {(props.loggedIn && props.isExpert) ?
                            <li onClick={() => props.changeTabValue(4)}> EVALUATE RECIPES </li> : null
                        }
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
                                <Button className="ok-button" variant="contained"
                                        onClick={() => {
                                            props.closeMobileCartModal();
                                            props.changeTabValue(1);
                                            if(document.getElementById("mobileMenu").classList.contains("mobile")) {
                                                document.getElementById("mobileMenu").classList.remove("mobile");
                                                document.getElementById("mobileMenu").classList.add("desktop");
                                            }                                        }}>
                                    OK
                                </Button>
                            </div> :
                            <div className="cart-full-div">
                                <IngredientCartDetails
                                    toggleHandler = {props.closeMobileCartModal}
                                />
                            </div>
                    }
                </Modal>
        </header>
    )
}

export default connect(mapStateToProps, { changeTabValue, openMobileCartModal, closeMobileCartModal })(Header);
