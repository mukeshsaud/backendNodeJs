const express=require("express");
const blog=require("../models/blog");
const comment = require("../models/comment");
const router=express.Router();

router.get("/signup",(req,res)=>{
return res.render("signup")
})

router.get("/login",(req,res)=>{
return res.render("login")
})

router.get("/",async (req,res)=>{
    if(req.user){
       const blogs= await blog.find();
return res.render("home",{user:req.user,blogs})}
            return res.render("home");
})

// router.get("/apple",restrictTO(["ADMIN"]),(req,res)=>{
// return res.render("home")
// })
router.get("/add-blog",(req,res)=>{
    if(!req.user) return res.redirect("/login")
return res.render("addBlog",{user:req.user})
})
router.get("/blog/:id",async(req,res)=>{
    const id=req.params.id;
    // if(!req.user) return res.redirect("/login")
    const Blog= await blog.findById(id).populate("createdBy");
 const comments= await comment.find({blogId:id}).populate("createdBy");

return res.render("blog",{Blog,user:req.user,comments});
  });

module.exports=router;