const jwt=require('jsonwebtoken');
const dbParams =require('../environmentVariables/dbParams');
const { ACCESS_TOKEN_VIEW } = require('../environmentVariables/accessTokens');
const { usernameToUserID } = require('../exportable_functions/minor_functions');

function verifyViewToken(req){
    req.accessType="view";
    const authHeader=req.headers['authorization'];
    const authtoken=authHeader && authHeader.split(' ')[1];
    if (!authtoken||authtoken===undefined) {
        return {user:null}
    }

    try {
        const authorisedUser=jwt.verify(authtoken,ACCESS_TOKEN_VIEW);
        return{user:usernameToUserID(authorisedUser['username'])}
    }
    catch (err) {
        return {error:err}
    }
}

async function verifyEditToken(req){
    req.accessType="edit";
    const authHeader=req.headers['authorization'];
    const authtoken=authHeader && authHeader.split(' ')[1];
    
    if (!authtoken||authtoken===undefined) {
        return {error:"no token"}
    }
    
    let mongoClient = req.mongoClient;
    try {
    //connect to user collection in db
        let tokenCollection = mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.sessionTokens);

    //if user is not existing or password does not match the user return 401
        let existing = await tokenCollection.findOne({_id:authtoken});
        if (existing===null){
            return {error:"no user"}
        }

    //if user is existing 
        return {user:usernameToUserID(existing['username'])}
    }
    catch (err){
        return {error:err}
    }
}


function authentificateViewPublic(req,res,next){
    const{user,error}=verifyViewToken(req);
    if (error) return res.status(403).send({message:"expired or invalid authorisation token"});
    else {
        req.user=user;
        next();
    }
}

function authentificateViewPrivate(req,res,next){
   
    const{user,error}=verifyViewToken(req);
    // console.log({user,error});
    // const error=null,user="null"
    if (error) return res.status(403).send({message:"expired or invalid authorisation token"});
    if (user===null) return res.status(401).send({message:"please authorise with non-empty bearer token to access this function"});
    else {
        req.user=user;
        next();
    }

}

async function authentificateEdit(req,res,next){
    const {user,error}= await verifyEditToken(req);

    // if (error==="no token") return res.status(401).send({message:"please authorise with non-empty bearer token to access this function"});
    // if (error==="no user") return res.status(401).send({message:"user is not found in database"});
    if (error==="no token" || error==="no user") return res.status(401).send({message:"please authorise with valid bearer token to access this function"});
    if (error) return res.status(500).send({message:error});
    else {
        req.user=user;
        next();
    }
}

function authentificateAdmin(req,res,next){
    req.accessType="admin";
    return res.status(404).send({message:"admin functions are not implemented yet"})
}

module.exports={authentificateViewPublic,authentificateViewPrivate,authentificateEdit,authentificateAdmin}