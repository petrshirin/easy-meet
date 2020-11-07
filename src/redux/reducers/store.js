import { createStore } from 'redux';
import {LOGIN, OPEN_EVENT} from "../actions";

export const USER_DATA_STORAGE_KEY = 'USER_DATA_STORAGE_KEY'
export const USER_OPENED_TASK = 'USER_OPENED_TASK'



let initialState = {
    userToken: 'qwertyuiop',
    eventId: 0
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(action.userToken))
            console.log('login action finished')
            return {
                ...state,
                userToken: action.userToken,
            }
        case OPEN_EVENT:
            localStorage.setItem(USER_OPENED_TASK, JSON.stringify(action.eventId))
            console.log('change event action finished')
            return {
                ...state,
                userToken: action.userToken,
            }
        default:
            return state
    }
}

