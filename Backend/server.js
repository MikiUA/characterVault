const express= require('express');
const app= express();
const PORT=8081;

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const useDB = require('./middleware/useDB');

const authRouter = require('./routes/authRoutes');
const galleryEditRouter = require('./routes/galleryEditRoutes');
const galleryViewRouter = require('./routes/galleryViewRoutes');
const userRouter = require('./routes/userRoutes');


app.use(express.json());
app.use(logger);
app.use(cors);
app.use(useDB);


app.use('/gallery',galleryViewRouter);
app.use('/gallery',galleryEditRouter);
app.use('/auth',authRouter);
app.use('/user',userRouter);


app.get('/',(req,res)=>{
    res.status(200).send({message:"Here is supposed to be the documentation file"})
}) 


app.listen(PORT, async () => {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {for (const net of nets[name]) {
        if (net.address.includes('192')) console.log (`app running on http://${net.address}:${PORT}`);
}}
    // console.log(`app running on port: ${PORT}; `);
})