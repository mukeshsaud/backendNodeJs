const {Schema,model,models}=require("mongoose");

const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
         type:String,
        required:true
    },
    coverImgUrl:{
         type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const blog= models.blog || model("blog",blogSchema)

module.exports=blog;