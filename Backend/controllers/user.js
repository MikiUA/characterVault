const dbParams = require("../env/dbParams");
const { MongoFindOne, MongoDeleteMany, MongoPatchOne } = require("../model/databaseConnection");
const { HttpError } = require("../entities/ERROR");
const USER = require("../entities/USER");
const { MongoDeleteOne } = require("../model/databaseConnection");
const { signout } = require("./auth");

async function getUserByID(req, userID) {
    const dbuser = await MongoFindOne({
        collectionName: dbParams.collectionNames.users,
        filter: { _id: userID },
        mongoClient: req.mongoClient
    });
    if (!item) throw new HttpError(404);
    const user = USER.getReturnable(new USER(dbuser));
    return { user };//TODO: prepare user data (not send password and else)
}
async function patchUser(req, userID) {
    const newUser = new USER(req.body);
    newUser._id = userID;
    return await MongoPatchOne({
        mongoClient: req.mongoClient,
        collectionName: dbParams.collectionNames.users,
        filter: { _id: userID },
        item: newUser
    })
}
async function deleteUser(req) {
    try {
        //delete all editToken entries
        await signout(req, true);
        //delete all user's characters
        await MongoDeleteMany({
            mongoClient: req.mongoClient,
            collectionName: dbParams.collectionNames.characters,
            filter: { host: req.user }
        })
        //delete all user's collections
        await MongoDeleteMany({
            mongoClient: req.mongoClient,
            collectionName: dbParams.collectionNames.workflows,
            filter: { host: req.user }
        })
        //delete user
        await MongoDeleteOne({
            mongoClient: req.mongoClient,
            collectionName: dbParams.collectionNames.users,
            filter: { _id: req.user }
        })
        return {}//204
    }
    catch (err) {
        console.log(err.name + " : " + err.message);
        if (!err.name == "MongoExpiredSessionError") console.log(err.stack);

        throw new HttpError(501)
    }
}

module.exports = { getUserByID, patchUser, deleteUser }