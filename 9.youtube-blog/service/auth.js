const jwt=require("jsonwebtoken");
const secretKey="applenehtwehhtbasae21@"


function setUser(user){
   const token= jwt.sign({
    _id:user._id, fullName:user.fullName,
    email:user.email,role:user.role
                                    },secretKey)
return token;

}

function getUser(token){
        if(!token) return null;
        return jwt.verify(token,secretKey);

}

module.exports={setUser,getUser}