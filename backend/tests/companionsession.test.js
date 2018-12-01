/*
 * Tests the companionsession model
 * 
 * Functions Tested:
 *   - makeCompanionSession
 *   - makeSessionProfile
 *   - getWatcherTokensFromIDs
 *   - getSession
 *   - createSession
 */

jest.mock('../db.js', () => {
	const MockFirebase = require('mock-cloud-firestore');
	const db = new MockFirebase().firestore();
	return db;
});

const Session = require('../models/companionsession');
const TestData = require('./testdata');
const User = require('../models/user');

describe('companionsession.js tests', function () {
    it('makes a session profile when given a user object', () => {
        var oracle = {
            "id": "testID",
            "name": "Test User",
            "deviceToken": "testDeviceToken"
        };
        var testUser = {
                "userName": "Test User",
                "ratingHistory": [1,3,2,4,7,5,0,5],
                "userID": "testID",
                "gender": "Female",
                "rating": 3.375,
                "age": 20,
                "deviceToken": "testDeviceToken",
                "preferences": {
                    "female": true,
                    "male": false,
                    "proximity": 5,
                    "other": true,
                    "ageMax": 80,
                    "ageMin": 0
                }
            };
        expect(Session.makeSessionProfile(testUser)).toEqual(oracle);
    });

    it('extracts an array of device tokens when given an array of user IDs and throws an error when given an array of invalid ids', async () => {
	let invalidIDs = ["invalidID1", "invalidID2", "invalidID3"];
        await expect(Session.getWatcherTokensFromIDs(invalidIDs)).rejects.toThrow();
        let oracle = [];
        let testWatcherIDs = [];
        await TestData.userArray.forEach(async (user) => {
            await User.db.collection('users').doc(user.userID).set(user);
            testWatcherIDs.push(user.userID);
            oracle.push(user.deviceToken);
        });
        expect((await Session.getWatcherTokensFromIDs(testWatcherIDs)).sort()).toEqual(oracle.sort());
    });

    it('can create and retrieve a companion session from the database', async () => {
	    let oracle = TestData.sessionOracle;
	    //test failure of companion session creation
	    let sessionRequest = {}; 
	    let sessionResponse = await expect(Session.createSession(sessionRequest)).rejects.toThrow();
	    //test successful creation of a companion session
	    sessionRequest = TestData.sessionRequest; 
	    sessionResponse = await Session.createSession(sessionRequest);
	    expect(sessionResponse.data).toEqual(oracle.data);
	    //test failed retrieval of a companion session
	    await expect(Session.getSession('invalidSessionID')).rejects.toThrow();
	    //test successful retrieval of a companion session
	    let fetchedSession = await Session.getSession(sessionResponse.id);
	    expect(fetchedSession).toEqual(oracle.data);
    });
});
