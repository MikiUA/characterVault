function cors(req, res, next){
    // res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested, Content-Type, Accept Authorization"
    // )
    next()
  }
  module.exports=cors