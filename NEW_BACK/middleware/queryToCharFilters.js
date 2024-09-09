function queryToCharFilters(req, res, next) {
    req.filters = req.query
    next();
}

module.exports = queryToCharFilters