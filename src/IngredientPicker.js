import React from "react";
import './IngredientCartDetails.css';
import './IngredientPicker.css';
import { connect } from 'react-redux';
import { selectIngredient, removeIngredient } from './redux/actionCreators';
import AutocompleteTextbox from "./AutocompleteTextbox";

const mapStateToProps = state => ({
    selectedIngredients: state.selectedIngredients
});

function IngredientPicker(props) {

    function addOrRemoveIngredient(ingredient) {
        let isAdded = false;
        // eslint-disable-next-line array-callback-return
        props.selectedIngredients.map(function(ing) {
            if (ing.id === ingredient.ingredientId) isAdded = true;
        });
        isAdded ? props.removeIngredient(ingredient.ingredientId) : props.selectIngredient(ingredient);
    }

    function computeClassName(ingredient) {
        let matches = false;
        // eslint-disable-next-line array-callback-return
        props.selectedIngredients.map(function(ing) {
            if(ing.id === ingredient.ingredientId) matches = true;
        });

        return matches ? "checked-icon checked" : "checked-icon";
    }

    return (
        <div className="picker-div">
            <div className="picker-title"> PICK INGREDIENTS </div>
            <AutocompleteTextbox ingredients={props.ingredients}/>
            <div className="image-picker">
                { props.topIngredients === undefined ?
                    <p> Loading... </p> :
                props.topIngredients.map(function (ingredient, i) {
                    return <div key={i} className="ingredient-info">
                        <img
                            src={require("./images/Ingredients/" + ingredient.pictureLink)}
                            alt={ingredient.ingredientName}
                            className="ingredient-images"
                            onClick={() => addOrRemoveIngredient(ingredient)}
                        />
                        <img
                            src={require("./images/Ingredients/checked.png")}
                            alt="Check mark"
                            className={computeClassName(ingredient)}
                            id={"checked-icon-" + ingredient.ingredientName}
                        />
                        <div> { ingredient.ingredientName } </div>
                    </div>;
                })
                }
            </div>
        </div>
    )
}

export default connect(mapStateToProps, { selectIngredient, removeIngredient })(IngredientPicker);
