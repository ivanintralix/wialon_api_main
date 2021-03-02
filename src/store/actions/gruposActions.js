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
import Swal from 'sweetalert2';
import { error } from "../../config/errores";

export function getGroupsAction(wialonObjeto) {
    return async (dispatch) => {
        dispatch( startGroupsAction() );
        try {
            new Promise(() => {
                wialonObjeto.showGroups( function(data) {
                    if (data.error) {
                        dispatch( getGroupsError() );
                    } else {
                        dispatch( getGroupsExito(data) );
                    }
                });
            });

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

export function addUnitsGroupAction(units,IdGroup,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startPutGroupsAction() );
        try {
            new Promise(() => {
            wialonObjeto.addUnitsGroup(units,IdGroup,function(data) {
                console.log(data);
                if (data.error) {
                    console.log(data.error);
                    dispatch( putGroupsError() );
                    const errorString = error(data.error);
                    console.log(errorString)
                    Swal.fire('Error', errorString, 'warning')
                } else {
                    const groups = [];
                    data.forEach(grupo => {
                        groups.push({d:grupo});
                    });
                    console.log(data);
                    dispatch( putGroupsExito(groups) );
                }
                });
            });
        } catch (error) {
            dispatch( putGroupsError() )
            console.log(error);
        }
    }
}
const startPutGroupsAction = () => ({
    type: START_PUT_GROUP
})
const putGroupsExito = (grupos) => ({
    type: PUT_GROUP_EXITO,
    payload: grupos
})
const putGroupsError = () => ({
    type: PUT_GROUP_ERROR
})

export function createGroupAction(units,name,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startcreateGroupsAction() );
        try {
            new Promise(() => {
            wialonObjeto.createGroup(units,name,function(data) {
                console.log(data);
                if (data.error) {
                    console.log(data);
                    dispatch( createGroupsError() );
                } else {
                    console.log(data);
                    const nuevoGrupo = {d:data.item}
                    
                    //agregar unidades al nuevo grupo
                    new Promise(() => {
                        wialonObjeto.addUnitsNewGroup(units,data.item.id,function(data) {
                            if (data.error) {
                                console.log(data);
                                dispatch( createGroupsError() );
                            } else {
                                console.log(data);
                                nuevoGrupo.d.u = data.u;
                                dispatch( createGroupsExito(nuevoGrupo) )
                            }
                        });
                    });
                }
                });
            });
        } catch (error) {
            dispatch( createGroupsError() )
            console.log(error);
        }
    }
}
const startcreateGroupsAction = () => ({
    type: START_POST_GROUP
})
const createGroupsExito = (grupo) => ({
    type: POST_GROUP_EXITO,
    payload: grupo
})
const createGroupsError = () => ({
    type: POST_GROUP_ERROR
})

export function deleteGroupAction(IdGroup,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startDeleteGroupsAction() );
        try {
            new Promise(() => {
            wialonObjeto.deleteGroup(IdGroup,function(data) {
                console.log(data);
                if (data.error) {
                    dispatch( deleteGroupsError() );
                } else {
                    dispatch( deleteGroupsExito(IdGroup) );
                }
                });
            });
        } catch (error) {
            dispatch( deleteGroupsError() )
            console.log(error);
        }
    }
}
const startDeleteGroupsAction = () => ({
    type: START_DELETE_GROUP
})
const deleteGroupsExito = (id) => ({
    type: DELETE_GROUP_EXITO,
    payload: id
})
const deleteGroupsError = () => ({
    type: DELETE_GROUP_ERROR
})

export function logoutGruposAction() {
    return (dispatch) => {
        dispatch({
            type : LOGOUT_GRUPOS
        });
    }
}