/*
 * Tests the alert model
 * 
 * Functions Tested:
 *   - sendNotifications
 *   - createMessage
 */

jest.mock('../db.js', () => {
	const MockFirebase = require('mock-cloud-firestore');
	const db = new MockFirebase().firestore();
	return db;
});

const Expo = require('expo-server-sdk').Expo;
const Alert = require('../models/alert');

describe('alert.js tests', function () {
    it ("sends an alert and returns with a successful status", async () => {
        var tokens = [
            "ExponentPushToken[si1JbhFlVLoCFLbxqaKoFn]" //lisa's push token
        ];
        var msg = {
            "body": "Test notification.",
            "data": {"alertCode": 0}
        };
        Alert.sendNotifications(tokens, msg).then(r => {expect(r).toContainEqual(
            expect.objectContaining( [{ "id": expect.anything(), "status": "ok" }] )
        )});
    });

    it ("throws an error when sendNotifications is given an array that contains no valid Expo device tokens", async () => {
        return await Alert.sendNotifications(["843wp9u63qau"], {}).then().catch(err => {expect(err).toEqual(new Error('Invalid device token.'))});
    });

    test("returns appropriate object for alertCode 0", () => {
        var expectedResponse = {
            "body": "testName has terminated the Virtual Companion Session.",
            "data": {"alertCode": 0}
        };
        expect(Alert.createMessage("testName", 0, null)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 1", () => {
        var expectedResponse = {
            "body": "testName has reached their destination!",
            "data": {"alertCode": 1}
        };
        expect(Alert.createMessage("testName", 1, null)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 2", () => {
        var expectedResponse = {
            "body": "testName is moving away from their location!",
            "data": {"alertCode": 2}
        };
        expect(Alert.createMessage("testName", 2, null)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 3", () => {
        var expectedResponse = {
            "body": "testName has triggered an emergency alarm!",
            "data": {"alertCode": 3}
        };
        expect(Alert.createMessage("testName", 3, null)).toEqual(expectedResponse);
    });

    test("returns appropraite object for alertCode 4", () => {
        var expectedResponse = {
            "body": "testName has not moved in 5 minutes!",
            "data": {"alertCode": 4}
        };
        expect(Alert.createMessage("testName", 4, null)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 5", () => {
        var expectedResponse = {
            "body": "Lost connection with testName!",
            "data": {"alertCode": 5}
        };
        expect(Alert.createMessage("testName", 5, null)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 6", () => {
        var expectedResponse = {
            "body": "testName is nearby and might be in trouble!",
            "data": {
                "alertCode": 6,
                "userLoc": "testLoc",
                "userName": "testName"
            }
        };
        var additionalData = {
            "userLoc": "testLoc",
            "userName": "testName"
        }
        expect(Alert.createMessage("testName", 6, additionalData)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 7", () => {
        var expectedResponse = {
            "body": "testName has invited you to their Virtual Companion Session!",
            "data": {
                "alertCode": 7,
                "id": "testID",
                "data": "testData"
            }
        };
        var additionalData = {
            "id": "testID",
            "data": "testData"
        }
        expect(Alert.createMessage("testName", 7, additionalData)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 8", () => {
        var expectedResponse = {
            "body": "testName has joined your Companion Session!",
            "data": {"alertCode": 8}
        };
        expect(Alert.createMessage("testName", 8, null)).toEqual(expectedResponse);
    });

    test("returns appropriate object for alertCode 9", () => {
        var expectedResponse = {
            "body": "testName is near their destination!",
            "data": {"alertCode": 9}
        };
        expect(Alert.createMessage("testName", 9, null)).toEqual(expectedResponse);
    });

    it('throws error when given createMessage is given an invalid alert code', () => {
        expect(() => {Alert.createMessage()}).toThrow();
    });
});

