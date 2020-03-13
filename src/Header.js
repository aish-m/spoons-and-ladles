import React from "react";
import mascot from "./images/mascot.png";
import text from "./images/text.png";
import HomeIcon from '@material-ui/icons/Home';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IngredientSelection from "./IngredientSelection";
import SubmitRecipe from "./SubmitRecipe";
import EvaluateRecipe from "./EvaluateRecipe";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Header.css';
import { connect } from 'react-redux';
import { changeTabValue } from './redux/actions';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import user from './images/user-icon.jpg';

const mapStateToProps = state => ({
    currentTab: state.currentTab
});

function Header(props) {
    return (
        <header>
            <Router>
                <div className="non-sticky-header">
                    <Link to='/' onClick={() => props.changeTabValue(0)} className="header-left">
                        <img id="mascot" src={mascot} alt="Spoons & Ladles mascot"/>
                        <img id="company-name" src={text} alt="Spoons & Ladles text" />
                    </Link>
                    <div className="header-right">
                        <Button variant="contained" id="login-button" href="/submit-a-recipe">Log In</Button>
                        <div className="search-bar">
                            <SearchIcon fontSize="large"/>
                            <input type="search" placeholder="Search..."/>
                        </div>
                    </div>
                </div>
                <div className="sticky-nav-bar">
                    <Link to='/' onClick={() => props.changeTabValue(0)}>
                        <HomeIcon htmlColor="white" fontSize="large"/>
                    </Link>
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
                        <Tab label="Look Up Recipes" component={Link} to="/lookup-recipes" onClick={() => props.changeTabValue(0)}/>
                        <Tab label="Submit A Recipe" component={Link} to="/submit-a-recipe" onClick={() => props.changeTabValue(1)}/>
                        <Tab label="Evaluate Recipes" component={Link} to="/evaluate-recipes" onClick={() => props.changeTabValue(2)}/>
                    </Tabs>
                    <img className="user-icon" src={user} alt="user profile"/>
                    </div>
                </div>
                <Switch>
                    <Route path="/lookup-recipes">
                        <IngredientSelection />
                    </Route>
                    <Route path="/submit-a-recipe">
                        <SubmitRecipe />
                    </Route>
                    <Route path="/evaluate-recipes">
                        <EvaluateRecipe />
                    </Route>
                </Switch>
            </Router>
        </header>
    )
}

export default connect(mapStateToProps, { changeTabValue })(Header);
