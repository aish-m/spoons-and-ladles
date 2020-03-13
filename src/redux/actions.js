import { CHANGE_CURRENT_TAB } from './actionTypes'

export const changeTabValue = newTabId => ({
    type: CHANGE_CURRENT_TAB,
    payload: {
        currentTab: newTabId
    }
});
