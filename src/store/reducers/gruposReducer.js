import { 
    START_GET_GROUPS,
    GET_GROUPS_EXITO,
    GET_GROUPS_ERROR,
    START_PUT_GROUP,
    PUT_GROUP_EXITO,
    PUT_GROUP_ERROR,
    START_POST_GROUP,
    POST_GROUP_EXITO,
    POST_GROUP_ERROR,
    START_DELETE_GROUP,
    DELETE_GROUP_EXITO,
    DELETE_GROUP_ERROR,
    LOGOUT_GRUPOS
 } from '../types';

const initialState = {
    grupos : [],
    loading : false,
    loadingEquipos : false
}
export default function gruposReducer(state = initialState, action) {
    switch (action.type) {
        case START_DELETE_GROUP:
        case START_POST_GROUP:
        case START_PUT_GROUP:
            return{
                ...state,
                loadingEquipos : true
            }
        case START_GET_GROUPS:
            return{
                ...state,
                loading : true
            }
        case PUT_GROUP_EXITO:
        case GET_GROUPS_EXITO:
            return{
                ...state,
                grupos: action.payload,
                loading : false,
                loadingEquipos : false
            }
        case POST_GROUP_EXITO:
            return{
                ...state,
                grupos: [...state.grupos,action.payload],
                loading : false,
                loadingEquipos : false
            }
        case DELETE_GROUP_EXITO:
            return{
                ...state,
                grupos: state.grupos.filter( grupo => grupo.d.id !== action.payload ),
                loading : false,
                loadingEquipos : false
            }
        case DELETE_GROUP_ERROR:
        case POST_GROUP_ERROR:
        case PUT_GROUP_ERROR:
        case GET_GROUPS_ERROR:
            return{
                ...state,
                loading : false,
                loadingEquipos : false
            }
        case LOGOUT_GRUPOS:
            return state = initialState
        default:
            return state;
    }
}