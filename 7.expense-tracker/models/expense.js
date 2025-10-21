const mongoose=require("mongoose");
const category = require("./category");
const {Schema}=mongoose;
const expenseSchema=new mongoose.Schema({
      cost:{type:Number,required:true },
      category:{type:Schema.Types.ObjectId,ref:'category',required:true,unique:true}
    },
      {timestamps:true})

const expense= mongoose.model('expenses',expenseSchema);

module.exports=expense;