const { disconnectClient, checkClient, getConnectedClientAndCollection } = require("./handlers");

async function UpdateOne({
    mongoClient,
    collectionName,
    filter,
    item,
    // itemType?:oneOf [character,collection/workflow,user,token]
}){
    if (!item || !filter) throw 400;
try {
    const {collection:itemCollection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName); 

    const result=await itemCollection.updateOne(filter,item)

    if (!checkClient(mongoClient)) disconnectClient(connectedClient);
    return result
}
catch (err) { throw err; }
}

async function ReplaceOne({
    mongoClient,
    collectionName,
    filter,
    item,
    // itemType?:oneOf [character,collection/workflow,user,token]
}){
if (!item || !filter) throw 400;
try {
    const {collection:itemCollection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName); 

    const result=await itemCollection.replaceOne(filter,item);

    if (!checkClient(mongoClient)) disconnectClient(connectedClient);
    return result
}
catch (err) { throw err; }
}


exports.MongoUpdateOne=UpdateOne
exports.MongoReplaceOne=ReplaceOne