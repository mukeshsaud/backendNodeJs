const mongoose=require('mongoose');

//Schema
const UserSchema=new mongoose.Schema({
    FirstName:{type:String,require:true},
    LastName:{type:String,require:true},
    Email:{type:String,require:true,unique:true},
    age:{type:Number},
},{timestamps:true})

//converting schema into model
const User= mongoose.model('Users',UserSchema);

module.exports=User;