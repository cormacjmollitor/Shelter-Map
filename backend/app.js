//Configuration file for UBSafe Backend

var express = require('express'); //import express
var app = express();

var UserController = require('./controllers/UserController').router;
var RecommendationController = require('./controllers/RecommendationController').router;
var CompanionSessionController = require('./controllers/CompanionSessionController').router;
var AlertController = require('./controllers/AlertController').router;

app.use('/', UserController);
app.use('/', RecommendationController);
app.use('/', CompanionSessionController);
app.use('/', AlertController);

//makes app object visible to the rest of the program
//when we call for it using require()
module.exports = app;
