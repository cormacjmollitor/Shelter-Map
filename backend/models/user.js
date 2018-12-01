const db = require('../db');

async function getUser(userID)
{
    try{
        let user = await db.collection('users').doc(userID).get();
        if(!user.exists)
        {
            throw new Error('Cannot find user in the database.')
        }
        return user.data();
    }
    catch(err) {
        throw new Error('Cannot find user ' + userID + ' in the database.');
    }
}

function getAvgRating(ratingHistory)
{
    if(ratingHistory.length)
    {
        let sum, avg = 0;
        sum = ratingHistory.reduce((a,b) => {return a + b});
        avg = sum/ratingHistory.length;
        return avg;
    }
    return -1;
}

function getUserProfiles(users)
{
    let profiles = [];
    users.forEach(u => {
        profiles.push(new UserProfile(u));
    });
    return profiles;
}

function getDeviceTokens(users)
{
    let tokens = [];
    users.forEach(u => {
        tokens.push(u.deviceToken);
    });
    return tokens;
}

function UserProfile(user) {
    this.userID = user.userID;
    this.userName = user.userName;
    this.age = user.age;
    this.gender = user.gender;
    this.rating = user.rating;
}

module.exports = {
    "getUser": getUser,
    "getAvgRating": getAvgRating,
    "getUserProfiles": getUserProfiles,
    "getDeviceTokens": getDeviceTokens,
    "db": db
}

