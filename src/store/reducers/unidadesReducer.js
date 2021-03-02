import { 
    START_GET_UNITS,
    GET_UNITS_EXITO,
    GET_UNITS_ERROR,
    PUT_UNITS_EXITO,
    PUT_UNITS_ERROR,
    LOGOUT_UNIDADES
 } from '../types';

const initialState = {
    unidades : [],
    loading : false
}
export default function unidadesReducer(state = initialState, action) {
    switch (action.type) {
        case START_GET_UNITS:
            return{
                ...state,
                loading : true
            }
        case GET_UNITS_EXITO:
            return{
                ...state,
                loading : false,
                unidades : action.payload
            }
        case GET_UNITS_ERROR:
            return{
                ...state,
                loading : false
            }
        case PUT_UNITS_EXITO:
            return{
                ...state,
                loading : false,
                unidades : action.payload
            }
        case PUT_UNITS_ERROR:
            return{
                ...state,
                loading : false
            }
        case LOGOUT_UNIDADES:
            return state=initialState
        default:
            return state;
    }
}