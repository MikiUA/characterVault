const {verifyEditToken,verifyViewToken}=require('../model/authTokenHandler');

function getToken(req){
    const authHeader=req.headers['authorization'];
    const authtoken=authHeader && authHeader.split(' ')[1];
    return authtoken
}

function authentificateViewPublic(req,res,next){
    req.accessType='view';
    const user=verifyViewToken(getToken(req));
    
    req.user=user;//if invalid token it will just be null
    next();
}

function authentificateViewPrivate(req,res,next){
    req.accessType='view';
    const token=getToken(req);
    if (!token) return res.status(401).send({message:"please authorise with non-empty bearer token to access this function"});

    const user=verifyViewToken(token);
    if (!user) return res.status(401).send({message:"expired or invalid authorisation token"});
    
    req.user=user;//if invalid token it will just be null
    next();
}

async function authentificateEdit(req,res,next){
    try {
        const token= getToken(req);
        if (!token) throw 401;
        const user=await verifyEditToken(token,req.mongoClient);
        if (!user) throw 401;

        req.user=user;
        next();
    } catch (err) {
        if (err===401) return res.status(401).send({message:"please authorise with valid bearer token to access this function"});
        return res.status(500).send({message:'Internal server error'});
    }
}

function authentificateAdmin(req,res,next){
    req.accessType="admin";
    return res.status(501).send({message:"admin functions are not implemented yet"})
}

module.exports={authentificateViewPublic,authentificateViewPrivate,authentificateEdit,authentificateAdmin}