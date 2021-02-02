import React, { useState, useEffect, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter, Redirect} from 'react-router-dom';
import MenuLateral from "../pages/Menu";
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { saveTokenAction } from "../store/actions/usuarioActions";

const DesktopContainer = ({children}) => {
  const [token, setToken] = useState(useSelector(state => state.usuario.token))
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
  },[])
  
  return (
    <div>
      {
        token !== null ?
          <Fragment>
            <MenuLateral />
            {children}
          </Fragment>
        : 
          <Redirect to='/login' />
      
      }
    </div>
  )
  
}

export default DesktopContainer;