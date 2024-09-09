const { getConnectedCollection } = require("./handlers");

async function UpdateOne({
    mongoClient,
    collectionName,
    filter,
    item,
    // itemType?:oneOf [character,collection/workflow,user,token]
}) {
    if (!item || !filter) throw 400;
    try {
        const collection = await getConnectedCollection(mongoClient, collectionName);
        return await collection.updateOne(filter, item);
    }
    catch (err) { throw err; }
}

async function ReplaceOne({
    mongoClient,
    collectionName,
    filter,
    item,
    // itemType?:oneOf [character,collection/workflow,user,token]
}) {
    if (!item || !filter) throw 400;
    try {
        const collection = await getConnectedCollection(mongoClient, collectionName);
        return await collection.replaceOne(filter, item);
    }
    catch (err) { throw err; }
}


exports.MongoUpdateOne = UpdateOne
exports.MongoPatchOne = UpdateOne
exports.MongoReplaceOne = ReplaceOne