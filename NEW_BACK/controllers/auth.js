const dbParams = require("../env/dbParams");
const { MongoFindOne, MongoCreateOne, MongoDeleteOne, MongoDeleteMany } = require('../model/databaseConnection')
const { createViewEditTokens, createViewToken } = require('../model/authTokenHandler');
const USER = require("../entities/USER");
const { ValidationError, HttpError } = require("../entities/ERROR");
const usernameToUserID = require("../helpers/usernameToUserID");
const encrypt = require("../helpers/encrypt");
const validateBody = require("../middleware/validateBody");



const login = async (req = new Request) => {
    const valid = validateBody(
        { "username": { type: "string" }, "password": { type: "string" } }
    )(req)
    if (valid instanceof Error) throw valid;//in case the documentation guy fcked up
    const username = req.body.username,
        password = encrypt(req.body.password);

    const userid = usernameToUserID(username);
    //find user in db
    const user = await MongoFindOne({
        collectionName: dbParams.collectionNames.users,
        filter: { _id: userid, password },
        mongoClient: req.mongoClient
    })
    //if user is not existing or password does not match the user return 401
    if (!user) throw new HttpError(404);//not found

    //if user is existing create and return view and edit tokens
    const device = req.get('User-Agent');
    let { viewToken, editToken } = await createViewEditTokens({ userid, device }, req.mongoClient);
    return { viewToken, editToken, user: USER.getReturnable(new USER(user), true) };
}

const signup = async (req) => {
    //TODO: check username to not be one of the reserved words, and if so return 400
    const valid = validateBody(
        { "username": { type: "string" }, "password": { type: "string" }, "email": { type: "string" } }
    )(req)
    if (valid instanceof Error) throw valid;//in case the documentation guy fcked up

    const { username, email } = req.body,
        password = encrypt(req.body.password);
    const _id = usernameToUserID(username);

    const existingUser = await MongoFindOne({
        collectionName: dbParams.collectionNames.users,
        filter: { "$or": [{ _id }, { email }] },
        mongoClient: req.mongoClient
    })
    if (existingUser) throw new HttpError(403)//username or email taken
    //TODO: check email taken
    //TODO: check if email valid?

    //push user in database
    const newUser = new USER({ username, password, email });

    await MongoCreateOne({
        mongoClient: req.mongoClient,
        collectionName: dbParams.collectionNames.users,
        item: newUser
    })
    //create and return view and edit tokens
    const device = req.get('User-Agent');
    let { viewToken, editToken } = await createViewEditTokens({ userid: newUser._id, device }, req.mongoClient);
    return {
        viewToken, editToken,
        user: USER.getReturnable(newUser, true)
    };
}

const requestCheckUser = async (req) => {
    const user = await MongoFindOne({
        collectionName: dbParams.collectionNames.users,
        mongoClient: req.mongoClient,
        filter: { _id: req.user }
    })
    if (!user) throw new HttpError(401);

    const returnedUser = USER.getReturnable(new USER(user), true);
    const viewToken = createViewToken({ userid: user._id })
    return {
        viewToken: viewToken,
        user: returnedUser
    };
}

const signout = async (req, isFromAll = false) => {
    //  to signout from current device i need to remove the edit token that is being sent {_id: authtoken}
    //  to signout from /:device i need to remove the device token  {device: device}
    const { device } = req.query;
    if (!isFromAll) {
        const authHeader = req.headers['authorization'];
        const authtoken = authHeader && authHeader.split(' ')[1];
        const filter = device ? { device: device } : { _id: authtoken };
        const result = await MongoDeleteOne({
            mongoClient: req.mongoClient,
            collectionName: dbParams.collectionNames.sessionTokens,
            filter: filter
        });
        if (!result) throw new HttpError(404);
        return {}//'success';
    }
    else {
        await MongoDeleteMany({
            mongoClient: req.mongoClient,
            collectionName: dbParams.collectionNames.sessionTokens,
            filter: { userid: req.user }
        });
        return {}
    }
}

module.exports = { login, signup, signout, requestCheckUser }