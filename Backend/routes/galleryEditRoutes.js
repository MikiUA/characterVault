const { authentificateEdit } = require('../middleware/authentificateUser');
const { newCharacter, replaceCharacter } = require('../controllers/galleryEditChar');

const { createRouter, routeHandler } = require('./createRouter');

const newCharHandler=new routeHandler({
    handledErrors:[400],
    function:newCharacter,
    response:{
        status:201,
        message:'Character created',
        fields:['newCharacter']
    }
});
const editCharHandler = new routeHandler({
    handledErrors:[400],
    function:replaceCharacter,
    response:{
        status:201,
        message:'Success',
        fields:['newCharacter']
    }
})
const notImplementedHandler={
    function:async (req)=>{throw {status:501,message:'Feature under development'}}
};

const routes={
    post:{
        '/character':newCharHandler,
        '/character/new':newCharHandler, //placeholder
        '/collection':notImplementedHandler,
        '/collection/new':notImplementedHandler,
        '/assignToCollection':notImplementedHandler,
        '/unassignFromCollection':notImplementedHandler,
    },
    patch:{
        '/character/:charID':editCharHandler,
        '/collection/:collectionID':notImplementedHandler,
    },
    delete:{
        '/character/:charID':notImplementedHandler,
        '/collection/:collectionID':notImplementedHandler,        
    }
}

const router=createRouter(routes,authentificateEdit);

module.exports = router