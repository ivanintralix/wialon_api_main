import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { saveTokenAction } from "../store/actions/usuarioActions";


import { useHistory } from "react-router-dom";

const Login = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(state => state.usuario.token);
  console.log(token);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token !== null) {
      dispatch(saveTokenAction(token));
      history.push('/');  
    }
  },[])

  window.onmessage = function (e) {
    var msg = e.data;
    if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
      var token = msg.replace("access_token=", "");
      AuthService.saveToken(token);
      dispatch( saveTokenAction(token) );
      history.push('/');
    }
  };
  return (
    <div>
        <iframe
        id="iframeInicio"
        src="https://hosting.wialon.com/login.html?client_id=myApp&access_type=0x100&activation_time=0&duration=604800&flags=0x1&redirect_uri=https://hosting.wialon.com/post_token.html"
        title="Inline Frame Example"
        width="500"
        height="500"
        style={{border: "transparent"}}
        ></iframe>
    </div>
  )
}

export default Login;
