const geo = require('../db').geo;
const User = require('../models/user');
const Locate = require('../models/location');

/* Retrieves a list of nearby users - asynchronous, returns a promise */
async function getRecommendations(userID)
{
    try{
        let user = await User.getUser(userID);
        let userLoc = await Locate.getUserLocation(userID);
        let userPref = user.preferences;
        let nearbyUsers = await Locate.getNearbyUsers(userLoc, userPref.proximity);
        let recs = filterRecommendations(userID, userPref, nearbyUsers);
        return User.getUserProfiles(recs);
    }
    catch(err){
        throw err;
    }
}

function filterRecommendations(travellerID, preferences, nearbyUsers)
{
    var users =  nearbyUsers.filter(user => matchesPreferences(travellerID, preferences, user));
    users.slice(0, 100);
    //all users who do not have a rating will sorted to the end
    users.sort((userA, userB) => {
	    if(!userA.hasOwnProperty('rating'))
	    {
		    return 1;
	    }
	    else if(!userB.hasOwnProperty('rating'))
	    {
		    return -1;
	    }
	    return userB.rating - userA.rating
    });
    return users;
}

function matchesPreferences(travellerID, preferences, user)
{
    //prevent the traveller from getting themselves as a recommendation
    if(user.userID == travellerID)
    {
        return false;
    }
    if(user.age < preferences.ageMin || user.age > preferences.ageMax)
    {
        return false;
    }
    if(preferences.female && user.gender == 'Female')
    {
        return true;
    }
    if(preferences.male && user.gender == 'Male')
    {
        return true;
    }
    if(preferences.other && user.gender == 'Other')
    {
        return true;
    }
    return false;
}

module.exports.getRecommendations = getRecommendations;

