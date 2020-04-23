import React from 'react';
import './App.css';
import Header from "./Header";
import IngredientSelection from './IngredientSelection';
import SubmitRecipe from "./SubmitRecipe";
import EvaluateRecipe from "./EvaluateRecipe";
import ImageCarousel from './Carousel';
import Footer from "./Footer";
import LoginOrSignupPage from './LoginOrSignupPage';
import AboutUs from './AboutUs';
import RecipesPage from "./RecipesPage";
import ServerDownErrorPage from './ServerDownErrorPage';
import AdminPage from './AdminPage'
import {
    Route
} from "react-router-dom";
import RecipesGrid from "./RecipesGrid";

function App() {
      return (
          <div className="app">
              <Header/>
              <Route exact path="/" component={ImageCarousel} />
              <Route path="/addIngredients" component={IngredientSelection} />
              <Route path="/recipes" component={RecipesGrid} />
              <Route path="/submitRecipe" component={SubmitRecipe} />
              <Route path="/evaluateRecipes" component={EvaluateRecipe} />
              <Route path="/login" component={LoginOrSignupPage} />
              <Route path="/signup" component={LoginOrSignupPage} />
              <Route path="/aboutus" component={AboutUs} />
              <Route path={"/recipe/:id"} component={RecipesPage} />
              <Route path={"/serverError"} component={ServerDownErrorPage} />
              <Route path={"/evaluate/recipe/:id"} component={RecipesPage} />
              <Route path={"/admin"} component={AdminPage} />
              {/*<Route path="*" component={Error404Page} />*/}
              {/* TODO: Create a component for 404 page */}
              <Footer />
          </div>
      );
}

export default App;
