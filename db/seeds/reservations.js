const moment = require('moment');

exports.seed = function(knex, Promise) {
  return knex('reservations').del()
    .then(function() {
      return Promise.all([
        knex('reservations').insert({ parkingid: 1, hostid: 1, clientid: 2, starttimeunix: moment().unix(), endtimeunix: moment().add(2, 'd').unix() }),
        knex('reservations').insert({ parkingid: 1, hostid: 1, clientid: 2, starttimeunix: moment().add(4, 'd').unix(), endtimeunix: moment().add(5, 'd').unix() }),
      ]);
    });
};