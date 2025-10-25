const User=require("../models/user")
const {setUser}=require("../service/auth")
async function handleUserSignup(req,res){
const body=req.body;
console.log(body);
if(!body || !body.fullName || !body.email  || !body.password ){
    return res.status(400).json({createUSer:"please provide every detail"});
}
try{
await User.create({
    fullName:body.fullName,
    email:body.email,
    password:body.password,
    profileImgUrl:body.profileImgUrl,
    role:body.role,
})
return res.redirect("/login");
}
catch(err){
    
    return res.status(500).json({createUSer:err});
}



}
async function handleUserLogin(req,res){
const body=req.body;
try{
const token= await User.matchpassword({email:body.email,password:body.password})
    res.cookie("token",token);
return res.redirect("/");
}
catch(err){
    return res.render("login",{error:"wrong email or password"});
}

}

function handleUserLogout(req,res){
    res.clearCookie("token").redirect("/login");
}

module.exports={handleUserSignup,handleUserLogin,handleUserLogout}