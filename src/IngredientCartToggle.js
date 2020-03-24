import React from "react";
import './IngredientCartToggle.css';
import { connect } from 'react-redux';
import IngredientCartDetails from "./IngredientCartDetails";
import IngredientCart from "./IngredientCart";

class IngredientCartToggle extends React.Component {
    constructor(props) {
        super(props);
        this.toggleCartDetails = this.toggleCartDetails.bind(this);
        this.state = {
            cartDetails: false
        };
    }

    static mapStateToProps(state) {
        return {
            selectedIngredients: state.selectedIngredients
        }
    }

    toggleCartDetails() {
        const areDetailsOpen = this.state.cartDetails;
        if(areDetailsOpen) {
            document.getElementById("picker").classList.remove("cart-details-open");
            document.getElementById("picker").classList.add("cart-open");
            document.getElementById("cart").classList.remove("cart-details-open");
            document.getElementById("cart").classList.add("cart-open");
        }
        else {
            document.getElementById("picker").classList.remove("cart-open");
            document.getElementById("picker").classList.add("cart-details-open");
            document.getElementById("cart").classList.remove("cart-open");
            document.getElementById("cart").classList.add("cart-details-open");
        }
        this.setState({ cartDetails: !areDetailsOpen});
    }

    render() {
        return (
            <div>
                {
                    this.state.cartDetails ?
                        <IngredientCartDetails toggleHandler={this.toggleCartDetails}/> :
                        <IngredientCart toggleHandler={this.toggleCartDetails}/>
                }
            </div>
        )
    }
}

export default connect(IngredientCartToggle.mapStateToProps, null)(IngredientCartToggle);
