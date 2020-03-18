import { CHANGE_CURRENT_TAB, SELECT_INGREDIENT, REMOVE_INGREDIENT } from './actionTypes';

const initialState = {
    currentTab: 0,
    recipesList: [],
    loggedIn: false,
    selectedIngredients: []
};

function reducers(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENT_TAB:
            return Object.assign({}, state, {
                currentTab: action.payload.currentTab
            });
        case SELECT_INGREDIENT: {
            let selectedIngredientsList = [...state.selectedIngredients, {
                id: action.payload.ingredientId,
                name: action.payload.ingredientName
            }];
            return Object.assign({}, state, {
                selectedIngredients: selectedIngredientsList
            });
        }
        case REMOVE_INGREDIENT: {
            const newIngredientsList = state.selectedIngredients.filter( ingredient => ingredient.id !== action.payload.ingredientId );

            return Object.assign({}, state, {
                selectedIngredients: newIngredientsList
            });
        }
        default:
            return state
    }
}

export default reducers;
