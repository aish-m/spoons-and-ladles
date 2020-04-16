import {
    CHANGE_CURRENT_TAB,
    SELECT_INGREDIENT,
    REMOVE_INGREDIENT,
    CLEAR_ALL_INGREDIENTS,
    TOGGLE_INF_MODAL,
    OPEN_MOBILE_CART_MODAL,
    CLOSE_MOBILE_CART_MODAL,
    RECIPES_WITH_ING,
    RECIPES_WITHOUT_ING,
    UPDATE_RECIPES,
    SHOW_ING_ALERT,
    STOP_ING_ALERT,
    TOGGLE_LOGGED_IN_FLAG,
    SET_USER,
    RESET_USER,
    SET_EXPERT_CHEF_FLAG,
    SET_REDIRECT_URL
} from './actionTypes';

const initialState = {
    currentTab: -1,
    recipesList: [],
    loggedIn: false,
    loggedInUser: {
        firstName: 'User',
        pictureLink: 'user-icon.png'
    },
    isUserExpert: false,
    selectedIngredients: [],
    showAllRecipes: false,
    isIngredientNotFoundModalOpen: false,
    isMobileCartModalOpen: false,
    showIngAlert: false,
    redirectUrl: ""
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
        
        case RECIPES_WITH_ING: {
            return Object.assign({}, state, {
                showAllRecipes: false,
            });
        }

        case RECIPES_WITHOUT_ING: {
            return Object.assign({}, state, {
                showAllRecipes: true,
            })
        }

        case UPDATE_RECIPES: {
            return Object.assign({}, state, {
                recipesList: action.payload,
            });
        }


        case SHOW_ING_ALERT: {
            return Object.assign({}, state, {
                showIngAlert: true,
            })
        }

        case STOP_ING_ALERT: {
            return Object.assign({}, state, {
                showIngAlert: false,
            })
        }

        case TOGGLE_LOGGED_IN_FLAG: {
            const toggledState = !state.loggedIn;
            return Object.assign({}, state, {
                loggedIn: toggledState
            });
        }

        case SET_USER: {
            return Object.assign({}, state, {
                loggedInUser: action.payload
            });
        }

        case RESET_USER: {
            return Object.assign({}, state, {
                loggedInUser: {
                    firstName: 'User',
                    pictureLink: 'user-icon.png'
                }
            });
        }

        case SET_EXPERT_CHEF_FLAG: {
            return Object.assign({}, state, {
                isUserExpert: action.payload
            }); 
        }

        case SET_REDIRECT_URL: {
            return Object.assign({}, state, {
                redirectUrl: action.payload
            });
        }

        default:
            return state;
    }
}

export default reducers;
