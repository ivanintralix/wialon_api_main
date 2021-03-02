import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import MenuLateral from "../pages/Menu";
import { useSelector } from "react-redux";

const DesktopContainer = ({children}) => {
  const token = useSelector(state => state.usuario.token);
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