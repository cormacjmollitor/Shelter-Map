import React from 'react';

const api_base = "";
export default class ShelterList extends React.Component{
  state = {
    shelters: []
  }

  componentDidMOunt(){
    fetch(api_base + "shelters", {
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "preferences.ageMin": parseInt(context.state.prefAgeMin, 10),
        "preferences.ageMax": parseInt(context.state.prefAgeMax, 10),
        "preferences.proximity": parseInt(context.state.prefProximity, 10),
        "preferences.female": context.state.preferredGenders.map(entry => entry.label).includes('Female'),
        "preferences.male": context.state.preferredGenders.map(entry => entry.label).includes('Male'),
        "preferences.other": context.state.preferredGenders.map(entry => entry.label).includes('Other')
      })
    })
  }
  render(){
    return(

    );
  }
}