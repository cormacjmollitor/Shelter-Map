import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './views/home.jsx';
import axios from 'axios';

require('./../stylesheets/app.scss');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    axios.get("/test")
    .then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <Router>
        <main>

          <nav>
            <div>
            {/* <Link to="/"><h1 className="logo">Spotshare</h1> /></Link> */}
              <Link to="/" onClick={this.refreshpage} style={{ textDecoration: 'none' }}><h1 className="logo">SpotSharer</h1></Link>
            </div>
          </nav>

          <Route exact path="/search" component={MapContainer} key="search" />

          <Route exact path="/" render={(defprops) => <Home isLoggedIn={this.state.isLoggedIn} {...defprops} />} />
        </main>
      </Router>
    );
  }
}
