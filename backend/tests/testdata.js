const firebase = require('firebase-admin');

let userArray = [
    {
        "userName": "Traveller",
        "ratingHistory": [1,3,2,4,7,5,0,5],
        "userID": "Traveller",
        "gender": "Other",
        "rating": 3.375,
        "age": 80,
        "preferences": {
            "female": true,
            "male": true,
            "proximity": 5,
            "other": true,
            "ageMax": 80,
            "ageMin": 0
        },
        "deviceToken": "ExponentPushToken[si1JbhFlVLoCFLbxqaKoFn]"
    },
    {
        "userName": "MatchingCompanion",
        "userID": "MatchingCompanion",
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
        "deviceToken": "ExponentPushToken[si1JbhFlVLoCFLbxqaKoFn]"
    },

    {
        "userName": "OldUser",
        "ratingHistory": [1,3,2,4,7,5,0,5],
        "userID": "OldUser",
        "gender": "Female",
        "age": 100,
        "preferences": {
            "female": true,
            "male": false,
            "proximity": 5,
            "other": true,
            "ageMax": 80,
            "ageMin": 0
        },
        "deviceToken": "OldUserDeviceToken"
    },

    {
        "userName": "MaleUser",
        "ratingHistory": [1,3,2,4,7,5,0,5],
        "userID": "MaleUser",
        "gender": "Male",
        "age": 80,
        "preferences": {
            "female": true,
            "male": false,
            "proximity": 5,
            "other": true,
            "ageMax": 80,
            "ageMin": 0
        },
        "deviceToken": "MaleUserDeviceToken"
    },
    {
        "userName": "FemaleUser",
        "ratingHistory": [1,3,2,4,7,5,0,5],
        "userID": "FemaleUser",
        "gender": "Female",
        "rating": 3.375,
        "age": 20,
        "preferences": {
            "female": true,
            "male": false,
            "proximity": 5,
            "other": true,
            "ageMax": 80,
            "ageMin": 0
        },
        "deviceToken": "FemaleUserDeviceToken"
    }
];

let recommendationOracle = {
        "userName": "MatchingCompanion",
        "userID": "MatchingCompanion",
        "gender": "Other",
        "rating": 3.375,
        "age": 80
};

let sessionRequest = {
	"travellerID": "Traveller",
	"watcherIDs": ["MatchingCompanion", "FemaleUser", "MaleUser"],
	"travellerDest": new firebase.firestore.GeoPoint(0, 0), 
	"travellerSource": new firebase.firestore.GeoPoint(0, 0),
	"travellerLocation": new firebase.firestore.GeoPoint(0, 0),
	"lastUpdated": 0
};

let sessionOracle = {
	"id": "SuUjbfoBlVzTW1y4a0XM",
	"data": {
	    "traveller": {
		"id": "Traveller",
		"name": "Traveller",
		"deviceToken": "ExponentPushToken[si1JbhFlVLoCFLbxqaKoFn]"
	    },
	    "travellerSource": new firebase.firestore.GeoPoint(0,0),
	    "travellerDest": new firebase.firestore.GeoPoint(0,0),
	    "travellerLoc": new firebase.firestore.GeoPoint(0,0),
	    "lastUpdated": 0,
	    "joinedWatchers": [],
	    "active": true
	}
};


let userControllerReq = {
	"userName": "Test User",
	"ratingHistory": [1, 3, 2, 4, 7, 5, 0, 5],
	"userID": "testUser",
	"gender": null,
	"rating": 3.375,
	"age": 80,
	"preferences.female": true,
	"preferences.male": false,
	"preferences.other": true,
	"preferences.ageMin": 16,
	"preferences.ageMax": 100,
	"preferences.proximity": 20,
	"deviceToken": "TestUserDeviceToken"
}; 

let locationTestUser = {
    "userName": "Location Test User",
    "ratingHistory": [1, 3, 2, 4, 7, 5, 0, 5],
    "userID": "LocationTestUserID",
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
};
let locationTestNearbyUser = {
    "userName": "Nearby User",
    "ratingHistory": [1, 3, 2, 4, 7, 5, 0, 5],
    "userID": "NearbyUserID",
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
"deviceToken": "ExponentPushToken[si1JbhFlVLoCFLbxqaKoFn]"
};
let locationTestOutsideRangeUser = {
    "userName": "Outside Range User",
    "ratingHistory": [1, 3, 2, 4, 7, 5, 0, 5],
    "userID": "OutsideRangeUserID",
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
"deviceToken": "ExponentPushToken[si1JbhFlVLoCFLbxqaKoFn]"
};
let locOracle = new firebase.firestore.GeoPoint(37.79, -122.41);
var testLocDoc = {
    coordinates: new firebase.firestore.GeoPoint(37.79, -122.41)
};
var testLocDocOutsideRange = {
    coordinates: new firebase.firestore.GeoPoint(37.79, -122.56)
};


module.exports = {
        "userArray": userArray,
	"sessionRequest": sessionRequest,
	"sessionOracle": sessionOracle,
	"userControllerReq": userControllerReq,
	"locationTestUser": locationTestUser,
	"locOracle": locOracle,
	"testLocDoc": testLocDoc,
	"locationTestNearbyUser": locationTestNearbyUser,
    "testLocDocOutsideRange": testLocDocOutsideRange,
	"locationTestOutsideRangeUser": locationTestOutsideRangeUser,
	"recommendationOracle": recommendationOracle
}
