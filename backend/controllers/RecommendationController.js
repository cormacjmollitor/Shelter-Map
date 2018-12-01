const express = require('express');
const router = express.Router();
const Response = require('../models/response');
const Recommendation = require('../models/recommendation');

/*
 * API Endpoint: GET /recommendations/:userID
 * - returns a list of user profiles that match the user's preferences
 */
router.get('/recommendations/:userID', async (req, res) => {
    try{
        let recommendations = await Recommendation.getRecommendations(req.params.userID);
        res.status(200).send(new Response(200, "", recommendations));
    }
    catch(err){
        res.status(500).send(new Response(500, err, ""));
    }
});
module.exports.router = router;
