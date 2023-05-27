const {MongoClient} = require('mongodb');
const dbParams=require('../environmentVariables/dbParams');

exports.MongoFindMany=async ({collectionName='',filter={},sort={_id:-1},paginationFilter={skip:0,limit:10},mongoClient})=>{
    console.log("trying to find items: ",collectionName,filter,sort,paginationFilter);
    // let mongoClient = new MongoClient(dbParams.URI);
    try{
    //connect a databse
        // await mongoClient.connect();
        let itemCollection = mongoClient.db(dbParams.DBname).collection(collectionName);

    //find all requested items
        let itemObj = await itemCollection.aggregate([
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
        if (itemObj.length===0) return {"count":0, "items":[]};

        // console.log("found items : ",itemObj);
        let {count,data}=itemObj[0];

    //send all characters to user
        return {"count":count, "items":data};
    }
    catch(err){ 
        throw err
    }
}

exports.MongoFindOne=async ({collectionName,filter,mongoClient})=>{
    console.log("Search single item : ",filter)
    // let mongoClient = new MongoClient(dbParams.URI);
    try{
    //connect a databse
    // await mongoClient.connect();
        const collection=mongoClient.db(dbParams.DBname).collection(collectionName);
        let item = await collection.findOne(filter);
        
        return item||null;
    }
    catch(err){ throw err}
}