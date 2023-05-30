const { MongoCreateOne, MongoInsertOne} =require("./dbFunctions/Create");
const { MongoFindMany, MongoFindOne } = require("./dbFunctions/Read");
const { MongoReplaceOne, MongoUpdateOne } = require("./dbFunctions/Update");
const { MongoDeleteOne, MongoRemoveOne} =require("./dbFunctions/Delete");


module.exports={
    MongoCreateOne,MongoInsertOne,
    MongoFindOne,                   MongoFindMany,
    MongoReplaceOne,MongoUpdateOne,
    MongoDeleteOne,MongoRemoveOne
}