import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import wialon from "../wialon/session";

import AuthService from "../services/AuthService";
import { saveTokenAction, saveUserAction } from "../store/actions/usuarioActions";
import { getGroupsAction } from "../store/actions/gruposActions";
import { getUnitsAction } from "../store/actions/unidadesActions";
import { getJobsAction } from "../store/actions/tareasActions";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../store/actions/usuarioActions";
import { getCMDSUnitsAction } from "../store/actions/CMDSActions";
import preloader from "../img/preloader.svg";

const PrivateRoute = ({ component: Component}) => {

  const history = useHistory();
  const dispatch = useDispatch();

  let wialonObjeto = null;
  const wialonLogin = (token) => {
    wialonObjeto = new wialon(token);
    let iniciar = new Promise((resolve, reject) => {
      wialonObjeto.login( function(data) {
        if (data.error) {
          AuthService.logout();
          dispatch( logoutAction() );
          history.push('/login');
            reject("¡Error");
        } else {
            resolve("¡Éxito!");
        }
      });

    });
    iniciar.then(() => {
        wialonObjeto.showUnits();
        dispatch(getJobsAction(wialonObjeto));
        dispatch(saveUserAction(wialonObjeto));
        dispatch(getGroupsAction(wialonObjeto));
        dispatch(getUnitsAction(wialonObjeto));
        dispatch(getCMDSUnitsAction(wialonObjeto));
        setLoading(true);
    });
  }

  const [loading, setLoading] = useState(false);
  const loadingGrupos = useSelector(state => state.grupos.loading)
  const loadingUnidades = useSelector(state => state.unidades.loading);
  const loadingJobs = useSelector(state => state.tareas.loading);
  const loadingCMDS = useSelector(state => state.CMDS.loading);

  const [token] = useState( () => {
    const token2 = AuthService.getToken();
    console.log("entro")
    dispatch(saveTokenAction(token2));
    wialonLogin(token2);
    return token2;
  });

  return (
    <Route render={
        (props) => (
          token !== null ? 
            loading && !loadingGrupos && !loadingUnidades && !loadingJobs && !loadingCMDS ?
              <Component {...props} />
              :
              <img src={preloader} />
          :
            <Redirect to='/login' />
    )} />

  )
}
export default PrivateRoute;
//export default connect(mapStateToProps)(PrivateRoute)
