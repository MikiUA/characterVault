const dbParams = require('../environmentVariables/dbParams');
const { ObjectId } = require('mongodb');
const { MongoInsertOne, MongoReplaceOne, MongoFindOne, MongoDeleteOne } = require('../model/databaseConnection');

const { usernameToUserID } = require('../exportable_functions/usernameToUserID');
const {character,characterGenerationError}=require('../schemas/characterClass');

async function newCharacter(req){
    try {
        const newChar=new character({
            ...req.body,
            host:usernameToUserID(req.user)
        })

        const newCharacter=await MongoInsertOne({
            mongoClient:req.mongoClient,
            collectionName:dbParams.collectionNames.characters,
            item:newChar
        })
        return {newCharacter};
    }
    catch (error){throw error }

}

async function replaceCharacter(req){
    try {
        const {charID}=req.params;
        if (!ObjectId.isValid(charID)) throw 404
        const lastChar=await MongoFindOne({
            collectionName:dbParams.collectionNames.characters,
            mongoClient:req.mongoClient,
            filter:{_id:ObjectId(charID)}
        });

        if (!lastChar) throw {status:404,message:'No character with your identifier matched the existing database'};

        let newChar=new character({
            ...lastChar,...req.body
        });
        
        const newCharacter=await MongoReplaceOne({
            mongoClient:req.mongoClient,
            collectionName:dbParams.collectionNames.characters,
            filter:{_id:ObjectId(charID)},
            item:newChar
        });

        return {newCharacter};
    }
    catch (error){
        if (error===characterGenerationError) throw 400
        throw error }
}
async function deleteCharacter(req){
    try {
        const {charID}=req.params;
        if (!ObjectId.isValid(charID)) throw 404

        const lastChar=await MongoDeleteOne({
            collectionName:dbParams.collectionNames.characters,
            mongoClient:req.mongoClient,
            filter:{_id:ObjectId(charID)}
        });

        if (!lastChar) throw 404;
        return {response:lastChar};
    }
    catch (error){
        if (error===characterGenerationError) throw 400
        throw error }
}

module.exports={newCharacter,replaceCharacter,deleteCharacter}