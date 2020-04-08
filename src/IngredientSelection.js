import React from "react";
import IngredientPicker from "./IngredientPicker";
import './IngredientSelection.css';
import IngredientCartToggle from "./IngredientCartToggle";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import { changeTabValue } from './redux/actionCreators';

class IngredientSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ingredients: []
        };
    }

    componentDidMount() {
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/ingredients/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ingredientsIsLoaded: true,
                        ingredients: result
                    });
                },
                (error) => {
                    this.setState({
                        ingredientsIsLoaded: true,
                        error
                    });
                }
            );

        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/ingredients/getTopTwelve")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        areTop12Loaded: true,
                        topIngredients: result
                    });
                },
                (error) => {
                    this.setState({
                        areTop12Loaded: true,
                        error
                    });
                }
            );

        // Needed when component is re-loaded after switching tabs
        if(this.props.count !== 0) {
            document.getElementById("picker").classList.add("cart-open");
            document.getElementById("cart").classList.add("cart-open");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.count === 0 && this.props.count !== 0) {
            document.getElementById("picker").classList.add("cart-open");
            document.getElementById("cart").classList.add("cart-open");
        }
        if(prevProps.count !== 0 && this.props.count === 0) {
            if(document.getElementById("picker").classList.contains("cart-open")) {
                document.getElementById("picker").classList.remove("cart-open");
                document.getElementById("cart").classList.remove("cart-open");
            }
            else if(document.getElementById("picker").classList.contains("cart-details-open")) {
                document.getElementById("picker").classList.remove("cart-details-open");
                document.getElementById("cart").classList.remove("cart-details-open");
            }
        }
    }

    static mapStateToProps(state) {
        return {
            count: state.selectedIngredients.length
        }
    }

    render() {
        return (
            <div  className="main-div">
                <div className="ingredient-selection-div" id="picker">
                    <IngredientPicker
                        ingredients = {this.state.ingredients}
                        topIngredients = {this.state.topIngredients}
                    />
                </div>
                <div  className="ingredient-display-div" id="cart">
                    {
                        this.props.count !== 0 ?
                        <IngredientCartToggle/> :
                        null
                    }
                    
                    <Button variant="contained" id="lookup-recipes-button" onClick={() => this.props.changeTabValue(2)}>Lookup Recipes</Button>
                </div>
            </div>
        )
    }
}

export default connect(IngredientSelection.mapStateToProps, { changeTabValue })(IngredientSelection);
