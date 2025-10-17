const fs=require("fs");

function logs(req,res,next){
  fs.appendFile("./log.txt",`\n${Date.now()}: ${req.method}-${req.path}`,()=>{});
    next();
}

module.exports={logs}
