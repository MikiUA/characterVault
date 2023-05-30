const { getCharacters,getCollections, getCollectionCharacters, getSingleCollection, getSingleChar } = require('../../controllers/galleryView');
const { queryToCharFilters } = require('../../middleware/queryToCharFilters');
const { authentificateViewPrivate, authentificateAdmin, authentificateViewPublic } = require('../../middleware/authentificateUser');

const { ObjectId } = require('mongodb');
const {createRouter}= require('../createRouter');
const { usernameToUserID } = require('../../exportable_functions/usernameToUserID');

//routes with no 'handledErrors' or 'response' properties 
//those are added directly while concatenating with routes 
const getMultipleItemsRoutes={
    '/':{
        function:async (req)=>await getCharacters(req,{'view_access':'public'}),
        middleware:[queryToCharFilters]
    },
    '/characterList/my':{
        function:async (req)=>await getCharacters(req,{"host":req.user}),
        middleware:[authentificateViewPrivate,queryToCharFilters]
    },
    '/characterlist/:userID':{
        function:async (req)=>{
            const {userID}=req.params;
            return await getCharacters(req,{"host":userID,view_access:'public'});
        },
        middleware:[queryToCharFilters]
    },
    '/characterlist/all':{
        function:getCharacters,
        middleware:[authentificateAdmin, queryToCharFilters]
    },
    '/characterlist/collection/:collectionID':{
        function:async (req)=>{
            const {collectionID} =req.params;
            return await getCollectionCharacters(req,collectionID)
        },
        middleware:[authentificateViewPublic, queryToCharFilters]//authorise user?
    },

    '/collectionlist/my':{
        function:async (req)=>await getCollections(req,{'host':req.user}),
        middleware:[authentificateViewPrivate],
    },    
    '/collectionlist/:userID':{
        function:async (req)=>{
            const {userID}=req.params
            return await getCollections(req,{'host':usernameToUserID(userID),view_access:'public'});
        },
        middleware:[authentificateViewPublic],
    },
    '/collectionlist/all':{
        function:getCollections,
        middleware:[authentificateAdmin]
    }
}
function addDefaultHandledErrorsAndGotItemsResponce(getMultipleItemsRoutes){
    for (const item in getMultipleItemsRoutes) {
        item.response=item.response||{
            message: 'Items recieved',
            fields:['totalItems','items']
        };
        item.handledErrors=item.handledErrors||{
            404:'No Items found'
        }
    }
}

const routes={
    get:{
    ...addDefaultHandledErrorsAndGotItemsResponce(getMultipleItemsRoutes),
    '/collection/:collectionID':{
        function: async (req)=>{
            const {collectionID}=req.params;
            return await getSingleCollection(req,{_id:collectionID})
        },
        middleware:[authentificateViewPublic],
        handledErrors:{404:'Item not found'},
        response:{
            message:'Collection found',
            fields:['item']
        }
    },
    '/character/:charID':{
        function: async (req)=>{
            const {charID}=req.params;
            return await getSingleChar(req,{_id:ObjectId(charID)})
        },
        middleware:[authentificateViewPublic],
        handledErrors:{404:'Item not found'},
        response:{
            message:'Collection found',
            fields:['item']
        }
    },
}}

const router=createRouter(routes)
module.exports = router