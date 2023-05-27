const { ObjectID } = require('bson');
const { usernameToUserID } = require('../exportable_functions/minor_functions');
const dbParams = require('../environmentVariables/dbParams');

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
        const charDB=req.mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.characters);

        await charDB.insertOne(newChar);
        return {success:true};
    }
    catch (error){throw error }

}

async function replaceCharacter(req){
    try {
        const {charID}=req.params;
        const charDB=req.mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.characters);
        const lastChar=await charDB.findOne({_id:ObjectID(charID)});
        if (!lastChar) throw {status:400,message:'No character with your identifier matched the existing database'};

        let newChar=checkDefaultNewCharacterFields(req.body);
        newChar._id=lastChar._id;
        newChar.host=usernameToUserID(req.user);
        newChar.date_created=lastChar.date_created
        newChar.date_modified=Date.now();
        
        await charDB.replaceOne({_id:ObjectID(charID)},newChar);
        return {success:true}
    }
    catch (error){throw error }
}

module.exports={newCharacter,replaceCharacter}