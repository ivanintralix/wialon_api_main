import { 
    START_GET_UNITS,
    GET_UNITS_EXITO,
    GET_UNITS_ERROR,
    PUT_UNITS_EXITO,
    PUT_UNITS_ERROR,
    LOGOUT_UNIDADES
 } from '../types';

export function getUnitsAction(wialonObjeto) {
    return async (dispatch) => {
        dispatch( startUnitsAction() );
        try {
            new Promise( () =>{
                const unidades = wialonObjeto.unidades;
                dispatch( getUnitsExito(unidades) );   
            })
            
        } catch (error) {
            dispatch( getUnitsError() )
            console.log(error);
        }
    }
 }

const startUnitsAction = () => ({
    type: START_GET_UNITS
})
const getUnitsExito = (unidades) => ({
    type: GET_UNITS_EXITO,
    payload: unidades
})
const getUnitsError = () => ({
    type: GET_UNITS_ERROR
})

export function putUnitsAction(nuevasUnidades,unidades) {
    return async (dispatch) => {
        try {
            const nuevos = [];
            console.log(nuevasUnidades);
            
            unidades.forEach(unidad => {
                nuevasUnidades.forEach(nuevaUnidad => {
                    if (nuevaUnidad.i === unidad.id) {
                        unidad.pos.x = 0;
                        unidad.pos.y = 0;
                        console.log(unidad);
                    }
                });
                nuevos.push(unidad);
            });
            
            dispatch( putUnitsExito(nuevos) );   
        } catch (error) {
            dispatch( putUnitsError() )
            console.log(error);
        }
    }
}
const putUnitsExito = (unidades) => ({
    type: PUT_UNITS_EXITO,
    payload: unidades
})
const putUnitsError = () => ({
    type: PUT_UNITS_ERROR
})

export function logoutUnidadesAction() {
    return (dispatch) => {
        dispatch({
            type : LOGOUT_UNIDADES
        });
    }
}