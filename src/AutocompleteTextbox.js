import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AutocompleteTextbox.css';
import Button from "@material-ui/core/Button";
import { selectIngredient } from './redux/actionCreators';
import { connect } from 'react-redux';

function AutocompleteTextbox(props) {
    let selectedIngredientName;
    let inputFieldElement;

    function submitIngredient(ingredientName) {
        let selectedIngredientObject = {
            ingredientName: ingredientName
        };
        props.ingredients.map(option => {
            if (option.ingredientName === ingredientName) {
                selectedIngredientObject.ingredientId =  option.ingredientId;
            }
        });
        // console.log('selectedIngredientId: ' + selectedIngredientObject.ingredientId);
        // console.log('selectedIngredientName: ' + selectedIngredientObject.ingredientName);
        if(selectedIngredientObject.ingredientName === undefined)
            console.log('TO DO: handle this scenario!');
        else
            props.selectIngredient(selectedIngredientObject);
        let inputNode = document.getElementById('ingredient-autocomplete-field');
        inputNode.value = '';
    }

    function clearText() {
        let inputNode = document.getElementById('ingredient-autocomplete-field');
        inputNode.value = '';
    }

    return (
        <div className="autocomplete-ingredients">
            <Autocomplete
                id="ingredient-autocomplete-field"
                freeSolo
                options={props.ingredients.map(option => option.ingredientName)}
                onChange={(event, value) => {selectedIngredientName = value; inputFieldElement = event.target;}}
                onFocus={() => clearText()}
                renderInput={params => (
                    <TextField {...params} label="Enter Ingredient Name" margin="normal" variant="outlined" fullWidth={false}/>
                )}
            />
            <Button variant="contained" id="select-ingredient-button" onClick={() => submitIngredient(selectedIngredientName)}>ADD</Button>
        </div>
    )
}

export default connect(null, { selectIngredient })(AutocompleteTextbox);
