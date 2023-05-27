
const { authentificateEdit } = require('../middleware/authentificateUser');
const { login, signup,signout, requestCheckUser } = require('../controllers/auth');

const express=require('express');
const { getHandledResult } = require('../exportable_functions/errorResponse');
const router=express.Router();

router.post('/login', async (req,res)=>{
    const handledErros={
        400:"empty username or password",
        401:"user not found"
    }
    const result= await getHandledResult(()=>login(req,res),res,handledErros)
    if (!result) return 
    const {viewToken,editToken} = await login(req,res);
    return res.status(200).send({message:'log in success',viewToken,editToken});
})
  
router.post('/signup', async (req,res)=>{
    try {
        const {viewToken,editToken} = await signup(req,res);
        return res.status(201).send({message:'sign up success',viewToken,editToken});
    }
    catch (error){
        if (error===400) return res.status(400).send({message:"empty username or password or email"})
        if (error===403) return res.status(403).send("username taken")
        return res.status(error.status||500).send({message:error.message||"internal server error"})
    }    
})

router.get('/requestCheckUser', authentificateEdit, async (req,res)=>{
    try {
        const {viewToken,user} = await requestCheckUser(req);
        return res.status(200).send({message:'Check complete, created new viewToken',viewToken,user});
    }
    catch (error){
        if (error===401) return res.status(401).send({message:"user not found"})
        return res.status(error.status||500).send({message:error.message||"internal server error"})
        }    
})

router.post('/signout',authentificateEdit,async (req,res)=>{
    try {
        const {success} = await signout(req,true);
        return res.status(200).send("signout success");
    }
    catch {
        return res.status(error.status||500).send({message:error.message||"internal server error"})
    }
})

router.post('/logout',authentificateEdit,async (req,res)=>{
    try {
        const {success} = await signout(req,true);
        return res.status(200).send("signout success");
    }
    catch {
        return res.status(error.status||500).send({message:error.message||"internal server error"})
    }
})

router.post('/signoutFromAll',authentificateEdit,async (req,res)=>{
    try {
        const {success} = await signout(req,false);
        return res.status(200).send("signout success");
    }
    catch {
        return res.status(error.status||500).send({message:error.message||"internal server error"})
    }
})  

router.post('/logoutFromAll',authentificateEdit,async (req,res)=>{
    try {
        const {success} = await signout(req,false);
        return res.status(200).send("signout success");
    }
    catch {
        return res.status(error.status||500).send({message:error.message||"internal server error"})
    }
})

module.exports = router