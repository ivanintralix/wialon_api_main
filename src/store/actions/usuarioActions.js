import { 
    SAVE_TOKEN,
    GET_TOKEN,
    LOGOUT,
    START_SAVE_TOKEN,
    SAVE_USER,
} from '../types';

export function startSaveTokenAction() {
    return (dispatch) => {
        dispatch({
            type : START_SAVE_TOKEN
        });
    }
}

export function saveTokenAction(token) {
    return (dispatch) => {
        dispatch({
            type : SAVE_TOKEN,
            payload : token
        });
    }
}

export function logoutAction() {
    return (dispatch) => {
        dispatch({
            type : LOGOUT
        });
    }
}

export function saveUserAction(user) {
    return (dispatch) => {
        dispatch({
            type : SAVE_USER,
            payload : user
        });
    }
}