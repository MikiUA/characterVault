const express = require('express');
const router = express.Router();

const authRouter = require('./routes/authRoutes');
const galleryEditRouter = require('./routes/galleryEditRoutes');
const galleryViewRouter = require('./routes/galleryViewRoutes');
const userRouter = require('./routes/userRoutes');

router.use('/gallery',galleryViewRouter);
router.use('/gallery',galleryEditRouter);
router.use('/auth',authRouter);
router.use('/user',userRouter);

module.exports=router