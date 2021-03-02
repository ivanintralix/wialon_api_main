import { combineReducers } from "redux";
import usuarioReducer from "./usuarioReducer";
import gruposReducer from "./gruposReducer";
import unidadesReducer from "./unidadesReducer";
import tareasReducer from "./tareasReducer";
import CMDSReducer from "./CMDSReducer";

export default combineReducers({
    usuario: usuarioReducer,
    grupos: gruposReducer,
    unidades: unidadesReducer,
    tareas: tareasReducer,
    CMDS : CMDSReducer 
});