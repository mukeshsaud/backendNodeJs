const expense=require('../models/expense');
const category = require('../models/category');


async function handleCreateExpense(req,res){
    const body=req.body;
    const preference= await category.findOne({preference:body.category}); //body.category returns name only but have to assign id
  
    if(!body|| !body.cost ){
         req.flash("error","please select a expense")
        return res.redirect("/frontend");
        // return res.status(400).send("cost and unique category required");
    }
      if(body.category==="Choose a Category"){
        req.flash("error","please select a category")
        return res.redirect("/frontend");
      }

    expense.create({
            cost:body.cost,
            category:preference._id,  
                })
        .then(()=>{return res.redirect("/frontend");})
        .catch(err => {
        if(err.code===11000){
            req.flash("error","category already has expense");
            return res.redirect("/frontend")
        }
        return res.status(500).json({error:err});
        })
  
}

async function handleGetallExpenses(req,res){
    await expense.find()
    .populate('category')
    .exec().then((result)=> {return res.json({result})})
    .catch(err=>{
        return res.status(400).json({error:"error in populate",err})
    })
      
}

async function handleGetExpense(req,res){

    await expense.findOne({cost:20})
    .populate('category')
    .exec().then((result)=> {return res.json({result})})
    .catch(err=>{
        return res.status(400).json({error:"error in populate",err})
    })
      
        
   
}
async function handleDeleteEXpense(req,res) {
        const body=req.body;
    await expense.findByIdAndDelete({_id:body.id});
    req.flash("delexp","flex");
    return res.redirect("/frontend");
    
}





module.exports={handleCreateExpense,handleGetallExpenses,handleGetExpense,handleDeleteEXpense}