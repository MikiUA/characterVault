const { docs, router, handlePaths } = require('./createRDT');
const swaggerUi = require("swagger-ui-express");
const { characterPaths, collectionPaths, userPaths } = require('./routes/galleryPath');

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