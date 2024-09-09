const { MongoClient } = require("mongodb");
const dbParams = require("../env/dbParams");
const { isConnected } = require("../model/dbFunctions/handlers");

function closeMongoClient(mongoClient) {
  try { mongoClient.close(); } //even if already closed should be considered as no-operation and not throw an error, but is handled just in case
  catch (err) { if (isConnected(mongoClient)) console.log(err) }
}

async function useDB(req, res, next) {
  const mongoClient = new MongoClient(dbParams.URI);
  try {
    await mongoClient.connect();
    req.mongoClient = mongoClient;
    res.on("finish", function () {
      closeMongoClient(mongoClient);
    });
    next();
  }
  catch {
    closeMongoClient(mongoClient);
    res.status(503).send({ message: "Database Unavailible. Sorrry for inconvenience" });
  }
}

module.exports = useDB