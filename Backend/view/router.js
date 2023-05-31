const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/authRoutes');
const galleryEditRoutes = require('./routes/galleryEditRoutes');
const galleryViewRoutes = require('./routes/galleryViewRoutes');
const userRoutes = require('./routes/userRoutes');
const { createRouter } = require('./createRouter');
const { authentificateEdit } = require('../middleware/authentificateUser');

router.use(createRouter({
    routes:authRoutes,
    parentPath:'/auth'
}))
router.use(createRouter({
    routes:userRoutes,
    parentPath:'/user'
}))
router.use(createRouter({
    parentPath:'/gallery',
    routes:galleryEditRoutes,
    additionalMiddleware:authentificateEdit
}))
router.use(createRouter({
    parentPath:'/gallery',
    routes:galleryViewRoutes
}))

// const routes={
//     '/gallery':{...galleryViewRoutes,...galleryEditRoutes},
//     '/auth':authRoutes,
//     '/user':userRoutes
// }
// router.use(createRouter(routes))

// router.use('/gallery',createRouter(galleryViewRouter));
// router.use('/gallery',createRouter(galleryEditRouter,authentificateEdit));
// router.use('/auth',createRouter(authRouter));
// router.use('/user',createRouter(userRouter));

module.exports=router