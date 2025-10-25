const express=require("express");
const {handleCreateComment}=require("../controllers/comment")
const router=express.Router();

router.post("/:blogId",handleCreateComment)


module.exports=router;
