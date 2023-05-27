function queryToCharFilters(req,res,next){
    
    console.log('query:',req.query);
    let {page=1,items_per_page=10,sortBy,sortDirection,...rest} =req.query
 
    page=parseInt(page); items_per_page=parseInt(items_per_page);
    if (items_per_page<0||items_per_page>50) items_per_page=10;

    sortBy="_id";
    sortDirection=1;

    req.filter={},//rest?
    req.sort={_id:1}//{[sortBy]:sortDirection},
    req.paginationFilter={
        limit:items_per_page,
        skip:items_per_page*(page-1)
    };
    next();
}
exports.queryToCharFilters=queryToCharFilters