import React from "react";
import './IngredientCart.css';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import noIngredients from './images/no-ingredients.png';
import { removeIngredient, clearAllIngredients } from './redux/actionCreators';

function mapStateToProps(state) {
    const { selectedIngredients } = state;
    return { ingredients: selectedIngredients }
}

function IngredientCart(props) {

    function clearCart() {
        props.clearAllIngredients();
    }

    const content = (props.ingredients.length === 0) ?
        <div  className="no-ingredients">
            <img src={noIngredients} alt="No ingredients added"/>
        </div> :
        <div>
            {props.ingredients.map(function(ingredient, i) {
                return <div key={i} className="cart-item">
                    <p> { ingredient.name } </p>
                    <Button
                        variant="contained"
                        id="delete-ingredient"
                        size="small"
                        onClick={() => props.removeIngredient(ingredient.id)}
                    >
                        Remove
                    </Button>
                </div>;
            })}
            <div className="ingredient-options">
                <div className="submit-ingredients">
                    LOOK UP RECIPES
                </div>
                <div className="clear-cart" onClick={() => clearCart()}>
                    CLEAR CART
                </div>
            </div>
        </div>;

    return (
        <div className="ingredient-cart">
            <div className="cart-title"> Ingredient Cart </div>
            { content }
        </div>
    )
}

export default connect(mapStateToProps, { removeIngredient, clearAllIngredients })(IngredientCart);
