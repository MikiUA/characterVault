const { authentificateViewPublic, authentificateEdit, authentificateAdmin } = require('../middleware/authentificateUser');
const { getUserByID } = require('../controllers/user');

const { routeHandler, createRouter } = require('./createRouter');

const notImplementedHandler={
    function:async (req)=>{throw {status:501,message:'Feature under development'}}
};

const routes={
    get:{
        '/:userID':new routeHandler({
            middleware:[authentificateViewPublic],
            handledErrors:{400:"No user found"},
            function:async (req)=>{
                const {userID}=req.params;
                return getUserByID(req,userID)
            },
            response:{
                message:'User found',
                fields:['user']
            }
        }),
        '/all':notImplementedHandler
    },
    post:{// It's just register,I'll go collect register handler somewhere
        '/':notImplementedHandler,
        '/new':notImplementedHandler
    },
    patch:{
        '/:userID':notImplementedHandler
    },
    delete:{
        '/:userID':notImplementedHandler
    }
}

const router=createRouter(routes);
module.exports = router