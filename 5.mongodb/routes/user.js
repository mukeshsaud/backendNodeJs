express=require("express");
const {handleGetAllUsers,handleGetUserById,
handleUpdateUser,handleDeleteUser,handleCreateUser}=require('../controllers/user');
const router=express.Router();

// //html

// router.get("/html",async(req,res)=>{
//     const datas=await User.find();
//     html=`<ul>${datas.map((data)=> `<li> ${data.FirstName} - ${data.age} </li>`).join("")}</ul>`;
//     res.send(html);
// })



router.route("/")
.get(handleGetAllUsers()).post(handleCreateUser)

router.route("/:id").
get(handleGetUserById)
.patch(handleUpdateUser)
.delete(handleDeleteUser)


module.exports=router;