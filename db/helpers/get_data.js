"use strict"

const ENV = process.env.NODE_ENV || "development";
const knexConfig = require("./../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const moment = require('moment');
var bcrypt = require('bcryptjs');

// not sure if this works
function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function removeBookedSpots(bookings, parkingspots) {
  let spots = parkingspots
  for (const i of bookings) {
    for (const j of spots) {
      if (i.parkingid == j.id) {
        spots.splice(spots.indexOf(j), 1)
      }
    }
  }
  return spots;
}

function removeUniqueFromArrays(array1, array2) {
  let output = [];
  let a1 = array1;
  let a2 = array2;
  for (const i of a1) {
    for (const j of a2) {
      if (i.id == j.id) {
        output.push(j)
      }
    }
  }
  return output;
}

module.exports = {

  getVehicles: function(userId) {
    return new Promise((resolve, reject) => {
      knex('vehicles')
      .where('userid', '=', userId)
      .catch((err) => {
        
        console.log(`Error getUserSpots ${err}`);
         reject(err)
      })        .then(function(result) {
        console.log(result, "this is in get data")
         resolve(result)
      })

    }) 
    
  },

  getUserSpots: function(userId) {
    return knex('parkingspots')
      .where('hostid', '=', userId)
      .catch((err) => {
        console.log(`Error getUserSpots ${err}`);

      })
  },

  getAvailableSpots: function(bounds, startTimeUNIX, endTimeUNIX) {
    let promisedParkingSpots = [];

    return new Promise((resolve, reject) => {
      let promisedReservations = knex('reservations')
        .where('starttimeunix', '<', endTimeUNIX)
        .andWhere('endtimeunix', '>', startTimeUNIX)
        .then(function(result) {
          return result
        })
        
      // .where(knex.raw(`latitude Between ${bounds[0][1]} And ${bounds[1][1]} And longitude Between ${bounds[0][0]} And ${bounds[1][0]}`))

      let promisedParkingSpotsByLongitude = knex('parkingspots')
        .whereBetween('longitude', [bounds[0][0], bounds[1][0]])

      let promisedParkingSpotsByLatitude = knex('parkingspots')
        .whereBetween('latitude', [bounds[0][1], bounds[1][1]])

      Promise.all([promisedParkingSpotsByLongitude, promisedParkingSpotsByLatitude, promisedReservations])
        .then(async (values) => {
          promisedParkingSpots = await removeUniqueFromArrays(values[0], values[1]);
          return resolve(removeBookedSpots(values[2], promisedParkingSpots));
        })
        .catch((error) => {
          reject(`Error in finding data ${error}`);
        })
    })
  },

  getReservations: function(userid) {
    var arrayofreservations = [];
    var userregistration = {};
    return new Promise((resolve, reject) => {
      knex('reservations')
        .join('parkingspots', { 'reservations.parkingid': 'parkingspots.id' })
        .where({ clientid: userid }) //userid }) //to be added back after testing
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  },

  getIncomingReservations: function(userid) {
    return new Promise((resolve, reject) => {
      knex('reservations')
        .join('parkingspots', { 'reservations.parkingid': 'parkingspots.id' })
        .where({ 'reservations.hostid': userid })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(`Error dbGet getIncomingReservations: ${err}`);
          reject(err);
        })
    })
  },

  getReviews: function(parkingid) {
    return new Promise((resolve, reject) => {
      knex('reviews')
        .join('users', { 'reviews.userid': 'users.id' })
        .where({ parkingid: parkingid })
        .then((res) => {
          console.log("Result for reviews of id", parkingid, "is", res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  },

  getParkingDetails: function(parkingid){
    return new Promise((resolve, reject) => {
      knex('parkingspots')
        .where({ id: parkingid })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}

class userregistration {
  constructor(address, city, postalcode, stall, buzzer) {
    this.address = address;
    this.city = city;
    this.postalcode = postalcode;
    this.stall = stall;
    this.buzzer = buzzer;
  }
}