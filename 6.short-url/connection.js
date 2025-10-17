const mongoose=require("mongoose");

async function Connectmongoose(url){
    return  mongoose.connect(url);
}
module.exports={Connectmongoose};