const { getConnectedCollection } = require('./handlers')

async function MongoFindMany({
    collectionName = '',
    filter = {},
    sort = { _id: -1 },
    paginationFilter = { skip: 0, limit: 10 },
    mongoClient
}) {
    // console.log("trying to find items: ", collectionName, filter, sort, paginationFilter);
    try {
        //connect a database collection
        const collection = await getConnectedCollection(mongoClient, collectionName);

        //find all requested items
        const itemObj = await collection.aggregate([
            { '$match': filter },
            { '$sort': sort },
            {
                '$facet': {
                    "stage1": [{ "$group": { _id: null, count: { $sum: 1 } } }],
                    "stage2": [{ "$skip": paginationFilter.skip }, { "$limit": paginationFilter.limit }]
                }
            },
            { $unwind: "$stage1" },
            {
                $project: {
                    count: "$stage1.count",
                    data: "$stage2"
                }
            }
        ]).toArray();

        //return requested items to parent function
        if (itemObj.length === 0) return { "count": 0, "items": [] };

        // console.log("found items : ",itemObj);
        return { "count": itemObj[0].count, "items": itemObj[0].data };
    }
    catch (err) { throw err; }
}

async function MongoFindOne({
    collectionName = '',
    filter = {},
    mongoClient
}) {
    // console.log("Search single item : ", collectionName, filter)\
    try {
        //connect a database collection
        const collection = await getConnectedCollection(mongoClient, collectionName);

        //find requested item
        let item = await collection.findOne(filter);

        //return requested item to user
        return item || null;
    }
    catch (err) { throw err; }
}

module.exports = { MongoFindOne, MongoFindMany }