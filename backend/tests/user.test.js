/*
 * Tests the user model
 * 
 * Functions Tested:
 *   - getUser
 *   - getAvgRating
 *   - getUserProfiles
 *   - getDeviceTokens
 */

jest.mock('../db.js', () => {
	const MockFirebase = require('mock-cloud-firestore');
	const db = new MockFirebase().firestore();
	return db;
});

const db = require('../db.js');
const User = require('../models/user');

describe('user.js tests', function () {
    it('retrieves a user that exists in the database by their user ID', async () => {
        var testUser = {
            age: 15,
            username: 'user_a'
        };
        let newUser = await db.collection('users').doc('getUserTest').set(testUser);
        return await User.getUser('getUserTest').then(user => {expect(user).toEqual(testUser)});
    })

    it("throws an error when asked to retrieve a user that doesn't exist in the database", async () => {
        return await User.getUser('non-existentUser').then().catch(err => {expect(err).toEqual(new Error('Cannot find user non-existentUser in the database.'))});
    })

    test("can calculate the average of an array", () => {
        let ratings = [0, 0, 1, 2, 3, 4, 5];
        expect(User.getAvgRating(ratings)).toBe((15/7));
    });

    test("returns -1 when asked to calculate the average of an empty array", () => {
        let ratings = [];
        expect(User.getAvgRating(ratings)).toBe(-1);
    });

    test("can return an array of user device tokens when given an array of users", () => {
        let testUsers = [
            {
                "deviceToken": "JonDeviceToken",
                "userName": "Jon Smith",
                "userID": "10157425230694386",
                "gender": "Male",
                "age": 21,
                "preferences": {
                    "proximity": -1,
                    "other": true,
                    "ageMax": 80,
                    "ageMin": 18,
                    "female": true,
                    "male": true
                }
            },
            {
                "userID": "10215891348511047",
                "gender": "Male",
                "rating": 0.5,
                "age": 21,
                "preferences": {
                    "ageMin": 1,
                    "female": true,
                    "male": true,
                    "proximity": 100,
                    "other": true,
                    "ageMax": 55
                },
                "deviceToken": "CormacDeviceToken",
                "userName": "Cormac Mollitor",
                "ratingHistory": [
                    0,
                    1
                ]
            },
            {
                "ratingHistory": [
                    3,
                    3,
                    3,
                    2,
                    4,
                    5,
                    0,
                    5
                ],
                "userID": "1146564348829220",
                "gender": "Female",
                "rating": 3.125,
                "age": 21,
                "preferences": {
                    "female": true,
                    "male": true,
                    "proximity": 2,
                    "other": true,
                    "ageMax": 25,
                    "ageMin": 18
                },
                "deviceToken": "LisaDeviceToken",
                "userName": "Lisa Kirby"
            },
            {
                "userName": "Changed Test User",
                "ratingHistory": [
                    1,
                    3,
                    2,
                    4,
                    7,
                    5,
                    0,
                    5
                ],
                "userID": "testID",
                "gender": "Other",
                "rating": 3.375,
                "age": 80,
                "preferences": {
                    "female": true,
                    "male": false,
                    "proximity": 5,
                    "other": true,
                    "ageMax": 80,
                    "ageMin": 0
                },
                "deviceToken": "TestUserDeviceToken"
            }
        ];
        let tokens = ["JonDeviceToken", "CormacDeviceToken", "LisaDeviceToken", "TestUserDeviceToken"];
        expect(User.getDeviceTokens(testUsers)).toEqual(tokens);
    });

    test("returns an empty array when attempting to get device tokens from an empty user array", () => {
        let testUsers = [];
        let tokens = [];
        expect(User.getDeviceTokens(testUsers)).toEqual(tokens);
    });


    test("returns the user profiles of the users in a user array", () => {
        let testUser = {
            "ratingHistory":[1,3,2,4,7,5,0,5],
            "userID":"testID",
            "gender":"Other",
            "rating":3.375,
            "age":80,
            "preferences":
            {
                "ageMin":0,
                "female":true,
                "male":false,
                "proximity":5,
                "other":true,
                "ageMax":80
            },
            "deviceToken":"TestUserDeviceToken",
            "userName":"Test User"
        };
        let profile = {
                "userID": "testID",
                "userName": "Test User",
                "age": 80,
                "gender": "Other",
                "rating": 3.375
            };
        let userArr = [];
        userArr.push(testUser);
        expect(User.getUserProfiles(userArr).length).toBe(1);
        expect(User.getUserProfiles(userArr)[0]).toEqual(profile);
    });

    test("returns an empty array when attempting to get user profiles of an empty array of users", () => {
        let userArr = [];
        expect(User.getUserProfiles(userArr).length).toBe(0);
        expect(User.getUserProfiles(userArr)[0]).toEqual(undefined);
    });
});
