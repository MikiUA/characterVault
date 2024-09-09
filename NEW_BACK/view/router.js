const { docs, router, handlePaths } = require('./createRDT');
const CHARACTER = require('../entities/CHARACTER');
const swaggerUi = require("swagger-ui-express");
const { characterPaths, collectionPaths, userPaths } = require('./routes/galleryPath');

function resetTest() {
    const fs = require('fs'),
        path = require('path'),
        filePath = './devtest/test.js', // Adjust the path as needed
        dirname = path.dirname(filePath);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

    // Clear the contents of the file
    const testbase = `const request = require('supertest');
    const app = require('../server.js');
    `
    fs.writeFileSync(filePath, testbase)
}
// if (process.env.DEVMODE) resetTest();

handlePaths(require('./routes/authPaths'), '/auth', 'Authentification');
handlePaths(characterPaths, '/gallery', 'Gallery Characters');
handlePaths(collectionPaths, '/gallery', 'Gallery Collections');
handlePaths(userPaths, '/users', 'Users')

router.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(docs, { filter: true })
);
router.use(
    "/doc", (req, res) => res.send(docs)
);

module.exports = router