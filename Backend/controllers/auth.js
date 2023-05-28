const jwt= require('jsonwebtoken');

// const {MongoClient} = require('mongodb');
const { ACCESS_TOKEN_VIEW,ACCESS_TOKEN_VIEW_EXPIERY_TIMER,ACCESS_TOKEN_EDIT } = require('../environmentVariables/accessTokens');
const { usernameToUserID } = require('../exportable_functions/minor_functions');
const dbParams = require('../environmentVariables/dbParams');


async function createViewEditTokens(username,mongoClient){//client that is already connected
  let tokenCollection = await mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.sessionTokens);
  try{
    const viewToken=jwt.sign({username:username},ACCESS_TOKEN_VIEW, {expiresIn:ACCESS_TOKEN_VIEW_EXPIERY_TIMER});
    const editToken=jwt.sign({username:username},ACCESS_TOKEN_EDIT).split('.')[2];//some sort of unique identifier
    await tokenCollection.insertOne({
      _id:editToken,
      username:username
    })//push edittoken in database
    return {viewToken:viewToken,editToken:editToken};
  }
  catch(err) {throw err}; 
}

exports.login= async (req)=>{
  const fullUsername=req.body.username,password=req.body.password;
  if(!fullUsername || !password || typeof(fullUsername)!=='string') throw (400)//bad request
 
  const username=usernameToUserID(fullUsername);
  // username=username.toLowerCase();

  let mongoClient = req.mongoClient;//new MongoClient(dbParams.URI);

  try {
  //connect to user collection in db
    // await mongoClient.connect()
    let userCollection = mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.users);

  //if user is not existing or password does not match the user return 401
    let existing = await userCollection.findOne({_id:username,password:password});
    if (existing===null) {throw (401)}

  //if user is existing create and return view and edit tokens
    let {viewToken,editToken}=await createViewEditTokens(username, mongoClient);
    return {viewToken,editToken};
  }
  catch (err){
    throw err
  }
}
  
exports.signup= async (req)=>{
    const fullUsername=req.body.username,password=req.body.password,email=req.body.email;
    if(!fullUsername || !password || !email|| typeof(fullUsername)!=='string'|| typeof(email)!=='string') throw 400//bad request
    const username=usernameToUserID(fullUsername);
  //TODO: check username to not be one of the reserved words, and if so return 400 or 403

    let mongoClient = req.mongoClient;//new MongoClient(dbParams.URI);

    try {
    //connect to user collection in db
      // await mongoClient.connect();
    // console.log("connected");
      let userCollection = mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.users);

    //if username is taken 403
      let existing = await userCollection.findOne({_id:username});
      if (existing!==null){throw 403}  
          
    //TODO: if not taken check email and stuff

    //push user in database
      await userCollection.insertOne({
        _id:username,
        username:fullUsername,
        password:password,
        email:email,
        verified:false,
        date_created:Date.now()
      })

    //create and return view and edit tokens
    let {viewToken,editToken}=await createViewEditTokens(username, mongoClient);
    return {viewToken,editToken};
    }
    catch(err) {throw err}
}

exports.requestCheckUser= async (req)=>{
  try{
    // const mongoClient = req.mongoClient;
    let userCollection = req.mongoClient.db(dbParams.DBname).collection(dbParams.collectionNames.users);
    //find the user whose token we already checked
    let user_data = await userCollection.findOne({_id:req.user});
    if (!user_data) throw 401
    let returnedUser={
      userid:user_data._id,
      username:user_data.username,
      email:user_data.email,
      profile_picture:user_data.profile_picture||null,
      availible_collections:user_data.availible_collections||[]
    }
    if (user_data.isAdmin) returnedUser.isAdmin=true;

    // console.log(user_data);
    const viewToken=jwt.sign({username:req.user},ACCESS_TOKEN_VIEW, {expiresIn:ACCESS_TOKEN_VIEW_EXPIERY_TIMER});
    return{
      viewToken:viewToken,
      user:returnedUser
    };
  }
  catch (err){
    throw err
  }
}

exports.signout=async (request,isSingleToken)=>{
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