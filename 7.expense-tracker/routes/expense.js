const express=require("express");
const {handleCreateExpense,handleGetallExpenses,handleGetExpense,handleDeleteEXpense}=require('../controllers/expense');
const router=express.Router()


router.route("/")
.post(handleCreateExpense)
.get(handleGetallExpenses)

router.get("/get",handleGetExpense);

router.post("/expdelete",handleDeleteEXpense)

module.exports=router;