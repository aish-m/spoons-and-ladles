import { CHANGE_CURRENT_TAB } from './actionTypes';

const initialState = {
    currentTab: 0,
    recipesList: [],
    loggedIn: false
};

function reducers(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENT_TAB:
            return Object.assign({}, state, {
                currentTab: action.payload.currentTab
            });
        default:
            return state
    }
}

export default reducers;
