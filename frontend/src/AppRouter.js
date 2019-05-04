import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Navbar from './Components/Navbar/Navbar';

import Index from './Pages/Index'
import Login from './Pages/Login/login'
import Cadastro from './Pages/Cadastro/cadasto'
import MeusAlertas from './Pages/MeusAlertas/meus-alertas';
import Alertas from './Pages/Alertas/alertas'
import CadastroAlerta from './Pages/CadastroAlerta/cadastro-alerta'

class AppRouter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLogged: false
    }
  }

  componentWillMount() {

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      console.log('nvarbar ta logado')
      this.setState({
        isLogged: true,
      })
    } else {
      console.log('nvarbar naooo ta logado')
      this.setState({
        isLogged: false,
      })
    }
  }

  render() {
    console.log('renderizo')
    return (
      <div className="App">


        <Router Navbar={Navbar}>
          <Navbar isLogged={this.state.isLogged} />
          <Route path="/" exact component={Index} />
          <Route path="/alertas" exact component={Alertas} />
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/meus-alertas" component={MeusAlertas} />
          <Route path="/cadastro-alerta" component={CadastroAlerta} />
        </Router>

      </div>

    );
  }
}

export default AppRouter;
