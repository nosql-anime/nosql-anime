const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const userDB = 'anime';
const ObjectID = require('mongodb').ObjectID;

const mongoConnect = function(url) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(error, client) {
            if(error){
                return reject(error);
            }

            resolve(client);

        });
    });
}

let DB = function() {};


DB.prototype.init = async function() {
    this.client = await MongoClient.connect(url, { useNewUrlParser: true });
    this.db = this.client.db(userDB);
}

DB.prototype.close = function() {
    this.client.close();
}

DB.prototype.animeCollection = function() {
    return this.db.collection('animes');
}

DB.prototype.userCollection = function() {
    return this.db.collection('users');
}

DB.prototype.toObjectID = function(id) {
    return new ObjectID(id);
}

module.exports = DB;