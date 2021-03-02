import { 
    SAVE_TOKEN,
    LOGOUT,
    START_SAVE_TOKEN,
    SAVE_USER,
    LOGOUT_USUARIO
 } from '../types';

const initialState = {
    token : '',
    user : '',
    loading : false
}
export default function usuarioReducer(state = initialState, action) {
    switch (action.type) {
        case START_SAVE_TOKEN:
            return{
                ...state,
                loading: true
            }
        case SAVE_TOKEN:
            return{
                ...state,
                token: action.payload,
                loading: false
            }
        case LOGOUT:
            return{
                ...state,
                token: '',
                user: '',
                loading: false
            }
        case SAVE_USER:
            return{
                ...state,
                user : action.payload,
                loading: false
            }
        case LOGOUT_USUARIO:
            return state=initialState
        default:
            return state;
    }
}