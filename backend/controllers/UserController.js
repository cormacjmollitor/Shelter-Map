//dependencies
var express = require('express');
var admin = require('firebase-admin');
var db = require('../db');
var User = require('../models/user');
var Response = require('../models/response');
//setup
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


/*
 * API Endpoint: PUT /users/{userID} + body
 * - note that changes to a users preferences
 *   must not be nested and must be denoted by
 *   inserting a "Preferences.INSERT_PREFERENCE_HERE"
 *   e.g.
 *   {
 *      "userName": "Updated User Name",
 *      "preferences.minAge": 20
 *   }
 */
router.put('/users/:userID', async (req, res) => {
    let body = req.body;
    for(var propName in body)
    {
        if(body[propName] === null || body[propName] === undefined)
        {
            delete body[propName];
        }
    }
    var userRef = db.collection('users').doc(req.params.userID);
    userRef.update(body).then(dbRes => {
        res.status(200).send(new Response(200, "", "User has been updated."));
    }).catch(err =>{
         res.status(404).send(new Response(404, err.message, ""));
    });
});

module.exports.router = router;
