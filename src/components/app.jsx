import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ShelterList from './views/ShelterList.jsx';
import SignIn from './views/SignIn.jsx';
import axios from 'axios';

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
          <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
              <a className="navbar-brand" href="#">INSERT LOGO HERE</a>

              <form className="form-inline my-2 my-lg-0">
                <input class="form-control"
                        type="text"
                        placeholder="Search Shelters"
                        aria-label="Search"
                        defaultValue=""
                        ref={input => this.search = input}
                        onKeyUp={this.filterShelters}>
                </input>
              </form>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav ml-auto">
                  <button type="button" className="btn btn-secondary">Login</button>
                </div>
              </div>
            </nav>
          </div>
          <Route exact path="/shelters" render={() => <ShelterList />} />
          <Route exact path="/signin" render={() => <SignIn />} />
        </main>
      </Router>
    );
  }
}
