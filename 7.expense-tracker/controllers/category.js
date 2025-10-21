const category=require('../models/category')
const expense=require('../models/expense');

async function handleCreateCategory(req,res){
    const body=req.body;
    if(!body || !body.category ) {
            req.flash("erroratcategory","category can't be empty")
            return res.redirect("/frontend");
        // return res.status(400).json({error:"category is required "});
    }

    category.create({
        preference:body.category})
    .then(()=>{return res.redirect("/frontend")})
    .catch (err=> {
        if (err.code === 11000) { // duplicate key
            req.flash("erroratcategory", "Category already exists");
        } else {
            req.flash("erroratcategory", "err.message");
        }
        return res.redirect("/frontend");
    })
}
    // {"preference":"savings"}
    // return res.status(201).json({data});


async function handleDeleteCategory(req,res){
    const body=req.body;
     const categoryID= await category.findOne({preference:body.preference});
    await expense.findOneAndDelete({category:categoryID._id});
    if(!body || !body.preference) 
        {return res.status(400).json({error:"category is required "});}
    try{
    const data=await category.findOneAndDelete(body);
    req.flash("deltrue","flex")
    return res.redirect("/frontend");
    // return res.status(201).json({data});
    }
    catch(err){
        return res.json({delerror:err});
    }

}
async function handleGetallCategory(req,res){
    const data=await category.find();
    return res.status(201).json({data});
}

module.exports={handleCreateCategory,handleDeleteCategory,handleGetallCategory}

