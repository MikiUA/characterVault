
const { authoriseViewPrivate, authoriseAdmin, authoriseViewPublic, authoriseEdit } = require('../../middleware/authorise');
const { TODOctrl, TODOpath } = require('./TODO');

const [getChars, getColls, getCollectionChars, get1Coll, get1Char] = [TODOctrl, TODOctrl, TODOctrl, TODOctrl, TODOctrl]// require('../../controllers/galleryView');
const { newChar, patchChar, delChar } = require('../../controllers/gallery/updChars');
const [newColl, patchColl, delColl, assign, unassign] = [TODOctrl, TODOctrl, TODOctrl, TODOctrl, TODOctrl]//require('../../controllers/galleryEditColl');
const { getUserByID, patchUser, deleteUser } = require('../../controllers/user');
const { ObjectId } = require('mongodb');
const swaggerOptions = require('./swaggerOptions');

//#region helpers
const getItems = (controller, middleware, summary) => {
    const obj = {
        get: {
            controller,
            summary: summary || "Get item list",
            "responses": {
                "200": {
                    "description": "Characters fetched",
                    "content": {
                        "totalItems": {
                            "type": "string"
                        },
                        "items": {
                            "type": "array",
                            "items": {
                                // "type": "object",  // Adjust the type based on the structure of your array items
                                // "properties": {
                                "$ref": "#/components/schemas/User"
                                // }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Items not found"
                }
            }
        }
    }
    if (middleware) {
        obj.get.middleware = middleware,
            obj.get.security = [{
                "viewAuth": []
            }];
    }
    return obj;
}

const successItem = {
    description: "success",
    "content": {
        "item": {
            "type": "object"
        }
    }
}
const reqBodyCh = swaggerOptions.components.schemas['Character (request)'],
    reqBodyCol = swaggerOptions.components.schemas['Collection (request)'],
    reqBodyUsr = swaggerOptions.components.schemas['User, private (Responce)'],
    middleware = authoriseEdit,
    security = [{
        "editAuth": []
    }];
const errDescrs = {
    "400": { "description": "Request body invalid" },
    "404": { "description": "Items with provided identifier were not found in database" },
    "401": { "description": "Recieved authentification invalid" },
    "403": { "description": "User is not allowed to do this operation" }
}
const ers = (...arr) => {
    let obj = {}
    for (errNum of arr) obj[errNum] = errDescrs[errNum]
    return obj
}
//#endregion

const collectionPaths = {
    '/collections': {
        post: {
            controller: newColl,
            middleware, security,
            requestBody: reqBodyCol,
            responses: {
                "201": successItem,
                ...ers(400, 401)
            }
        }
    },
    '/collections/{collectionID}': {
        get: {
            controller: (req) => get1Coll(req, { _id: ObjectId(req.params.charID) }),
            middleware: authoriseViewPublic,
            "summary": "Get item",
            "responses": {
                "200": successItem,
                ...ers(404, 403)
            }
        },
        put: {
            controller: patchColl,
            middleware, security,
            requestBody: reqBodyCol,
            responses: {
                "201": successItem,
                ...ers(400, 404, 401, 403)
            }
        },
        // patch: {},
        delete: {
            controller: delColl,
            middleware, security,
            responses: {
                "200": { "description": "deletion success" },
                ...ers(404, 401, 403)
            }
        }
    },
    '/collections/my': getItems((req) => { return getColls(req, { "host": req.user }) }),
    '/collections/user/{userID}': getItems((req) => getColls(req, { 'host': usernameToUserID(req.params.userID), view_access: 'public' })),
    '/collections/all': getItems(getColls, authoriseAdmin),
    '/assign': { "post": TODOpath },
    '/unassign': { "post": TODOpath },
}
const characterPaths = {
    '/': getItems((req) => { return getChars(req, { 'view_access': 'public' }) }),
    '/characters': {
        get: { "$ref": '#/paths/~1//get' },
        post: {
            controller: newChar,
            middleware, security,
            requestBody: reqBodyCh,
            responses: {
                "201": successItem,
                ...ers(400, 401)
            }
        }
    },
    '/characters/{charID}': {
        get: {
            controller: (req) => get1Char(req, { _id: ObjectId(req.params.charID) }),
            middleware: authoriseViewPublic,
            "summary": "Get item",
            "responses": {
                "200": successItem,
                ...ers(404, 403)
            }
        },
        put: {
            controller: patchChar,
            middleware, security,
            requestBody: reqBodyCh,
            responses: {
                "201": successItem,
                ...ers(400, 404, 401, 403)
            }
        },
        // patch: {},
        delete: {
            controller: delChar,
            middleware, security,
            responses: {
                "200": { "description": "deletion success" },
                ...ers(404, 401, 403)
            }
        }
    },
    '/characters/my': getItems((req) => { return getChars(req, { "host": req.user }) }, authoriseViewPrivate),
    '/characters/user/{userID}': getItems((req) => getChars(req, { "host": req.params.userID, view_access: 'public' })),
    '/characters/collection/{collectionID}': getItems((req) => getCollectionChars(req, req.params.collectionID), authoriseViewPublic),
    '/characters/all': getItems(getChars, authoriseAdmin),

}

const userPaths = {
    '/': {
        //get : ref to auth/requestCheckUser
        patch: {
            controller: patchUser,
            middleware, security,
            requestBody: reqBodyUsr,
            responses: {
                "201": successItem,
                ...ers(400, 401, 403, 404)
            }
        },
        delete: {
            controller: deleteUser,
            middleware, security,
            responses: {
                "204": { "description": "Deletion success, returns nothing" },
                ...ers(401, 403, 404)
            }
        }
    },
    '/{userid}': {
        get: {
            controller: getUserByID,
            middleware: authoriseViewPublic,
            "summary": "Get a user with open profile",
            "responses": {
                "200": successItem,
                ...ers(403, 404)
            }
        },
    },
    '/all': {
        get: {
            controller: TODOctrl,
            middleware: authoriseAdmin,
            "summary": "Get all users",
            "responses": {
                "200": successItem,
                ...ers(403, 404)
            }
        },
    }
}
module.exports = { characterPaths, collectionPaths, userPaths };