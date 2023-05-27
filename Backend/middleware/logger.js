let count=0;

function logStart(req){

}
function logEnd(){

}

async function logger(req,res,next){
    count++;
    const starttime=Date.now();

    console.log(`${count}) ${req.method} ${req.path} `);
    res.on("finish", function() {    
        console.log(`${count}) ${req.method} ${req.path} (${req.accessType}: ${req.user}): ${res.statusCode} ${res.statusMessage} ${Date.now()-starttime} ms`);
        // console.log(req.method, decodeURI(req.url), );
      });
    next();

}

module.exports=logger