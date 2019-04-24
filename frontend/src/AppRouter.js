import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Navbar from './Components/Navbar/Navbar';

import Index from './Pages/Index'
import Login from './Pages/Login/login'
import Cadastro from './Pages/Cadastro/cadasto'
import MeusAlertas from './Pages/MeusAlertas/meus-alertas';
import Alertas from './Pages/Alertas/alertas'

class AppRouter extends Component {
  render() {
    return (
      <div className="App">


        <Router Navbar={Navbar}>
          <Navbar />
          <Route path="/" exact component={Index} />
          <Route path="/alertas" exact component={Alertas} />
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/meus-alertas" component={MeusAlertas} />
        </Router>

      </div>

    );
  }
}

export default AppRouter;
