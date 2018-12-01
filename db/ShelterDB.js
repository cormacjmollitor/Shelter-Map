var MongoClient = require('mongodb').MongoClient;	// require the mongodb driver

/**
 * Uses mongodb v3.1.9 - [API Documentation](http://mongodb.github.io/node-mongodb-native/3.1/api/)
 */
function ShelterDB(mongoUrl, dbName){
	if (!(this instanceof ShelterDB)) return new ShelterDB(mongoUrl, dbName);
	this.connected = new Promise(function(resolve, reject){
		MongoClient.connect(
			mongoUrl,
			{
				useNewUrlParser: true
			},
			function(err, client){
				if (err) reject(err);
				else {
					console.log('[MongoClient] Connected to '+mongoUrl+'/'+dbName);
					resolve(client.db(dbName));
				}
			}
		)
	});
}

ShelterDB.prototype.getShelters = function(queryParams){
	return this.connected.then(function(db){
		// TODO: Implement functionality
	})
}

ShelterDB.prototype.addShelter = function(info){
	return this.connected.then(function(db){
		// TODO: Implement functionality
	})
}

//Input shelter id, return stats object promise
ShelterDB.prototype.getStats = function(id){
	return this.connected.then(function(db){
		// TODO: Implement functionality
	})
}

module.exports = ShelterDB;
