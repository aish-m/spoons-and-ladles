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

const mapStateToProps = state => ({
    currentTab: state.currentTab
});

function Header(props) {
    return (
        <header>
            <Router>
                <div className="non-sticky-header">
                    <div className="logo-and-text" onClick={() => props.changeTabValue(0)}>
                        <img id="mascot" src={mascot} alt="Spoons & Ladles mascot"/>
                        <img id="company-name" src={text} alt="Spoons & Ladles text" />
                    </div>
                </div>
                <div className="sticky-nav-bar">
                    <HomeIcon htmlColor="white" fontSize="large" onClick={() => props.changeTabValue(0)} style={{cursor: "pointer"}}/>
                    <Tabs
                        className="mui-tabs"
                        value={props.currentTab}
                        aria-label="tabs for home page"
                        //TabIndicatorProps={}
                    >
                        <Tab label="Look Up Recipes" component={Link} to="/lookup-recipes" onClick={() => props.changeTabValue(0)}/>
                        <Tab label="Submit A Recipe" component={Link} to="/submit-a-recipe" onClick={() => props.changeTabValue(1)}/>
                        <Tab label="Evaluate Recipes" component={Link} to="/evaluate-recipes" onClick={() => props.changeTabValue(2)}/>
                    </Tabs>
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

export default connect(
    mapStateToProps,
    { changeTabValue }
    )(Header);
