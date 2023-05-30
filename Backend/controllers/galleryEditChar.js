const { ObjectID } = require('bson');
const { usernameToUserID } = require('../exportable_functions/usernameToUserID');
const dbParams = require('../environmentVariables/dbParams');
const { MongoInsertOne, MongoReplaceOne, MongoFindOne } = require('../model/databaseConnection');

function checkDefaultNewCharacterFields(char={}){
    let updatedChar={
        'additional params':char['additional params'] || {}
    };
    updatedChar.is_DnD=(char.is_DnD==='true'||char.is_DnD===true)?true:false;
    updatedChar.view_access=char.view_access==='public'?'public':'private';
    //check img_url is actually an image;
    updatedChar.img_url=char.img_url;
    updatedChar.refname=(typeof(char.refname)==='string' && char.refname.length<50)?char.refname:'';
    if (!char.shname || typeof(char.shname)!=='string' || char.shname.length>15) throw {status:400,message:'character short name must be a string no longer than 15 symbols'};
    updatedChar.shname = char.shname;
    updatedChar.fname=(typeof(char.fname)==='string' && char.fname.length<50)?char.fname:updatedChar.shname; 
    
    if (!char.description || typeof(char.description)!=='string') throw {status:400,message:'character description string must be included'};
    updatedChar.description = char.description;
    
    if (char.sex && (char.sex==='m' || char.sex === 'f' || char.sex === 'other')) updatedChar.sex=char.sex;
    //check if main_color is actually a color
    updatedChar.main_color=char.main_color||'#f9f9f9'
    return updatedChar;
}

async function newCharacter(req){
    try {
        let newChar=checkDefaultNewCharacterFields(req.body);
        newChar.host=usernameToUserID(req.user);
        newChar.date_created=Date.now();
        newChar.date_modified=Date.now();

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
        const lastChar=await MongoFindOne({
            collectionName:dbParams.collectionNames.characters,
            mongoClient:req.mongoClient,
            filter:{_id:ObjectID(charID)}
        });

        if (!lastChar) throw {status:404,message:'No character with your identifier matched the existing database'};

        let newChar=checkDefaultNewCharacterFields(req.body);
        newChar._id=lastChar._id;
        newChar.host=lastChar.host;
        newChar.date_created=lastChar.date_created
        newChar.date_modified=Date.now();
        
        const newCharacter=await MongoReplaceOne({
            mongoClient:req.mongoClient,
            collectionName:dbParams.collectionNames.characters,
            filter:{_id:ObjectID(charID)},
            item:newChar
        });

        return {newCharacter};
    }
    catch (error){throw error }
}

module.exports={newCharacter,replaceCharacter}