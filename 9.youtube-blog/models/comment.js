const {model,Schema,models}=require("mongoose");

commentSchema=new Schema({
content:{type:String,required:true},
createdBy:{type:Schema.Types.ObjectId,required:true,ref:"user"},
blogId:{type:Schema.Types.ObjectId,required:true,ref:"blog"}
},{timeseries:true})

comment=models.comment|| model("comment",commentSchema)

module.exports=comment;