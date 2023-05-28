const express= require('express');
const router=express.Router();
// const {MongoClient, ObjectId} = require('mongodb');
const {MongoFindMany, MongoFindOne} =require('../exportable_functions/databaseConnection');
const dbParams = require('../environmentVariables/dbParams');


async function getCharacters(req,filter={}){
    const {count,items} = await MongoFindMany({
        collectionName:dbParams.collectionNames.characters,
        filter:{...req.filter,...filter},
        paginationFilter:req.paginationFilter,
        sort:req.sort,
        mongoClient:req.mongoClient
    });
    // return res.status(200).send({
    return ({
        message:'got characters',
        totalItems:count,
        items:items//TODO: prepare characters??
    });
}
async function getCollections(req,filter={}){
    const {count,items}  = await MongoFindMany({
        collectionName:dbParams.collectionNames.workflows,
        filter:{...filter,...req.filter},
        // paginationFilter:req.paginationFilter,
        // sort:req.sort,
        //TODO: uncomment upper lines and make sure they work
        mongoClient:req.mongoClient
    });
    return ({
        message:'got collections',
        totalItems:count,
        items:items//TODO: prepare characters??
    });
}

async function getCollectionCharacters(req,collectionID){
    
    const {item,error}= await MongoFindOne({
        collectionName:dbParams.collectionNames.workflows,
        filter:{_id:collectionID},
        mongoClient:req.mongoClient
    })
    if (error || !item) throw error;

    const char_filter={"_id":{"$in":item.char_list}};
    return await getCharacters(req,res,char_filter);
}


async function getSingleChar(req,filter){
    const item=await MongoFindOne({
        collectionName:dbParams.collectionNames.characters,
        filter,
        mongoClient:req.mongoClient
    })
    //TODO: Prepare char (item)
    if (!item) throw {status:400,message:"no character found"}
    return {item}
}
async function getSingleCollection(req,filter){
    const {item}=await MongoFindOne({
        collectionName:dbParams.collectionNames.workflows,
        filter,
        mongoClient:req.mongoClient
    })
    if (!item) throw {status:400,message:"no collection found"}
    //TODO: Prepare collection (item)
    return {item}
}



module.exports = {getCharacters,getCollections,getCollectionCharacters,getSingleChar,getSingleCollection}