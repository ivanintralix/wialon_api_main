import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import wialon from "../wialon/session";

import AuthService from "../services/AuthService";
import { saveTokenAction, startSaveTokenAction, saveUserAction } from "../store/actions/usuarioActions";
import { getGroupsAction } from "../store/actions/gruposActions";

const PrivateRoute = ({ component: Component}) => {

  const dispatch = useDispatch();

  const wialonLogin = (token) => {
    const wialonObjeto = new wialon(token);
    let iniciar = new Promise((resolve, reject) => {
    wialonObjeto.login( function(data) {
        if (data.error) {
            reject("¡Error");
        } else {
            resolve("¡Éxito!");
        }
      });
    });
    iniciar.then(() => {
        wialonObjeto.showUnits();
        saveUserAction()
        console.log(wialonObjeto);
        dispatch(saveUserAction(wialonObjeto))
        dispatch(getGroupsAction())
        setLoading(true);
    });
  }

  const [loading, setLoading] = useState(false);
  const loadingGrupos = useSelector(state => state.grupos.loading)
  const [token, setTOken ] = useState( () => {
    const token2 = AuthService.getToken();
    dispatch(saveTokenAction(token2));
    wialonLogin(token2);

    return token2;
  });

  return (
    <Route render={
        (props) => (
          token !== null ? 
            loading && !loadingGrupos ?
              <Component {...props} />
              :
              <p>hola</p>
          :
            <Redirect to='/login' />
    )} />

  )
}
export default PrivateRoute;
//export default connect(mapStateToProps)(PrivateRoute)
