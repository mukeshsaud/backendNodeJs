const express=require('express');
const Url=require('../models/url')
const router=express.Router();

router.get("/",async(req,res)=>{
    const urls=await Url.find({});
   return res.render("home",{urls:urls});

})


module.exports=router;


// router.get("/hello",async(req,res)=>{
//    const data= await Url.findOne({ redirectUrl: 'https://www.apple.com'})
//    console.log (data.clicks);
//    return res.render("home",{clicks:data.clicks});

// })