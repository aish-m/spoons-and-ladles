import React from "react";
import { connect } from 'react-redux';
import './IngredientCart.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const mapStateToProps = state => ({
    selectedIngredients: state.selectedIngredients
});

function IngredientCart(props) {
    return (
        <div onClick={() => props.toggleHandler()} className="ingredient-cart">
            <div className="cart-title">
                <ArrowBackIosIcon fontSize="medium"/>
                <p> Cart </p>
            </div>
            <div className="cart-content">
                {props.selectedIngredients.map(function (ingredient, i) {
                    return <div key={i} className="cart-item"> {ingredient.name} </div>
                })}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, null)(IngredientCart);
