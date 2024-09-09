const MongoCreateOne = require("./dbFunctions/Create");
const { MongoFindMany, MongoFindOne } = require("./dbFunctions/Read");
const { MongoReplaceOne, MongoUpdateOne, MongoPatchOne } = require("./dbFunctions/Update");
const { MongoDeleteOne, MongoRemoveOne, MongoDeleteMany, MongoRemoveMany } = require("./dbFunctions/Delete");


module.exports = {
    MongoCreateOne,
    MongoFindOne, MongoFindMany,
    MongoReplaceOne, MongoUpdateOne, MongoPatchOne,
    MongoDeleteOne, MongoRemoveOne, MongoDeleteMany, MongoRemoveMany
}