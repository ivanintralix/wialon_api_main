import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './index.css'
import './css/Menu.css'
import './css/MenuAcciones.css';
import './css/intralix.css';

import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Panel from "./pages/Panel";
import Equipos from "./pages/Equipos";



function App() {
  return (
    <div className="App">
      <Switch>
          <PrivateRoute exact path="/" component={Panel} />
          <PrivateRoute exact path="/Panel" component={Panel} />
          <PrivateRoute exact path="/Equipos" component={Equipos} />
          <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
