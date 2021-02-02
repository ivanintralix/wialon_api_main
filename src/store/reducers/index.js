import { combineReducers } from "redux";
import usuarioReducer from "./usuarioReducer";
import unidadesReducer from "./unidadesReducer";

export default combineReducers({
    usuario: usuarioReducer,
    unidades: unidadesReducer,
});