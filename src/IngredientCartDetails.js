import React from "react";
import './IngredientCartDetails.css';
import { connect } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { removeIngredient, clearAllIngredients, closeMobileCartModal, recipesWithIng } from './redux/actionCreators';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

function mapStateToProps(state) {
    const { selectedIngredients } = state;
    return { ingredients: selectedIngredients }
}

function IngredientCartDetails(props) {

    function clearCart() {
        props.clearAllIngredients();
        props.closeMobileCartModal();
    }

    return (
        <div className="ingredient-cart-details">
            <div className="cart-details-title" onClick={() => props.toggleHandler()}>
                <ArrowForwardIosIcon fontSize="small" id="forward-arrow"/>
                <p> Cart </p>
            </div>
            <div>
                {props.ingredients.map(function(ingredient, i) {
                    return <div key={i} className="cart-details-item">
                        <p> { ingredient.name } </p>
                        <Tooltip title="Remove ingredient">
                            <CancelIcon
                                htmlColor="#dc2a27"
                                onClick={() => props.removeIngredient(ingredient.id)}
                                fontSize="medium"
                                className="cancel-icon"
                            />
                        </Tooltip>
                    </div>;
                })}
                <div className="clear-cart" onClick={clearCart}>
                    <Tooltip title="Clear all cart items">
                        <DeleteIcon fontSize="large"/>
                    </Tooltip>
                    Clear cart
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, {
    removeIngredient, 
    clearAllIngredients, 
    closeMobileCartModal,
    recipesWithIng
})
(IngredientCartDetails);
