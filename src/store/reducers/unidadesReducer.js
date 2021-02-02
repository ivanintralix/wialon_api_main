import { 
    SAVE_DEVICES
} from "../types";

const initialState = {
    unidades : [],
    loading : false
}

export default function unidadesReducer(state = initialState, action){
    switch (action.type) {
        case SAVE_DEVICES:
            return {
                ...state,
                unidades: action.payload
            }
        default:
            return state;
    }
}