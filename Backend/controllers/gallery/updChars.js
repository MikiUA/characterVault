const CHARACTER = require("../../entities/CHARACTER");
const { ValidationError } = require("../../entities/ERROR");
const dbParams = require("../../env/dbParams");
const usernameToUserID = require("../../helpers/usernameToUserID");
const { MongoCreateOne, MongoPatchOne, MongoDeleteOne } = require("../../model/databaseConnection");

async function newChar(req) {
    const shname = req.body.shname, host = usernameToUserID(req.user);
    if (typeof (!shname) !== 'string') throw new ValidationError('Please input shname to create a character');
    const newChar = new CHARACTER({ ...req.body, host: host });
    return await MongoCreateOne({
        mongoClient: req.mongoClient,
        collectionName: dbParams.collectionNames.characters,
        item: newChar
    })
}

async function patchChar(req) {
    const updatedChar = new CHARACTER(req.body)
    return await MongoPatchOne({
        mongoClient: req.mongoClient,
        collectionName: dbParams.collectionNames.characters,
        filter: { _id: req.body._id },
        item: updatedChar
    })
}

async function delChar(req, charID) {
    return await MongoDeleteOne({
        mongoClient: req.mongoClient,
        collectionName: dbParams.collectionNames.characters,
        filter: { _id: charID }
    })
}

module.exports = { newChar, patchChar, delChar }