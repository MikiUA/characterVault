const express=require('express');
const router=express.Router();
const { authentificateEdit } = require('../middleware/authentificateUser');
const { newCharacter, replaceCharacter } = require('../controllers/galleryEditChar');
const { getHandledResult } = require('../exportable_functions/errorResponse');

router.use(authentificateEdit);

router.post('/collection/new',(req,res)=>{
})

router.patch('/collection/:collectionID',(req,res)=>{
})

router.delete('/collection/:collectionID',(req,res)=>{
})

router.post('/character/new',async (req,res)=>{
    const success=await getHandledResult(()=>newCharacter(req),res);
    if (success) return res.status(201).send({message:'character created'});
})

router.patch('/character/:charID',async (req,res)=>{
    
    const success=await getHandledResult(()=>replaceCharacter(req),res);
    if (success) return res.status(200).send({message:'character replaced'});
})

router.delete('/character/:charID',(req,res)=>{
})

router.post('/assignToCollection',(req,res)=>{
})

router.post('/unassignFromCollection',(req,res)=>{
})

module.exports = router