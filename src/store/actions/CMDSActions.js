import { 
    START_GET_CMDS,
    GET_CMDS_EXITO,
    GET_CMDS_ERROR,
    LOGOUT_CMDS
} from '../types';

export function getCMDSUnitsAction(wialonObjeto) {
    return async (dispatch) => {
        dispatch( startCMDSAction() );
        try {
            new Promise(() => {
                wialonObjeto.getCMDS( function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( getCMDSError() );
                    } else {
                        dispatch( getCMDSExito(data) );
                    }
                });
            }); 
            
        } catch (error) {
            dispatch( getCMDSError() )
            console.log(error);
        }
    }
 }

const startCMDSAction = () => ({
    type: START_GET_CMDS
})
const getCMDSExito = (CMDSunidades) => ({
    type: GET_CMDS_EXITO,
    payload: CMDSunidades
})
const getCMDSError = () => ({
    type: GET_CMDS_ERROR
})

export function logoutCMDSAction() {
    return (dispatch) => {
        dispatch({
            type : LOGOUT_CMDS
        });
    }
}