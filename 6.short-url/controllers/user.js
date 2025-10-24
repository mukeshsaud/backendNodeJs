const user=require("../models/user")
const {v4:uuidv4}=require("uuid")
const {setUserMap}=require("../service/auth");

async function handleCreateUser(req,res){
    const body=req.body;
    if(!body || !body.name || !body.email || !body.password)
      return  res.status(400).json({error:"name,email and pass cant be empty"})
    try{
    await user.create({
        name: body.name,
        email: body.email ,
        password: body.password ,
        role:"admin",
    });
    return res.redirect("/");
    }
    catch(err){
      return  res.json({userCreationerr:err});
    }

}
async function handleLoginUser(req,res){
    const body=req.body;
    if(!body || !body.email || !body.password)
      return  res.status(400).json({error:"email and pass cant be empty"})

    const data= await user.findOne({
        email: body.email ,
        password: body.password ,

    });
    if(!data){ return res.render("login",{error:"invalid usrname or password"});}

    //statefull
    // const sessionId=uuidv4();
    // setUserMap(sessionId,data);
    // res.cookie("uid",sessionId);

    //stateless
    //using cookie
    const token = setUserMap(data);
    res.cookie("uid",token);
    return res.redirect("/");

    //using header 

  //  res.setHeader("Authorization",`Bearer ${token}`);
    // return res.json({token});
    
}

module.exports={handleCreateUser,handleLoginUser}