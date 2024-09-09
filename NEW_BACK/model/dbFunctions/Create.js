const { getConnectedCollection } = require("./handlers");

async function MongoCreateOne({
    mongoClient,
    collectionName,
    item,
    // itemType?:oneOf [character,collection/workflow,user,token]
}) {
    if (!item) throw "MongoCreate Item not passed";
    try {
        const collection = await getConnectedCollection(mongoClient, collectionName);
        const result = await collection.insertOne(item);
        return result
    }
    catch (err) { throw err; }
}

module.exports = MongoCreateOne