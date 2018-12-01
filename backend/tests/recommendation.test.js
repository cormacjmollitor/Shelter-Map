/*
 * Tests the recommendation model
 * 
 * Functions Tested:
 *   - getRecommendations
 *   - filterRecommendations
 *   - matchesPreferences
 */

jest.mock('../db.js', () => {
    const db = require('./test_db');
    return db;
});

jest.setTimeout(30000);

const db = require('../db.js');
const firebase = require('firebase-admin');
const User = require('../models/user');
const Recommendation = require('../models/recommendation');
const TestData = require('./testdata');

beforeAll(async () => {
	await TestData.userArray.forEach(async (user) => {
		await db.collection('users').doc(user.userID).set(user);
		await User.db.geo.set(user.userID, TestData.testLocDoc);
	});
	return;
});


describe('recommendation.js tests', function () {
    it("recommends companions who match a user's preferences", async () => {
        return await Recommendation.getRecommendations('Traveller').then(users => {expect(users).toContainEqual(TestData.recommendationOracle)});
    });

    it('throws an error when passing a non-existant user to getRecommendations', async () => {
        return Recommendation.getRecommendations('non-existantUser').then().catch(err => {expect(err).toEqual(new Error("Cannot find user non-existantUser in the database."))});
    });
});

