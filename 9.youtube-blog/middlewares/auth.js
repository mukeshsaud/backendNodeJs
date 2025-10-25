const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
    // if(!req.cookies) return res.redirect("/login'");'
    const token=req.cookies.token;
   const user=getUser(token);
   req.user=user;
   next();
}

function restrictTO(roles=[]){
    return function ( req,res,next){
            if(!req.user) return res.redirect("/login");
            if(!roles.includes(req.user.role)) return res.end("unauthorized");
            next();
    }
}
module.exports={checkForAuthentication,restrictTO}