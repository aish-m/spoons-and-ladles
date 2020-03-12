import React from 'react';
import './App.css';
import mascot from './images/mascot.png';
import text from './images/text.png';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import IngredientSelection from './IngredientSelection';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SubmitRecipe from "./SubmitRecipe";
import EvaluateRecipe from "./EvaluateRecipe";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="non-sticky-header">
            <Link to='/'>
              <img id="mascot" src={mascot} alt="Spoons & Ladles mascot"/>
              <img id="company-name" src={text} alt="Spoons & Ladles text" />
            </Link>
          </div>
          <div className="sticky-nav-bar">
            <Link to="/">
              <HomeIcon htmlColor="white" fontSize="large" />
            </Link>
            <Tabs
                className="mui-tabs"
                aria-label="tabs for home page"
            >
              <Tab value={1} label="Look Up Recipes" component={Link} to="/lookup-recipes"/>
              <Tab value={2} label="Submit A Recipe" component={Link} to="/submit-a-recipe"/>
              <Tab value={3} label="Evaluate Recipes" component={Link} to="/evaluate-recipes"/>
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
        </header>
      </div>
    </Router>
  );
}

export default App;
