// const sessionIdToUserMap= new Map();

const jwt=require("jsonwebtoken")

function setUserMap(User){
                 //statefull
              //   sessionIdToUserMap.set(id,user);

              // stateless
              // console.log(User,"s")
       const payload={
              id:User._id,
              email:User.email,
              role:User.role,
       }
             return  jwt.sign(payload,"secret-code12")

}
function getUserMap(token) {
       // return sessionIdToUserMap.get(id);
       //  return  console.log({token,jer:"er"})
       if(!token) return null;
       return jwt.verify(token,"secret-code12")
    
}

module.exports={setUserMap,getUserMap}