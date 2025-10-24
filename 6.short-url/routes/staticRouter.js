const express=require('express');
const Url=require('../models/url')
const router=express.Router();
const {restrictTo}=require("../middlewares/authorization")

router.get("/",restrictTo(['normal','admin']),async(req,res)=>{
       
    const urls=await Url.find({createdBy:req.user?.id});
   return res.render("home",{urls:urls});

})
router.get("/admin",restrictTo(['admin']),async(req,res)=>{
       
    const urls=await Url.find({}).populate("createdBy");
   return res.render("home",{urls:urls});

})


router.get("/signup",async(req,res)=>{
    // const urls=await Url.find({});
   return res.render("signup");

})

router.get("/login",async(req,res)=>{
    // const urls=await Url.find({});
   return res.render("login");
})


module.exports=router;


// router.get("/hello",async(req,res)=>{
//    const data= await Url.findOne({ redirectUrl: 'https://www.apple.com'})
//    console.log (data.clicks);
//    return res.render("home",{clicks:data.clicks});

// })