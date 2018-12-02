import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ShelterList from './views/ShelterList.jsx';
import SignIn from './views/SignIn.jsx';
import axios from 'axios';
import Stats from './views/stats.jsx';
import VisitorForm from "./views/VisitorForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // axios.get(`/test`)
    //   .then((result) => {
    //     console.log(result);
    // })
  }
  render() {
    return (
      <Router>
        <main>
        <Route exact path="/" render={() => <ShelterList />} />
          <Route exact path="/shelters" render={() => <ShelterList />} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/shelter1/stats" render={() => <Stats />} />
            <Route exact path="/visitorform" render={() => <VisitorForm />} />
        </main>
      </Router>
    );
  }
}
