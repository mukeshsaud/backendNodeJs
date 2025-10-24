const mongoose=require("mongoose");

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true,
      }
    ,
    redirectUrl:{
        type:String,
        require:true
    },
    clicks:
       [{type:Number}] ,
    createdBy:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"}

},{timestamps:true})


const Url=mongoose.model('url',urlSchema);

module.exports=Url;