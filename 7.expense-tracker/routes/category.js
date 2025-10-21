const express=require("express");
const {handleCreateCategory,handleDeleteCategory,handleGetallCategory}=require('../controllers/category');
const router=express.Router();

router.route("/")
.post(handleCreateCategory)
.get(handleGetallCategory)

router
.post("/del",handleDeleteCategory)

module.exports=router;