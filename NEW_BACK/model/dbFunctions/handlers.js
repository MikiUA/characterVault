const { MongoClient } = require("mongodb");
const dbParams = require("../../env/dbParams");

function isConnected(client) {
    return !!client && !!client.topology && client.topology.isConnected()
}

async function getConnectedCollection(mongoClient, collectionName) {
    if (!(mongoClient instanceof MongoClient)) throw new Error("mongoclient passed for connection was not instance of mongoclient")
    if (!isConnected(mongoClient)) await mongoClient.connect();
    return mongoClient.db(dbParams.DBname).collection(collectionName);
}

module.exports = { getConnectedCollection, isConnected }