// db.js
const admin = require('firebase-admin');
const settings = {timestampsInSnapshots: true};
const GeoFirestore = require('geofirestore').GeoFirestore;
//const geofirex = require('geofirex');

var serviceAccount = require('./credentials/ubsafe-a816e-firebase-adminsdk-48cra-6af087f053.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
db.settings(settings);

// Firebase reference where GeoFirestore will store its information
const collectionRef = db.collection('user_locations');
// Create a GeoFirestore index
var geofire = new GeoFirestore(collectionRef);

module.exports = db;
module.exports.geo = geofire;
module.exports.Geofirestore = GeoFirestore;
