const express=require('express');
const { authentificateViewPublic, authentificateEdit, authentificateAdmin } = require('../middleware/authentificateUser');
const { getUserByID } = require('../controllers/user');
const router=express.Router();

router.get('/:userID',authentificateViewPublic,async (req,res)=>{
    const {userID}=req.params;
    const {user}= await getUserByID(userID,req.mongoClient);
    if (user) res.status(200).send(user);
    else res.status(400).send({message:"no user found"});
})

router.patch('/:userID',authentificateEdit,(req,res)=>{
    
})

router.delete('/:userID',authentificateEdit, (req,res)=>{
    
})

router.get('/all',authentificateAdmin,(req, res) =>{
    
})
module.exports = router