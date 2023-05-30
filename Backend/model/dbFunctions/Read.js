const {disconnectClient, checkClient, getConnectedClientAndCollection}=require('./handlers')

exports.MongoFindMany=async ({
        collectionName='',
        filter={},
        sort={_id:-1},
        paginationFilter={skip:0,limit:10},
        mongoClient
    })=>{
    console.log("trying to find items: ",collectionName,filter,sort,paginationFilter);
   
    try{
    //connect a database collection
        const {collection:itemCollection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName); 

    //find all requested items
        const itemObj = await itemCollection.aggregate([
            {'$match':filter},
            {'$sort':sort},
            {'$facet':{
                "stage1":[{"$group":{_id:null,count:{$sum:1}}}],
                "stage2":[{"$skip":paginationFilter.skip},{"$limit":paginationFilter.limit}]
            }},
            {$unwind:"$stage1"},
            {$project:{
                count:"$stage1.count",
                data: "$stage2"
            }}
        ]).toArray();
    //remember to close the client if it is not handled by parents
        if (!checkClient(mongoClient)) disconnectClient(connectedClient);

    //return requested items to parent function
        if (itemObj.length===0) return {"count":0, "items":[]};

        // console.log("found items : ",itemObj);
        return {"count":itemObj[0].count, "items":itemObj[0].data};
    }
    catch (err) { throw err; }
}

exports.MongoFindOne=async  ({
        collectionName='',
        filter={},
        mongoClient
    })=>{
    console.log("Search single item : ",collectionName,filter)
    // let connectedClient = new connectedClient(dbParams.URI);
    try{
    //connect a database collection
        const {collection,connectedClient}=await getConnectedClientAndCollection(mongoClient,collectionName); 
    
    //find requested item
        let item = await collection.findOne(filter);

    //remember to close the client if it is not handled by parents
        if (!checkClient(mongoClient)) disconnectClient(connectedClient);
    
    //return requested item to user
        return item||null;
    }
    catch (err) { throw err; }
}