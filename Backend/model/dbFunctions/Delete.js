const { disconnectClient, checkClient, getConnectedClientAndCollection, MongoDO } = require("./handlers");

async function deleteOne({
        mongoClient,
        collectionName,
        filter
        // itemType?:oneOf [character,collection/workflow,user,token]
    }){
    if (!filter || typeof(filter)!=='object') throw 400;

    // return await MongoDO(mongoClient,collectionName,'deleteOne',[filter])
    try {
        const {collection:itemCollection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName); 

        const result=await itemCollection.deleteOne(filter)

        if (!result || !result.acknowledged || !result.deletedCount) return null;
        if (!checkClient(mongoClient)) disconnectClient(connectedClient);
        return result
    }
    catch (err) { throw err; }
}
async function deleteMany({
        mongoClient,
        collectionName,
        filter
        // itemType?:oneOf [character,collection/workflow,user,token]
    }){
    if (!filter ||typeof(filter)!=='object') throw 400;
    return await MongoDO(mongoClient,collectionName,'deleteMany',[filter])
}

exports.MongoDeleteOne=deleteOne
exports.MongoRemoveOne=deleteOne
exports.MongoDeleteMany=deleteMany
exports.MongoRemoveMany=deleteMany