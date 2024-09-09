const dbParams = require("../env/dbParams");
const { MongoFindOne } = require("../model/databaseConnection");
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
async function patchUser(req) {
    throw new HttpError(501)
}
async function deleteUser(req) {
    try {
        await signout(req, true);
        await MongoDeleteOne({
            mongoClient: req.mongoClient,
            collectionName: dbParams.collectionNames.users,
            filter: { _id: req.user }
        })
        return {}
    }
    catch (err) {
        console.log(err.name + " : " + err.message);
        if (!err.name == "MongoExpiredSessionError") console.log(err.stack);

        throw new HttpError(501)
    }
}

module.exports = { getUserByID, patchUser, deleteUser }