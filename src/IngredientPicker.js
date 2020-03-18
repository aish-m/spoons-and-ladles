import React from "react";
import './IngredientCart.css';
import './IngredientPicker.css';
import { connect } from 'react-redux';
import { selectIngredient } from './redux/actionCreators';

function IngredientPicker(props) {

    function addIngredient(ingredient) {
        document.getElementById("checked-icon-" + ingredient.ingredientName).classList.add("checked");
        props.selectIngredient(ingredient);
    }

    return (
        <div className="picker-div">
            <div className="picker-title"> Pick Ingredients </div>
            <div className="image-picker">
                { props.topIngredients === undefined ?
                    <p> Loading... </p> :
                props.topIngredients.map(function (ingredient, i) {
                    return <div key={i} className="ingredient-info">
                        <img
                            src={require("./images/Ingredients/" + ingredient.pictureLink)}
                            alt={ingredient.ingredientName}
                            className="ingredient-images"
                            onClick={() => addIngredient(ingredient)}
                        />
                        <img
                            src={require("./images/Ingredients/checked.png")}
                            alt="Check mark"
                            className="checked-icon"
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

export default connect(null, { selectIngredient })(IngredientPicker);
