const { MongoClient } = require("mongodb");
// const { closeMongoClient } = require("../exportable_functions/databaseConnection");
const dbParams = require("../environmentVariables/dbParams")

function closeMongoClient(mongoClient){
  if (!mongoClient.s.hasBeenClosed) { mongoClient.close();  }
}
function isConnected(client) {
  return !!client && !!client.topology && client.topology.isConnected()
}
function logC(mongoClient){
  console.log(isConnected(mongoClient))
}
async function useDB(req,res,next){
    
    const mongoClient = new MongoClient(dbParams.URI);
    try {
      // console.error("NOT connected");
      // logC(mongoClient);

        await mongoClient.connect();    
        
      // console.error("connected");
      // logC(mongoClient);



        req.mongoClient=mongoClient;
        res.on("finish", function() {    
            closeMongoClient(mongoClient);
          });
        next();
    }
    catch {
        try {closeMongoClient(mongoClient);}
        catch {}
        res.status(503).send({message:"database unavailible"});
    }
}

module.exports=useDB