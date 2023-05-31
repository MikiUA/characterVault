const { newCharacter, replaceCharacter, deleteCharacter } = require('../../controllers/galleryEditChar');

const { routeHandler } = require('../createRouter');

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
const deleteCharHandler = new routeHandler({
    handledErrors:{404:'No character with your identifier matched the existing database' },
    function:deleteCharacter,
    response:{
        status:200,
        message:'Deleted',
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
        '/character/:charID':deleteCharHandler,
        '/collection/:collectionID':notImplementedHandler,        
    }
}

// const router=createRouter(routes,authentificateEdit);
module.exports = routes