const { disconnectClient, checkClient,getConnectedClientAndCollection } = require("./handlers");

async function AddOne({
        mongoClient,
        collectionName,
        item,
        // itemType?:oneOf [character,collection/workflow,user,token]
    }){
    if (!item) throw 400;
    try {
        const {collection:itemCollection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName); 
    
        const result=await itemCollection.insertOne(item);

        if (!checkClient(mongoClient)) disconnectClient(connectedClient);
        return result
    }
    catch (err) { throw err; }
}

exports.MongoInsertOne=AddOne
exports.MongoCreateOne=AddOne