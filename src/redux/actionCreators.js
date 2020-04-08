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
    LOG_USER_IN,
    SET_EXPERT_CHEF_FLAG,
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

export const recipesWithIng = () => ({
    type: RECIPES_WITH_ING
});

export const recipesWithoutIng = () => ({
    type: RECIPES_WITHOUT_ING
});

export const showIngAlert = () => ({
    type: SHOW_ING_ALERT
});

export const stopIngAlert = () => ({
    type: STOP_ING_ALERT
});

export const updateRecipes = recipesList => ({
    type: UPDATE_RECIPES,
    payload: recipesList,
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

