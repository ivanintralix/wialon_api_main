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
    UPDATE_JOBS_ERROR,
    START_CREATE_JOBS,
    CREATE_JOBS_EXITO,
    CREATE_JOBS_ERROR,
    START_DELETE_JOBS,
    DELETE_JOBS_EXITO,
    DELETE_JOBS_ERROR,
    START_ACTIVATE_JOBS,
    ACTIVATE_JOBS_EXITO,
    ACTIVATE_JOBS_ERROR,
    START_DEACTIVATE_JOBS,
    DEACTIVATE_JOBS_EXITO,
    DEACTIVATE_JOBS_ERROR
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

export function createJobAction(nuevaTarea,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startCreateJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.createNewJob( nuevaTarea,function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( createJobsError() );
                    } else {
                        dispatch( createJobsExito(data) );
                    }
                });
            });
        } catch (error) {
            dispatch( createJobsError() )
            console.log(error);
        }
    }
}
const startCreateJobsAction = () => ({
    type: START_CREATE_JOBS
})
const createJobsExito = (jobs) => ({
    type: CREATE_JOBS_EXITO,
    payload: jobs
})
const createJobsError = () => ({
    type: CREATE_JOBS_ERROR
})

export function deleteJobAction(idJob,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startDeleteJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.deleteJob( idJob,function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( deleteJobsError() );
                    } else {
                        console.log(data[0]);
                        dispatch( deleteJobsExito(data[0]) );
                    }
                });
            });
        } catch (error) {
            dispatch( deleteJobsError() )
            console.log(error);
        }
    }
};
const startDeleteJobsAction = () => ({
    type: START_DELETE_JOBS
});
const deleteJobsExito = (idJob) => ({
    type: DELETE_JOBS_EXITO,
    payload: idJob
});
const deleteJobsError = () => ({
    type: DELETE_JOBS_ERROR
});

export function activateJobsAction(idJob,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startActivateJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.activateJob( idJob,function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( activateJobsError() );
                    } else {
                        dispatch( activateJobsExito(data[0]) );
                    }
                });
            });
        } catch (error) {
            dispatch( activateJobsError() )
            console.log(error);
        }
    }
}
const startActivateJobsAction = () => ({
    type: START_ACTIVATE_JOBS
})
const activateJobsExito = (idJob) => ({
    type: ACTIVATE_JOBS_EXITO,
    payload: idJob
})
const activateJobsError = () => ({
    type: ACTIVATE_JOBS_ERROR
})
export function deactivateJobsAction(idJob,wialonObjeto) {
    return async (dispatch) => {
        dispatch( startDeactivateJobsAction() );
        try {
            new Promise(() => {
                wialonObjeto.deactivateJob(idJob, function(data) {
                    console.log(data);
                    if (data.error) {
                        dispatch( deactivateJobsError() );
                    } else {
                        dispatch( deactivateJobsExito(data[0]) );
                    }
                });
            });
        } catch (error) {
            dispatch( deactivateJobsError() )
            console.log(error);
        }
    }
}
const startDeactivateJobsAction = () => ({
    type: START_DEACTIVATE_JOBS
})
const deactivateJobsExito = (idJob) => ({
    type: DEACTIVATE_JOBS_EXITO,
    payload: idJob
})
const deactivateJobsError = () => ({
    type: DEACTIVATE_JOBS_ERROR
})

export function logoutTareasAction() {
    return (dispatch) => {
        dispatch({
            type : LOGOUT_TAREAS
        });
    }
}