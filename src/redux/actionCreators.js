import {
    CHANGE_CURRENT_TAB,
    SELECT_INGREDIENT,
    REMOVE_INGREDIENT,
    CLEAR_ALL_INGREDIENTS,
    TOGGLE_INF_MODAL,
    OPEN_MOBILE_CART_MODAL,
    CLOSE_MOBILE_CART_MODAL,
    LOOKUP_RECIPES,
    TOGGLE_LOGGED_IN_FLAG,
    LOG_USER_IN,
    SET_EXPERT_CHEF_FLAG
} from './actionTypes'

export const changeTabValue = newTabId => ({
    type: CHANGE_CURRENT_TAB,
    payload: {
        currentTab: newTabId
    }
});

export const selectIngredient = ingredient => ({
    type: SELECT_INGREDIENT,
    payload: {
        ingredientId: ingredient.ingredientId,
        ingredientName: ingredient.ingredientName
    }
});

export const removeIngredient = ingredientId => ({
    type: REMOVE_INGREDIENT,
    payload: {
        ingredientId: ingredientId
    }
});

export const clearAllIngredients = () => ({
    type: CLEAR_ALL_INGREDIENTS
});

export const toggleInfModal = () => ({
    type: TOGGLE_INF_MODAL
});

export const openMobileCartModal = () => ({
    type: OPEN_MOBILE_CART_MODAL
});

export const closeMobileCartModal = () => ({
    type: CLOSE_MOBILE_CART_MODAL
});

export const lookupRecipes = () => ({
    type: LOOKUP_RECIPES
});

export const toggleUserLogin = () => ({
   type: TOGGLE_LOGGED_IN_FLAG
});

export const logUserIn = userDetails => ({
    type: LOG_USER_IN,
    payload: userDetails
});

export const setExpertChefFlag = isExpert => ({
    type: SET_EXPERT_CHEF_FLAG,
    payload: isExpert
});
