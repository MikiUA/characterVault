const { getCharacters,getCollections, getCollectionCharacters, getSingleCollection, getSingleChar } = require('../controllers/galleryView');
const { queryToCharFilters } = require('../middleware/queryToCharFilters');
const { authentificateViewPrivate, authentificateAdmin, authentificateViewPublic } = require('../middleware/authentificateUser');
 
const express=require('express');
const { getHandledResult } = require('../exportable_functions/errorResponse');
const { ObjectId } = require('mongodb');
const router=express.Router();


router.get('/', queryToCharFilters,async (req,res)=>{
    getCharacters(req,res,{"view_access":"public"});
});    

router.get('/characterlist/my', authentificateViewPrivate, queryToCharFilters, async (req,res)=>{
    getCharacters(req,res,{"host":req.user});
})

router.get('/characterlist/:userID',authentificateViewPublic, queryToCharFilters,(req,res)=>{
    let {userID}=req.params;
    getCharacters(req,res,{"host":userID});
})

router.get('/characterlist/all',authentificateAdmin, queryToCharFilters, (req,res)=>{
    getCharacters(req,res,{});
})


router.get('/characterlist/collection/:collectionID',authentificateViewPublic, queryToCharFilters, async (req,res)=>{
    const {collectionID} = req.params;
    getCollectionCharacters(req,res,collectionID);
})

router.get('/collectionlist/my',authentificateViewPrivate,async (req,res)=>{
    let filter={"host":req.user};
    getCollections(req,res,filter);
})

router.get('/collectionlist/:userID',authentificateViewPublic,async(req,res)=>{
    const {userID}=req.params;
    let filter={"host":userID};
    getCollections(req,res,filter);
})

router.get('/collectionlist/all',authentificateAdmin,async (req,res)=>{
    getCollections(req,res,{});
})


router.get('/collection/:collectionID',authentificateViewPublic,async (req,res)=>{
    const {collectionID}=req.params;
    const {item}= getSingleCollection(req,{_id:collectionID});
    return res.status(200).send(item);
})

router.get('/character/:characterID',authentificateViewPublic,async(req,res)=>{    
    const {characterID}=req.params;

    const item= await getHandledResult(()=>getSingleChar(req,{_id:ObjectId(characterID)}),res)
    if (item) return res.status(200).send(item.item);
})

module.exports = router