const jwt= require('jsonwebtoken');
const { ACCESS_TOKEN_VIEW,ACCESS_TOKEN_VIEW_EXPIERY_TIMER,ACCESS_TOKEN_EDIT } = require('../environmentVariables/accessTokens');
const dbParams = require("../environmentVariables/dbParams");
const { MongoCreateOne, MongoFindOne } = require("./databaseConnection");

exports.createViewToken=({userid,device='unhandled'})=>{
    const viewToken=jwt.sign({userid:userid},ACCESS_TOKEN_VIEW, {expiresIn:ACCESS_TOKEN_VIEW_EXPIERY_TIMER});
    return viewToken
}

exports.createEditToken=async({userid,device='unhandled'},mongoClient)=>{
    const editToken=jwt.sign({username:userid},ACCESS_TOKEN_EDIT).split('.')[2];
    await MongoCreateOne({
        mongoClient:mongoClient,
        collectionName:dbParams.collectionNames.sessionTokens,
        item:{
            _id:editToken,
            userid:userid
        }
    })
    return editToken
}

exports.createViewEditTokens=async({userid,device},mongoClient)=>{
    const viewToken=await this.createViewToken({userid,device});
    const editToken=await this.createEditToken({userid,device},mongoClient);
    return {viewToken,editToken}
}

exports.verifyViewToken=async(token)=>{
    try {
        const user=jwt.verify(token,ACCESS_TOKEN_VIEW);
        return user['userid']||null
    }
    catch {
        return null
    }
}

exports.verifyEditToken=async(token,mongoClient)=>{
    try {
        const userToken = await MongoFindOne({
            mongoClient,
            filter:{_id:token},
            collectionName:dbParams.collectionNames.sessionTokens
        })
        return userToken['userid']||null;
    }
    catch{
        return null
    }
}