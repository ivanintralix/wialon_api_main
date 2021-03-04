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
    CREATE_JOBS_ERROR,
    START_DELETE_JOBS,
    DELETE_JOBS_EXITO,
    DELETE_JOBS_ERROR,
    START_ACTIVATE_JOBS,
    ACTIVATE_JOBS_EXITO,
    ACTIVATE_JOBS_ERROR,
    START_DEACTIVATE_JOBS,
    DEACTIVATE_JOBS_EXITO,
    DEACTIVATE_JOBS_ERROR
} from '../types';

const initialState = {
    tareas : [],
    loading : false,
    loadingData : false
}
export default function tareasReducer(state = initialState, action) {
    switch (action.type) {
        case START_ACTIVATE_JOBS:
        case START_DEACTIVATE_JOBS:
        case START_DELETE_JOBS:
        case START_CREATE_JOBS:
        case START_UPDATE_JOBS:
        case START_UPDATE_UNITS_JOBS:
            return{
                ...state,
                loadingData:true
            }
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
        case ACTIVATE_JOBS_ERROR:
        case DEACTIVATE_JOBS_ERROR:
        case DELETE_JOBS_ERROR:
        case CREATE_JOBS_ERROR:
        case UPDATE_JOBS_ERROR:
        case UPDATE_UNITS_JOBS_ERROR:
        case GET_JOBS_ERROR:
            return{
                ...state,
                loading : false,
                loadingData : false
            }
        case CREATE_JOBS_EXITO:
        case UPDATE_JOBS_EXITO:
        case UPDATE_UNITS_JOBS_EXITO:
            return{
                ...state,
                loading : false,
                loadingData : false,
                tareas : action.payload
            }
        case DELETE_JOBS_EXITO:
            return{
                ...state,
                loading : false,
                loadingData : false,
                tareas : state.tareas.filter(tarea => tarea.id !== parseInt(action.payload))
            }
        case ACTIVATE_JOBS_EXITO:
            return{
                ...state,
                loading: false,
                loadingData : false,
                tareas : state.tareas.map( tarea =>
                    {
                        tarea.estado = (tarea.id === action.payload ? 1 : tarea.estado);
                        return tarea;
                    }
                )
            }
        case DEACTIVATE_JOBS_EXITO:
            return{
                ...state,
                loading: false,
                loadingData : false,
                tareas : state.tareas.map( tarea =>
                    {
                        tarea.estado = (tarea.id === action.payload ? 0 : tarea.estado);
                        return tarea;
                    }
                )
            }
        case LOGOUT_TAREAS:
            return state= initialState
        default:
            return state;
    }
}