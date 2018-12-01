
// db.js
const admin = require('firebase-admin');
const settings = {timestampsInSnapshots: true};
const GeoFirestore = require('geofirestore').GeoFirestore;

//var serviceAccount = require('./test_credentials/ubsafe-testing-firebase-adminsdk-nd5ox-0a6d0774f2.json');
var serviceAccount = require('./test_credentials/ubsafe-testdb-firebase-adminsdk-llynq-460e473fb4.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
db.settings(settings);

// Firebase reference where GeoFirestore will store its information
const collectionRef = db.collection('user_locations');
// Create a GeoFirestore index
var geofire = new GeoFirestore(collectionRef);

//initialize test db with test data
/*
TestData.userArray.forEach( user => {
    await User.db.collection('users').doc('RecommendationsRequestor').set(testUsers[0]);
});
*/


module.exports = db;
module.exports.geo = geofire;
module.exports.Geofirestore = GeoFirestore;
