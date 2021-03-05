import React, { useEffect } from 'react';
import AuthService from "../services/AuthService";
import { useDispatch } from "react-redux";
import { saveTokenAction } from "../store/actions/usuarioActions";


import { useHistory } from "react-router-dom";

const Login = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = AuthService.getToken();
    if (token !== null) {
      dispatch(saveTokenAction(token));
      history.push('/');  
    }
  },[])

  window.onmessage = function (e) {
    var msg = e.data;
    if (typeof msg == "string" && msg.indexOf("access_hash=") >= 0) {
      var token = msg.replace("access_hash=", "");
      AuthService.saveToken(token);
      dispatch( saveTokenAction(token) );
      history.push('/');
    }
    //acces_type:256
  };
  return (
    <div>
        <video id="myVideo" autoPlay="true" muted loop>
          <source src="http://www.intralix.com/videos/Compress-transcode.mp4" type="video/mp4" />
        </video>
        <iframe
        className="content"
        id="iframeInicio"
        src="http://gps.intralix.com/login.html?client_id=myApp&access_type=0xFFFFFFFF&activation_time=0&duration=604800&flags=0xFFFFFFFF&response_type=hash&redirect_uri=http://gps.intralix.com/post_token.html&css_url=https://cocky-brahmagupta-e971ac.netlify.app/login.css"
        title="Inline Frame Example"
        width="500"
        height="500"
        style={{border: "transparent"}}
        ></iframe>
    </div>
  )
}

export default Login;
