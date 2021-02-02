import { 
    SAVE_TOKEN,
    GET_TOKEN,
    LOGOUT,
    START_SAVE_TOKEN,
    SAVE_USER
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
        default:
            return state;
    }
}