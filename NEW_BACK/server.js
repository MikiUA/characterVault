const express = require('express');
const app = express();
require("dotenv").config({ path: './env/.env' });

const { logger, initiateLog } = require('./middleware/logger');
const cors = require('./middleware/cors');
const router = require('./view/router');
const useDB = require('./middleware/useDB');

app.use([express.json(), cors, useDB, router]);
if (process.env.DEVMODE !== "TEST") {
    app.use(logger);
    app.listen(process.env.PORT, initiateLog)
}

module.exports = app