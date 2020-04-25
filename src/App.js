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
import MyRecipesPage from './MyRecipesPage'
import {
    Route, Switch
} from "react-router-dom";
import RecipesGrid from "./RecipesGrid";
import Error404Page from "./Error404Page";

function App() {
      return (
          <div className="app">
              <Header/>
              <Switch>
                  <Route exact path="/" component={ImageCarousel} />
                  <Route exact path="/addIngredients" component={IngredientSelection} />
                  <Route exact path="/recipes" component={RecipesGrid} />
                  <Route exact path="/submitRecipe" component={SubmitRecipe} />
                  <Route exact path="/evaluateRecipes" component={EvaluateRecipe} />
                  <Route exact path="/login" component={LoginOrSignupPage} />
                  <Route exact path="/signup" component={LoginOrSignupPage} />
                  <Route exact path="/aboutus" component={AboutUs} />
                  <Route exact path={"/recipe/:id"} component={RecipesPage} />
                  <Route exact path={"/serverError"} component={ServerDownErrorPage} />
                  <Route exact path={"/evaluate/recipe/:id"} component={RecipesPage} />
                  <Route exact path={"/admin"} component={AdminPage} />
                  <Route exact path={"/myRecipes"} component={MyRecipesPage} />
                  <Route exact path="*" component={Error404Page} />
              </Switch>
              <Footer />
          </div>
      );
}

export default App;
