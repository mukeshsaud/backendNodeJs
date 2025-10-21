const express=require("express");
const category=require("../models/category")
const router=express.Router();
const{handleGetallExpenses}=require("../controllers/expense");
const expense=require("../models/expense")

router.get("",async(req,res)=>{
     const categories=await category.find();
     const error=req.flash('error');
     const erroratcategory=req.flash('erroratcategory')
     const deltrue=req.flash("deltrue");
     const delexp=req.flash("delexp");
     let displayatdelcategory="none";
    let displayatdelexpense ="none";
    let display="none";
    let displayatcategory="none";
     if(error.length>0){
        display="flex";
        console.log("error",error);
     }
     
      if(erroratcategory.length>0){
        displayatcategory="flex";
        console.log("error",error);
     }
     if(deltrue.length>0){
            displayatdelcategory="flex";
     }
     if(delexp.length>0){
            displayatdelexpense="flex";
     }

     await expense.find()
    .populate('category')
    .exec().then((expenses)=> {
        return res.render("index",{expenses:expenses,categories:categories,error:error,erroratcategory,
            display,displayatcategory,displayatdelcategory,displayatdelexpense})})
    .catch(err=>{
        return res.render("index")
    })
    
})


module.exports=router;