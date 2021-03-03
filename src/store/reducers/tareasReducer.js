import {
    START_GET_JOBS,
    GET_JOBS_EXITO,
    GET_JOBS_ERROR,
    LOGOUT_TAREAS,
    START_UPDATE_UNITS_JOBS,
    UPDATE_UNITS_JOBS_EXITO,
    UPDATE_UNITS_JOBS_ERROR,
    START_UPDATE_JOBS,
    UPDATE_JOBS_EXITO,
    UPDATE_JOBS_ERROR,
    START_CREATE_JOBS,
    CREATE_JOBS_EXITO,
    CREATE_JOBS_ERROR
} from '../types';

const initialState = {
    tareas : [],
    loading : false
}
export default function tareasReducer(state = initialState, action) {
    switch (action.type) {
        case START_CREATE_JOBS:
        case START_UPDATE_JOBS:
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
        case CREATE_JOBS_ERROR:
        case UPDATE_JOBS_ERROR:
        case UPDATE_UNITS_JOBS_ERROR:
        case GET_JOBS_ERROR:
            return{
                ...state,
                loading : false
            }
        case CREATE_JOBS_EXITO:
        case UPDATE_JOBS_EXITO:
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