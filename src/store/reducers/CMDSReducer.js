import { 
    START_GET_CMDS,
    GET_CMDS_EXITO,
    GET_CMDS_ERROR,
    LOGOUT_CMDS
} from '../types';

const initialState = {
    unidadesCMDS : [],
    loading : false
}
export default function CMDSReducer(state = initialState, action) {
    switch (action.type) {
        case START_GET_CMDS:
            return{
                ...state,
                loading : true
            }
        case GET_CMDS_EXITO:
            return{
                ...state,
                loading : false,
                unidadesCMDS : action.payload
            }
        case GET_CMDS_ERROR:
            return{
                ...state,
                loading : false
            }
        case LOGOUT_CMDS:
            return state=initialState
        default:
            return state;
    }
}