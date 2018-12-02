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
	// No queryparams in this moment, just return all shelters
	return this.connected.then(function(db){
		return db.collection("shelters").find({}).toArray();
	})
}

ShelterDB.prototype.addShelter = function(info){
	return this.connected.then(function(db){
		return db.collection("shelters").insertOne(info).then((res) => {
			console.log('Successfully inserted new shelter entry');
		});
	})
}

ShelterDB.prototype.getStats = function(shelter_id){
	//return stats of a specific shelter
	return this.connected.then(function(db){
		return db.collection("history").find({"_id": shelter_id}).toArray();
	})
}

module.exports = ShelterDB;
