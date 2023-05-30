const { MongoClient } = require("mongodb");
const dbParams = require("../../environmentVariables/dbParams");

function isConnected(client) {
    return !!client && !!client.topology && client.topology.isConnected()
}

function checkClient(mongoClient){
    return mongoClient instanceof MongoClient
}

async function connectClient(mongoClient){
    if (!isConnected(mongoClient)) await mongoClient.connect();
    return
}

async function disconnectClient(mongoClient){
    if (isConnected(mongoClient)) mongoClient.close();
}

async function getConnectedClient(mongoClient){
    const newClient=(mongoClient instanceof MongoClient && mongoClient)||new MongoClient();
    await connectClient(newClient);
    return newClient
}
async function getConnectedClientAndCollection(mongoClient,collectionName){
    if (collectionName) throw new Error('collection name has to be passed')
    const connectedClient=await getConnectedClient(mongoClient);
    const collection=connectedClient.db(dbParams.DBname).collection(collectionName);
    return {collection,connectedClient};
}

async function MongoDO(mongoClient,collectionName,option,optionParams){
    try {
        const {collection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName);
        const result = await collection[option](...optionParams); 
        if (!checkClient(mongoClient)) disconnectClient(connectedClient);
        return result
    }
    catch (err) { throw err; }
}
module.exports={MongoDO,getConnectedClient,getConnectedClientAndCollection,checkClient,disconnectClient}