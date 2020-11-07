import { createStore } from 'redux';
import {LOGIN} from "../actions";

export const USER_DATA_STORAGE_KEY = 'USER_DATA_STORAGE_KEY'



let initialState = {
    userToken: 'qwertyuiop',
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
        default:
            return state
    }
}

