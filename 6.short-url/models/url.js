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

},{timestamps:true})


const Url=mongoose.model('url',urlSchema);

module.exports=Url;