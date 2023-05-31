const { usernameToUserID } = require('../exportable_functions/usernameToUserID');
const dbParams = require('../environmentVariables/dbParams');
const { MongoFindOne, MongoCreateOne, MongoDeleteOne }=require('../model/databaseConnection')
const { createViewEditTokens, createViewToken } = require('../model/authTokenHandler');
const { MongoDeleteMany } = require('../model/dbFunctions/Delete');
const {user:userClass}=require('../schemas/userClass');

function encryptPassword(password){
  if (typeof(password)!=='string') throw 500;
  return `encrypted ${password} lol`
}

const login = async (req=new Request)=>{
  const username=req.body.username,
      password=req.body.password;
  if(!username || !password || typeof(username)!=='string') throw (400)//bad request
 
  const userid=usernameToUserID(username);
  try {
  //find user in db
    const user= await MongoFindOne({
      collectionName:dbParams.collectionNames.users,
      filter:{_id:userid,password:encryptPassword(password)},
      mongoClient:req.mongoClient
    })
  //if user is not existing or password does not match the user return 401
    if (!user) throw 404;//not found

  //if user is existing create and return view and edit tokens
  
    const device=req.get('User-Agent');
    let {viewToken,editToken}=await createViewEditTokens({userid,device},req.mongoClient);
    return {viewToken,editToken};
  }
  catch (err){
    throw err
  }
}
  
const signup = async (req)=>{
//TODO: check username to not be one of the reserved words, and if so return 400
  const username=req.body.username,
    password=req.body.password,
    email=req.body.email;
  if(!username || !password ||!email|| typeof(username)!=='string'|| typeof(email)!=='string') throw (400)//bad request
  const userid=usernameToUserID(username);

  try {
    const user= await MongoFindOne({
      collectionName:dbParams.collectionNames.users,
      filter:{_id:userid},
      mongoClient:req.mongoClient
    })
    if (user) throw 403//username taken
      
  //TODO: check email taken
  //TODO: check if email valid?

  //push user in database
    await MongoCreateOne({
      mongoClient:req.mongoClient,
      collectionName:dbParams.collectionNames.users,
      item:{
        _id:userid,
        username:username,
        password:encryptPassword(password),
        email:email,
        verified:false,
        date_created:Date.now()
      }
    })

  //create and return view and edit tokens
    const device=req.get('User-Agent');
    let {viewToken,editToken}=await createViewEditTokens({userid,device}, req.mongoClient);
    return {viewToken,editToken};
  }
    catch (err) { throw err; }
}

const requestCheckUser = async (req)=>{
  try{
    const user=await MongoFindOne({
      collectionName:dbParams.collectionNames.users,
      mongoClient:req.mongoClient,
      filter:{_id:req.user}
    })

    if (!user) throw 401;

    const returnedUser=userClass.getReturnable(new userClass(user),true);
    const viewToken=createViewToken({userid:user._id})
    return{
      viewToken:viewToken,
      user:returnedUser
    };
  }
  catch (err){ throw err; }
}

const signout=async (req,isSingleToken)=>{
  const {device}=req.query;
  if(isSingleToken){
    const authHeader=req.headers['authorization'];
    const authtoken=authHeader && authHeader.split(' ')[1];
    const filter=device?{device:device}:{_id:authtoken};
    const result= await MongoDeleteOne({
      mongoClient:req.mongoClient,
      collectionName:dbParams.collectionNames.sessionTokens,
      filter:filter
    });
    if (!result) throw 404
    return 'success';
  }
  else {
    return await MongoDeleteMany({
      mongoClient:req.mongoClient,
      collectionName:dbParams.collectionNames.sessionTokens,
      filter:{userid:req.user}
    });
  }
    // let mongoClient = new MongoClient(dbParams.URI);
    // try {
    // let userDB = await mongoClient.connectDB(databaseName).collection(collectionNames.users);// if not works  then const = await mongoClient.connect() and then const.db(databaseName)
      
    // if(isSingleToken){
    //   userDB.deleteOne({_id:"TODO: Find where token stored"})
    // }
    // else {

    // }

    // mongoClient.close();
    // return {status:0,response:0}
    // }
    // catch(err){
    //   mongoClient.close();
    throw {message:"signout not supported"}
}

module.exports={login,signup,signout,requestCheckUser}