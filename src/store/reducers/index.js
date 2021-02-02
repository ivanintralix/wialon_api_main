import { combineReducers } from "redux";
import usuarioReducer from "./usuarioReducer";
import gruposReducer from "./gruposReducer";

export default combineReducers({
    usuario: usuarioReducer,
    grupos: gruposReducer,
});