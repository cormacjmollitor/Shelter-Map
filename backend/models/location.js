const db = require('../db');
const geo = require('../db').geo;
const User = require('../models/user');

/* Returns a list of users nearby a given geopoint and proximity*/
async function getNearbyUsers(loc, proximity)
{
    return new Promise((resolve, reject) => {
        const geoQuery = geo.query({
            center: loc,
            radius: proximity
        });
        var nearbyUsers = [];
        let user;
        geoQuery.on("key_entered", async function(key, location, distance) {
            user = User.getUser(key).then(user => {
                nearbyUsers.push(user);
            });
        });

        geoQuery.on("ready", function(){
            geoQuery.cancel();
            resolve(nearbyUsers);
        });
    });
}

/* given a userID, returns the user's location & preferred proximity*/
async function getUserLocation(userID)
{
    try{
        let userLoc = await geo.get(userID);
        return userLoc.coordinates;
    }
    catch(err){
        throw new Error("Could not find user's location.");
    }
}

module.exports.getUserLocation = getUserLocation;
module.exports.getNearbyUsers = getNearbyUsers;
