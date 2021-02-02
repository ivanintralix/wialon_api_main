import { 
    START_GET_GROUPS,
    GET_GROUPS_EXITO,
    GET_GROUPS_ERROR,
 } from '../types';

const initialState = {
    grupos : [],
    loading : false
}
export default function gruposReducer(state = initialState, action) {
    switch (action.type) {
        case START_GET_GROUPS:
            return{
                ...state,
                loading : true
            }
        case GET_GROUPS_EXITO:
            return{
                ...state,
                grupos: action.payload,
                loading : false
            }
        case GET_GROUPS_ERROR:
            return{
                ...state,
                loading : false
            }
        default:
            return state;
    }
}