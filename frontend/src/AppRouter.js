import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Index from './Pages/Index'

class AppRouter extends Component {
  render() {
    return (
      <div className="App">


        <Router Navbar={Navbar}>
          <Navbar />
          <Route path="/" exact component={Index} />
          {/* <Route path="/about/" component={About} /> */}
        </Router>

      </div>

    );
  }
}

export default AppRouter;
