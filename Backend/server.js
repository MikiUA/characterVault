const express = require('express');
const app = express();
require("dotenv").config({ path: './env/.env' });

const { logger, initiateLog } = require('./middleware/logger');
const cors = require('./middleware/cors');
const router = require('./view/router');

let test = 1;//(process.env.DEVMODE.toUpperCase() == "TEST")
if (test==0) app.use(logger);

app.use([express.json(), cors, router]);

if (test==0) app.listen(process.env.PORT, initiateLog)


module.exports = app