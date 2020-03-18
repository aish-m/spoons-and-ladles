import React from 'react';
import './App.css';
import Header from "./Header";
import { connect } from 'react-redux';
import IngredientSelection from './IngredientSelection';
import SubmitRecipe from "./SubmitRecipe";
import EvaluateRecipe from "./EvaluateRecipe";

const mapStateToProps = state => ({
    currentTab: state.currentTab
});

function App(props) {
    const content = function () {
        switch (props.currentTab) {
            case 0: return <IngredientSelection />;
            case 1: return <SubmitRecipe/>;
            case 2: return <EvaluateRecipe/>;
            default: return <IngredientSelection />;
        }
    };

      return (
          <div className="app">
            <Header/>
              { content() }
          </div>
      );
}

export default connect(mapStateToProps, null)(App);
