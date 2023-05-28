const { dbParams } = require("../environmentVariables/dbParams");
const { MongoFindOne } = require("../exportable_functions/databaseConnection");

async function getUserByID(req,userID){
    const {item} = await MongoFindOne({
        collectionName:dbParams.collectionNames.users,
        filter:{_id:userID},
        mongoClient:req.mongoClient
    });
    return {user:item};//TODO: prepare user data (not send password and else)
}

module.exports={getUserByID}