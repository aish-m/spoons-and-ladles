import React from "react";
import AutocompleteTextbox from "./AutocompleteTextbox";
import IngredientPicker from "./IngredientPicker";
import IngredientCart from "./IngredientCart";
import './IngredientSelection.css';

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
        fetch("http://localhost:8080/api/ingredients/getAll")
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

        fetch("http://localhost:8080/api/ingredients/getTopTwelve")
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
    }

    render() {
        return (
            <div  className="main-div">
                <div className="ingredient-selection-div">
                    <AutocompleteTextbox ingredients = {this.state.ingredients} />
                    OR
                    <IngredientPicker
                        topIngredients = {this.state.topIngredients}
                    />
                </div>
                <div  className="ingredient-display-div">
                    <IngredientCart />
                </div>
            </div>
        )
    }
}

export default IngredientSelection;
