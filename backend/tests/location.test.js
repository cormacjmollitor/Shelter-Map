/*
 * Tests the location model
 * 
 * Functions Tested:
 *   - getNearbyUsers
 *   - getUserLocation
 */

jest.mock('../db.js', () => {
    const db = require('./test_db');
    return db;
});

beforeAll(async () => {
        await User.db.collection('users').doc(TestData.locationTestUser.userID).set(TestData.locationTestUser);
        await User.db.geo.set(TestData.locationTestUser.userID, TestData.testLocDoc);

        await User.db.collection('users').doc(TestData.locationTestNearbyUser.userID).set(TestData.locationTestNearbyUser);
        await User.db.geo.set(TestData.locationTestNearbyUser.userID, TestData.testLocDoc);
    
        await User.db.collection('users').doc(TestData.locationTestOutsideRangeUser.userID).set(TestData.locationTestOutsideRangeUser);
        await User.db.geo.set(TestData.locationTestOutsideRangeUser.userID, TestData.testLocDocOutsideRange);
	return;
});

const db = require('../db.js');
const TestData = require('./testdata');
const firebase = require('firebase-admin');
const User = require('../models/user');
const Location = require('../models/location');
jest.setTimeout(30000);

describe('location.js tests', function () {
    it('gets a user who is nearby the test user and checks that a different user slightly outside of desired proximity does not appear', async () => {
        let nearbyUsers = await Location.getNearbyUsers(TestData.testLocDoc.coordinates, 10);
	   expect(nearbyUsers).toContainEqual(TestData.locationTestNearbyUser);
        expect(nearbyUsers).not.toContainEqual(TestData.locationTestOutsideRangeUser);
    });

    it('throws an error when passing invalid data to getNearbyUsers', async () => {
        var testUserLoc = new firebase.firestore.GeoPoint(37.79, -122.41);
        var loc = {
            coordinates: new firebase.firestore.GeoPoint(37.79, -122.41)
        };
        let newUserLocation = await User.db.geo.set('testUser', loc);
        return Location.getNearbyUsers(testUserLoc, 5).then().catch();
    });

    it("returns a user's location & preferred proximity", async () => {
        let newUser = await User.db.collection('users').doc(TestData.locationTestUser.userID).set(TestData.locationTestUser);
        let newUserLocation = await User.db.geo.set(TestData.locationTestUser.userID, TestData.testLocDoc);
        return await Location.getUserLocation(TestData.locationTestUser.userID).then(res => {
            expect(res).toEqual(TestData.locOracle);
        });
    });

    it("throws an error when passing an invalid user to getUserLocation", async () => {
        return await Location.getUserLocation('non-existantUser').then().catch(err => { expect(err).toEqual( new Error("Could not find user's location.") ) });
    });
});

