import { CHANGE_CURRENT_TAB, SELECT_INGREDIENT, REMOVE_INGREDIENT, CLEAR_ALL_INGREDIENTS, TOGGLE_INF_MODAL } from './actionTypes';

const initialState = {
    currentTab: 0,
    recipesList: [],
    loggedIn: false,
    selectedIngredients: [],
    isIngredientNotFoundModalOpen: false
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
        case CLEAR_ALL_INGREDIENTS: {
            return Object.assign({}, state, {
                selectedIngredients: []
            });
        }
        case TOGGLE_INF_MODAL: {
            const isOpen = !state.isIngredientNotFoundModalOpen;

            return Object.assign({}, state, {
                isIngredientNotFoundModalOpen: isOpen
            });
        }
        default:
            return state
    }
}

export default reducers;
