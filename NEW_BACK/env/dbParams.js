const dbParams = {
    URI: process.env.DB_URI || 'mongodb://localhost:27017/',
    DBname: process.env.DEVMODE ? 'chartest' : 'chargen',
    collectionNames: {
        users: 'user-list',
        workflows: 'collection-list',
        characters: 'character-list',
        sessionTokens: 'session-tokens'
    }
};
module.exports = dbParams