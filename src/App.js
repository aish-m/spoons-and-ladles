import React from 'react';
import './App.css';
import Header from "./Header";
import IngredientSelection from './IngredientSelection';
import SubmitRecipe from "./SubmitRecipe";
import EvaluateRecipe from "./EvaluateRecipe";
import ImageCarousel from './Carousel';
import Footer from "./Footer";
import LoginOrSignupPage from './LoginOrSignupPage';
import {
    Route
} from "react-router-dom";
import RecipesGrid from "./RecipesGrid";

function App() {
      return (
          <div className="app">
              <div id="appMainContent">
                    <Header/>
                    <Route exact path="/" component={ImageCarousel} />
                    <Route path="/addIngredients" component={IngredientSelection} />
                    <Route path="/recipes" component={RecipesGrid} />
                    <Route path="/submitRecipe" component={SubmitRecipe} />
                    <Route path="/evaluateRecipes" component={EvaluateRecipe} />
                    <Footer />
              </div>
              <div id="loginComponent">
                  <LoginOrSignupPage />
              </div>
          </div>
      );
}

export default App;
