import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/Menu.css'
import './css/MenuAcciones.css';

import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Panel, {  } from "./pages/Panel";



function App() {
  return (
    <div className="App">
      <Switch>
          <PrivateRoute exact path="/" component={Panel} />
          <PrivateRoute exact path="/Panel" component={Panel} />
          <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
