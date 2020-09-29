import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import CreateOfflineTournament from "./components/CreateOfflineTournament";
import CreateOnlineTournament from "./components/CreateOnlineTournament";
import SingleOnlineTournament from "./components/SingleOnlineTournament";
import SingleOfflineTournament from "./components/SingleOfflineTournament";
import AllTournaments from "./components/AllTournaments";
import UserTournaments from "./components/UserTournaments";
import Participants from "./components/Participants";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/about-us" component={AboutUs} exact />
          <Route path="/create-offline-tournament" component={CreateOfflineTournament} exact />
          <Route path="/create-online-tournament" component={CreateOnlineTournament} exact />
          <Route path="/single-online-tournament/:id" component={SingleOnlineTournament} exact />
          <Route path="/single-offline-tournament/:id" component={SingleOfflineTournament} exact />
          <Route path="/all-tournaments/:type" component={AllTournaments} exact />
          <Route path="/user-tournaments" component={UserTournaments} exact />
          <Route path="/participants/:id" component={Participants} exact />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
