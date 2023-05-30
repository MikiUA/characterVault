
const { authentificateEdit } = require('../../middleware/authentificateUser');
const { login, signup,signout, requestCheckUser } = require('../../controllers/auth');
const {routeHandler, createRouter} = require('../createRouter');

const loginHandler=new routeHandler({
    function:login,
    handledErrors:{
        400:"Please provide valid 'username' and 'password'",
        401:"User not found"
    },
    response:{
        message:'Login success',
        fields:['viewToken','editToken']
    }
});

const registerHandler=new routeHandler({
    function:signup,
    handledErrors:{
        400:"Please provide valid 'username', 'password' and 'email'",
        403:"Username taken"
    },
    response:{
        status:201,
        message:'New user created',
        fields:['viewToken','editToken']
    }
})

const signoutHandler=(fromAllDevices=false)=>new routeHandler({
    middleware:[authentificateEdit],
    function:async (req)=>{
        return await signout(req,!fromAllDevices)
    }
})

const checkUserHandler=new routeHandler({
    middleware:[authentificateEdit],
    function:requestCheckUser,
    handledErrors:{401:"User not found"},
    response:{
        message:'Check complete, created new viewToken',
        fields:['viewToken','user']
    }
})

const routes={
    post:{
        '/login':loginHandler,
        '/signin':loginHandler,
        '/signup':registerHandler,
        '/register':registerHandler,
    },
    get:{
        '/requestCheckUser':checkUserHandler,
        '/signout':signoutHandler(),
        '/logout':signoutHandler(),
        '/signoutFromAll':signoutHandler(true),
        '/logoutFromAll':signoutHandler(true),
    }
}

const router=createRouter(routes)
module.exports = router