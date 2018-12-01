const db = require('../db');
const User = require('../models/user');

function makeCompanionSession(traveller, session)
{
    var newSession = {
        "traveller" : makeSessionProfile(traveller),
        "travellerSource":  session.travellerSource,
        "travellerDest":  session.travellerDest,
        "travellerLoc": session.travellerLocation,
        "lastUpdated": session.lastUpdated,
        "joinedWatchers": [],
        "active": true
    };
    return newSession;
}

function makeSessionProfile(user)
{
    var sessionProfile = {
        "id": user.userID,
        "name": user.userName,
        "deviceToken": user.deviceToken
    };
    return sessionProfile;
}

async function getWatcherTokensFromIDs(watcherIDs)
{
    return new Promise(async (resolve, reject) => {
        let tokens = [];
        let numRetrieved = 0;
        for(var i = 0; i < watcherIDs.length; i++)
        {
            User.getUser(watcherIDs[i]).then(watcher => {
                tokens.push(watcher.deviceToken);
                numRetrieved++;
                if(numRetrieved == watcherIDs.length)
                {
                    resolve(tokens);
                }
            }).catch(err => reject(err));
        }
    });
}

async function getSession(sessionID)
{
	try{
		let session = await db.collection('companion_sessions').doc(sessionID).get();
		if(!session.exists){
			throw new Error("Cannot find session in the database.");
		}
		return session.data();
	}
	catch(err){
		throw err;
	}
}

/* Creates a Companion Session and inserts it into the db */
async function createSession(session)
{
	try{
		let traveller = await User.getUser(session.travellerID);
		let newSession = makeCompanionSession(traveller, session); 
		let sessionRef = await db.collection('companion_sessions').add(newSession);
		return ({ "id": sessionRef.id, "data": newSession });
	}
	catch (err)
	{
		throw err;
	}
}

module.exports = {

    "getWatcherTokensFromIDs": getWatcherTokensFromIDs,
    "getSession": getSession,
    "createSession": createSession,
    "makeSessionProfile": makeSessionProfile

}
