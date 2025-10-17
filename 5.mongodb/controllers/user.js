const User=require('../models/user');

function handleGetAllUsers(){
    return async(req,res)=>{
const data= await User.find();
console.log("i'm returning a function and in routes handleGetAllUsers() ")
 res.send(data);
}}

async function handleGetUserById(req,res){
   const user = await User.findById(req.params.id);
    return res.send(user);
}

async function handleUpdateUser(req,res){
   await User.findByIdAndUpdate(req.params.id,req.body);
    return res.json({msg:'sucess'});
}
async function handleDeleteUser(req,res){
 await User.findByIdAndDelete(req.params.id);
     res.json({msg:'sucess'});
}
async function handleCreateUser(req,res){
    const body=req.body
   if(!body|| !body.FirstName || !body.LastName || !body.Email){
    res.status(400).send({error:"fill all required field "})
   }
    await User.create(body);
    return res.status(201).send({msg:'succesfull'});
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
   handleUpdateUser,
   handleDeleteUser,
   handleCreateUser
}