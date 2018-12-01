"use strict"

const ENV = process.env.NODE_ENV || "development";
const knexConfig = require("./../../knexfile");
const knex = require("knex")(knexConfig[ENV]);

module.exports = {

  getUsers: function(boundsObject) {
    return new Promise((resolve, reject) => {
        knex('users').select('email').then(function(userNames){
            console.log(userNames);
        });
    })
  }
}