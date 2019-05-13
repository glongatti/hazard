import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Navbar from './Components/Navbar/Navbar';

import Index from './Pages/Index'
import Login from './Pages/Login/login'
import Cadastro from './Pages/Cadastro/cadasto'
import MeusAlertas from './Pages/MeusAlertas/meus-alertas';
import Alertas from './Pages/Alertas/alertas'
import CadastroAlerta from './Pages/CadastroAlerta/cadastro-alerta'
import Logout from './Pages/Logout/logout'

class AppRouter extends Component {

  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {
      isLogged: false
    }
  }

  componentWillMount() {

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      this.setState({
        isLogged: true,
      })
    } else {
      this.setState({
        isLogged: false,
      })
    }
  }

  logout() {
    localStorage.removeItem('user')

    this.setState({
      isLogged: false
    })

  }

  login() {

    this.setState({
      isLogged: true
    })
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Navbar isLogged={this.state.isLogged} logout={this.logout} />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/alertas" exact component={Alertas} />
            <Route path="/login" render={(props) => <Login {...props} login={this.login} />} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/meus-alertas" component={MeusAlertas} />
            <Route path="/cadastro-alerta" component={CadastroAlerta} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router >

    );
  }
}

export default AppRouter;
