const comment=require("../models/comment")
async function handleCreateComment(req,res){
    const blogId=req.params.blogId
    console.log(blogId);
    console.log(req.user);
    await comment.create({
        content:req.body.content,
        createdBy:req.user._id,
        blogId:blogId
    })
    return res.redirect(`/blog/${blogId}`)


}
module.exports={handleCreateComment}