const {getUserMap}=require("../service/auth")

function checkForAuthentication(req,res,next){
    const token=req.cookies.uid;
    req.user=null;
    const verifiedToken= getUserMap(token);
    req.user=verifiedToken;
    next();

}


function restrictTo(roles =[]){
    return function (req,res,next) {
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("no authorization")
            next();
    }
}

module.exports={checkForAuthentication,restrictTo}