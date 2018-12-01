import './../../stylesheets/home.scss';
import './../../stylesheets/dateTime.scss';

import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
ThemedStyleSheet.registerTheme(DefaultTheme);

import 'react-dates/initialize';
import React, { Component } from "react";
import { Redirect } from 'react-router';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import api from './../helpers/api.js';
import 'react-dates/lib/css/_datepicker.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(1, 'd'),
      date: moment(),
      focusedInput: null,
      startDateId: 'startdate',
      endDateId: 'enddate',
      searchValue: '',
      results: [],
      fireRedirect: false
    }
    this.onText = this.onText.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.pushToResults = this.pushToResults.bind(this);
  }


  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  setStateAsync(state) {
    return new Promise((resolve, reject) => {
      this.setState(state, resolve);
      reject('new error');
    })
  }

  onText(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }

  pushToResults() {
    this.setState({
      results: [...this.state.results, arguments[0], arguments[1]]
    })
  }

  submitForm(evt) {
    const { searchValue, startDate, endDate } = this.state;
    evt.preventDefault();
    api.getMapData(searchValue)
      .then(async (data) => {
        await this.setStateAsync(data)
        await this.pushToResults(startDate.valueOf(), endDate.valueOf())
        this.setState({
          fireRedirect: true
        })
      })
      .catch((error) => console.log(error));
  }


  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;
    return (
      <div id="welcome_text_div">
        <h1 className="headertext">Welcome To Your Spot</h1>
        <p className="welcometext">Rent out uninque parking spots all around the greatest city in the world.</p>

        <form className="search-container" onSubmit={this.submitForm}>
          <input type="text" id="search-bar" placeholder="Search for available locations here" onKeyDown={this.onText} />
          <img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" />
        </form>
        {fireRedirect && (<Redirect to={{ pathname: '/search', state: this.state.results }} />)}
        <div id="dateselect">
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId={this.state.startDateId} // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId={this.state.endDateId} // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            regular={true}
          />
        </div>
      </div >
    );
  }
}