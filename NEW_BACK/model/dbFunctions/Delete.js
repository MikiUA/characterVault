const { getConnectedCollection } = require("./handlers");

async function deleteOne({
    mongoClient,
    collectionName,
    filter
    // itemType?:oneOf [character,collection/workflow,user,token]
}) {
    if (!filter || typeof (filter) !== 'object') throw new Error(`mongoDeleteOne filter type is not object, it is: ${typeof (filter)}`);

    try {
        const collection = await getConnectedCollection(mongoClient, collectionName);
        const result = await collection.deleteOne(filter);

        if (!result || !result.acknowledged || !result.deletedCount) return null;
        return result
    }
    catch (err) { throw err; }
}

async function deleteMany({
    mongoClient,
    collectionName,
    filter
    // itemType?:oneOf [character,collection/workflow,user,token]
}) {
    if (!filter || typeof (filter) !== 'object') throw 400;
    const collection = await getConnectedCollection(mongoClient, collectionName);
    return await collection.deleteMany(filter);
}

exports.MongoDeleteOne = deleteOne
exports.MongoRemoveOne = deleteOne
exports.MongoDeleteMany = deleteMany
exports.MongoRemoveMany = deleteMany