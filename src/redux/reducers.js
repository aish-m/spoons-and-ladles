import {
    CHANGE_CURRENT_TAB,
    SELECT_INGREDIENT,
    REMOVE_INGREDIENT,
    CLEAR_ALL_INGREDIENTS,
    TOGGLE_INF_MODAL,
    OPEN_MOBILE_CART_MODAL,
    CLOSE_MOBILE_CART_MODAL,
    LOOKUP_RECIPES,
    NEW_SEARCH,
} from './actionTypes';

const initialState = {
    currentTab: 0,
    recipesList: [],
    loggedIn: true,
    isUserExpert: true,
    selectedIngredients: [],
    showAllRecipes: true,
    isIngredientNotFoundModalOpen: false,
    isMobileCartModalOpen: false,
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
        case OPEN_MOBILE_CART_MODAL: {
            return Object.assign({}, state, {
                isMobileCartModalOpen: true
            });
        }
        case CLOSE_MOBILE_CART_MODAL: {
            return Object.assign({}, state, {
                isMobileCartModalOpen: false
            });
        }
        case LOOKUP_RECIPES: {
            let recipesFound = action.payload.map(recipe =>
                recipesFound.add({
                recipeId: recipe.recipeId,
                instructions: recipe.instructions,
                pictureLink: recipe.pictureLink,
                keywords: recipe.keywords,
                prepTime: recipe.prepTime,
                userId: recipe.userId,
                numberOfReviewers: recipe.numberOfReviewers,
                servings: recipe.servings,
                rating: recipe.rating,
            }));
            return Object.assign({}, state, {
                recipesList: recipesFound
            });
        }

        case NEW_SEARCH: {
            return Object.assign({}, state, {
                recipesFound: []
            });
        }

        default:
            return state
    }
}

export default reducers;
