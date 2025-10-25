const express=require("express");
const multer=require("multer");
const blog=require("../models/blog")

const storage=multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"./public/uploaded");
    },
    filename:function (req,file,cb) {
        cb(null,`${Date.now()}_${file.originalname}`)
    },
})

const upload=multer({storage})


const router=express.Router();

router.post("/add-blog",upload.single('coverImgUrl'), async function(req,res,next){
    const body=req.body;
 const user=req.user;
 const coverImgUrl="/uploaded/"+req.file.filename;

 try{
 const data=await blog.create({
    title:body.title,
    body:body.body,
    coverImgUrl:coverImgUrl,
    createdBy:user._id
 })
return res.redirect(`/blog/${data._id}`);
}
 catch(err){
    return res.render("addBlog",{error:err.message});}
}
)


module.exports=router;