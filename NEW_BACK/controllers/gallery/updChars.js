const CHARACTER = require("../../entities/CHARACTER");
const { HttpError } = require("../../entities/ERROR");
const dbParams = require("../../env/dbParams");
const usernameToUserID = require("../../helpers/usernameToUserID");
const { MongoCreateOne } = require("../../model/databaseConnection");

async function newChar(req) {
    const newChar = new CHARACTER({ ...req.body, host: usernameToUserID(req.user) });
    return await MongoCreateOne({
        mongoClient: req.mongoClient,
        collectionName: dbParams.collectionNames.characters,
        item: newChar
    })
}

async function patchChar() {
    throw new HttpError(501);
}

async function delChar() {
    throw new HttpError(501);
}

module.exports = { newChar, patchChar, delChar }