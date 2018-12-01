//dependencies
const express = require('express');
const Session = require('../models/companionsession');
const Response = require('../models/response');
const Alert = require('../models/alert');
const Locate = require('../models/location');
const User = require('../models/user')
//setup
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/* SEND ALERT @body.alertCode TO ALL WATCHERS IN A COMPANION SESSION
 *
 * API Endpoint: /alert/:sessionID
 * body:
 * {
 *     "alertCode": number
 * }
 * responseData: "Alert has been sent."
 */
router.post('/alert/:sessionID', async (req, res) => {
    try {
        let session = await Session.getSession(req.params.sessionID);
        if(session.joinedWatchers.length == 0)
        {
            res.status(404).send(new Response(404, "No watchers have joined your session.", ""));
            return;
        }
        let addMsgData = {"sessionID": req.params.sessionID};
        let message = Alert.createMessage(session.traveller.name, req.body.alertCode, addMsgData);
        let watcherTokens = User.getDeviceTokens(session.joinedWatchers);
        res.status(200).send(new Response(200, "", ""));
        Alert.sendNotifications(watcherTokens, message);
    }
    catch(err) {
        res.status(404).send(new Response(404, err, ""));
    }
});

/* SEND ALERT @body.alertCode TO ALL USERS NEARBY @body.userID
 * body:
 * {
 *     "userID": string
 *     "alertCode": number
 * }
 * responseData: "Alert has been sent"
 */
router.post('/alert', async (req, res) => {
    try
    {
        let user = await User.getUser(req.body.userID);
        let userLoc = await Locate.getUserLocation(user.userID);
        let nearbyUsers = await Locate.getNearbyUsers(userLoc, Alert.ALERT_RANGE);
	//ensure that a user does not send the alert to themselves
	nearbyUsers = nearbyUsers.filter((nearbyUser) => {return (nearbyUser.userID != user.userID)});
        if(nearbyUsers.length == 0)
        {
            res.status(404).send(new Response(404, "No users are nearby!", ""));
            return;
        }
        let addMsgData = {"userName": user.userName, "userLoc": userLoc};
        let message = Alert.createMessage(user.userName, req.body.alertCode, addMsgData);
        let tokens = User.getDeviceTokens(nearbyUsers);
        Alert.sendNotifications(tokens, message);
        res.status(200).send(new Response(200, "", "Alert has been sent."));
    }
    catch(err)
    {
        res.status(404).send(new Response(404, err, ""));
    }
});

module.exports.router = router;
