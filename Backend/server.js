const express = require('express');
const app = express();
require("dotenv").config({ path: './env/.env' });

const { logger, initiateLog } = require('./middleware/logger');
const cors = require('./middleware/cors');
const router = require('./view/router');
const useDB = require('./middleware/useDB');

app.use(logger);
app.use([express.json(), cors, router]);
// if (process.env.DEVMODE.toUpperCase() !== "TEST") {
   
    app.listen(process.env.PORT, initiateLog)
// }

module.exports = app