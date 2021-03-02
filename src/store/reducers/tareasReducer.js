import {
    START_GET_JOBS,
    GET_JOBS_EXITO,
    GET_JOBS_ERROR,
    LOGOUT_TAREAS,
    START_UPDATE_UNITS_JOBS,
    UPDATE_UNITS_JOBS_EXITO,
    UPDATE_UNITS_JOBS_ERROR
} from '../types';

const initialState = {
    tareas : [],
    loading : false
}
export default function tareasReducer(state = initialState, action) {
    switch (action.type) {
        case START_UPDATE_UNITS_JOBS:
        case START_GET_JOBS:
            return{
                ...state,
                loading : true
            }
        case GET_JOBS_EXITO:
            return{
                ...state,
                loading : false,
                tareas : action.payload
            }
        case UPDATE_UNITS_JOBS_ERROR:
        case GET_JOBS_ERROR:
            return{
                ...state,
                loading : false
            }
        case UPDATE_UNITS_JOBS_EXITO:
            return{
                ...state,
                loading : false,
                tareas : action.payload
            }
        case LOGOUT_TAREAS:
            return state= initialState
        default:
            return state;
    }
}