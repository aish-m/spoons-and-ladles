import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AutocompleteTextbox.css';
import Button from "@material-ui/core/Button";
import { selectIngredient, toggleInfModal } from './redux/actionCreators';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import notFound from './images/ingredient-not-found.png';

const mapStateToProps = state => ({
    addedIngredients: state.selectedIngredients,
    isModalOpen: state.isIngredientNotFoundModalOpen
});

function AutocompleteTextbox(props) {
    let selectedIngredientName;

    function submitIngredient(ingredientName) {
        let isAlreadyAdded = false;
        props.addedIngredients.map(ing => {
           if(ing.name === ingredientName)
               isAlreadyAdded = true;
        });

        if(!isAlreadyAdded) {
            let selectedIngredientObject = {
                ingredientName: ingredientName
            };
            props.ingredients.map(option => {
                if (option.ingredientName === ingredientName) {
                    selectedIngredientObject.ingredientId =  option.ingredientId;
                }
            });
            if(selectedIngredientObject.ingredientName === undefined)
                props.toggleInfModal();
            else
                props.selectIngredient(selectedIngredientObject);
        }
        clearText();
    }

    function clearText() {
        const nodes = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiAutocomplete-clearIndicator");
        nodes[0].click();
    }

    return (
        <div className="autocomplete-ingredients">
            <Autocomplete
                id="ingredient-autocomplete-field"
                freeSolo
                options={props.ingredients.map(option => option.ingredientName)}
                onChange={(event, value) => {selectedIngredientName = value}}
                onFocus={() => clearText()}
                renderInput={params => (
                    <TextField {...params}
                               onFocus={() => clearText()}
                               label="Enter Ingredient Name"
                               margin="normal"
                               variant="outlined"
                               fullWidth={false}
                    />
                )}
            />
            <Button variant="contained" id="select-ingredient-button" onClick={() => submitIngredient(selectedIngredientName)}>ADD</Button>
            <Modal
                open={props.isModalOpen}
                onClose={props.toggleInfModal}
            >
                <div className="modal-div">
                    <img src={notFound} alt="Input ingredient not found" />
                    <Button className="ok-button" variant="contained" onClick={props.toggleInfModal}>OK</Button>
                </div>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, { selectIngredient, toggleInfModal })(AutocompleteTextbox);
