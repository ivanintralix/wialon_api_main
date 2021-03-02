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
    UPDATE_JOBS_ERROR
} from '../types';

export function getJobsAction(wialonObjeto) {
    return async (dispatch) => {
        dispatch( startJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.getJobs( function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( getJobsError() );
                    } else {
                        dispatch( getJobsExito(data) );
                    }
                });
            });

        } catch (error) {
            dispatch( getJobsError() )
            console.log(error);
        }
    }
}
const startJobsAction = () => ({
    type: START_GET_JOBS
})
const getJobsExito = (jobs) => ({
    type: GET_JOBS_EXITO,
    payload: jobs
})
const getJobsError = () => ({
    type: GET_JOBS_ERROR
})

export function updateUnitsJobsAction(id,unidades,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startUpdateUnitsJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.editUnitsJob( id,unidades,function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( updateUnitsJobsError() );
                    } else {
                        dispatch( updateUnitsJobsExito(data) );
                    }
                });
            });

        } catch (error) {
            dispatch( updateUnitsJobsError() )
            console.log(error);
        }
    }
}
const startUpdateUnitsJobsAction = () => ({
    type: START_UPDATE_UNITS_JOBS
})
const updateUnitsJobsExito = (jobs) => ({
    type: UPDATE_UNITS_JOBS_EXITO,
    payload: jobs
})
const updateUnitsJobsError = () => ({
    type: UPDATE_UNITS_JOBS_ERROR
})

export function updateJobAction(id,nuevaTarea,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startUpdateJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.editJob( id,nuevaTarea,function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( updateJobsError() );
                    } else {
                        dispatch( updateJobsExito(data) );
                    }
                });
            });
        } catch (error) {
            dispatch( updateJobsError() )
            console.log(error);
        }
    }
}
const startUpdateJobsAction = () => ({
    type: START_UPDATE_JOBS
})
const updateJobsExito = (jobs) => ({
    type: UPDATE_JOBS_EXITO,
    payload: jobs
})
const updateJobsError = () => ({
    type: UPDATE_JOBS_ERROR
})

export function logoutTareasAction() {
    return (dispatch) => {
        dispatch({
            type : LOGOUT_TAREAS
        });
    }
}