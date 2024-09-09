const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_VIEW, ACCESS_TOKEN_VIEW_EXPIERY_TIMER, ACCESS_TOKEN_EDIT } = process.env
const dbParams = require("../env/dbParams");
const { MongoCreateOne, MongoFindOne } = require("./databaseConnection");

function createViewToken({ userid, device = 'no device specified' }) {
    const viewToken = jwt.sign({ userid, device }, ACCESS_TOKEN_VIEW, { expiresIn: ACCESS_TOKEN_VIEW_EXPIERY_TIMER });
    return viewToken
}

async function createEditToken({ userid, device = 'no device specified' }, mongoClient) {
    const editToken = jwt.sign({ userid, device }, ACCESS_TOKEN_EDIT).split('.')[2] + Math.floor((Math.random() * 100));
    await MongoCreateOne({
        mongoClient: mongoClient,
        collectionName: dbParams.collectionNames.sessionTokens,
        item: {
            _id: editToken,
            userid, device
        }
    })
    return editToken
}

async function createViewEditTokens({ userid, device }, mongoClient) {
    const viewToken = await createViewToken({ userid, device });
    const editToken = await createEditToken({ userid, device }, mongoClient);
    return { viewToken, editToken }
}

async function verifyViewToken(token) {
    try {
        const user = jwt.verify(token, ACCESS_TOKEN_VIEW);
        return user['userid'] || null
    }
    catch {
        return null
    }
}

async function verifyEditToken(token, mongoClient) {
    try {
        const userToken = await MongoFindOne({
            mongoClient,
            filter: { _id: token },
            collectionName: dbParams.collectionNames.sessionTokens
        })
        return userToken['userid'] || null;
    }
    catch {
        return null
    }
}

module.exports = {
    createViewToken, createEditToken, createViewEditTokens,
    verifyViewToken, verifyEditToken
}