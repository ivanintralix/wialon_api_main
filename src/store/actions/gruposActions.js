import {
    START_GET_GROUPS,
    GET_GROUPS_EXITO,
    GET_GROUPS_ERROR,
} from '../types';
import clienteAxios from "../../config/axios";

export function getGroupsAction() {
    return async (dispatch) => {
        dispatch( startGroupsAction() );
        try {
            const respuesta = await clienteAxios.get('/grupos');
            console.log(respuesta.data);
            dispatch( getGroupsExito(respuesta.data) )
        } catch (error) {
            dispatch( getGroupsError() )
            console.log(error);
        }
    }
}

const startGroupsAction = () => ({
    type: START_GET_GROUPS
})
const getGroupsExito = (gruops) => ({
    type: GET_GROUPS_EXITO,
    payload: gruops
})
const getGroupsError = () => ({
    type: GET_GROUPS_ERROR
})