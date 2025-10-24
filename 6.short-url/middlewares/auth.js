 const {getUserMap}=require("../service/auth")

function restrictToLoggedInUserOnly(req,res,next){
        //cookie
        // const userId=req.cookies.uid;

        //header
        const userId=req.headers["authorizatione"]

        if(!userId) return res.redirect("/login")
          // const User= getUserMap(userId)

        const token=userId.split("bearer ")[1];
          const User= getUserMap(token)
      
        if(!User) return res.redirect("/login");
        req.user=User;
        next();
}
 function checkAuth(req,res,next){
 //coo\kie
        // const userId=req.cookies.uid;
        //   const User= getUserMap(userId)
           //header
        const userId=req.headers["authorizatione"]
        const token=userId.split("bearer ")[1];
          const User= getUserMap(token)
        req.user=User;
        next();
}

module.exports={restrictToLoggedInUserOnly,checkAuth}