import axios from 'axios';
import { moment } from 'moment';


module.exports = {
  getSpots(bounds, startdate, enddate) {
    return new Promise((resolve, reject) => {
      // let sd = startdate.valueOf().slice(0, 10);
      // let ed = enddate.slice(0, 10);
      // console.log(sd);
      
      const ax = axios.create({
        baseURL: `http://${window.location.hostname}:8080`
      })
      ax.get(`/db/spots?bounds=${bounds}&starttime=${startdate}&endtime=${enddate}`)
        .then((response) => {
          return resolve(response);
        })
        .catch(function(error) {
          if (error.response) {
            reject(error);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    })
  }
}