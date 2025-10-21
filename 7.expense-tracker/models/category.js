const mongoose=require("mongoose");

const categorySchema = new mongoose.Schema({
            preference:{type:String,required:true,unique:true}
        },
        {timestamps:true})

const category= mongoose.model('category',categorySchema);

module.exports=category;