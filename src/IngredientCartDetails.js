import React from "react";
import './IngredientCartDetails.css';
import { connect } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { removeIngredient, clearAllIngredients, closeMobileCartModal, lookupRecipes } from './redux/actionCreators';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';

function mapStateToProps(state) {
    const { selectedIngredients } = state;
    return { ingredients: selectedIngredients }
}

function IngredientCartDetails(props) {

    function clearCart() {
        props.clearAllIngredients();
        props.closeMobileCartModal();
    }

    function lookupRecipes() {

        fetch("http://localhost:8080/api/recipes/getAll")
            .then(res => {
                if(res.ok) return res.json();
                else throw new Error ("Oops, something went wrong...");
            })
            .then((data) => this.setState({
                isLoading: false,
                recipesList: data,
            }))
            .catch((error) => this.setState({
                error,
                isLoading: false,
            }));
        props.lookupRecipes();
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
                <div className="find-recipes" onClick={props.lookupRecipes}>
                    <Tooltip title="Lookup Recipes">
                        <SearchIcon
                                fontSize="large"
                                className="lookup-icon"
                        />
                    </Tooltip>
                    Lookup Recipes
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, {
    removeIngredient, 
    clearAllIngredients, 
    closeMobileCartModal,
    lookupRecipes,
})
(IngredientCartDetails);
