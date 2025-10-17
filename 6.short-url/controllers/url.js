const Url=require('../models/url');
const shortid=require('shortid');

async function handleCreateShortUrl(req,res){
    const body=req.body;
    console.log(body.url);
    const shortId=shortid.generate();
    if(!body.url) return res.status(400).json({error:'url is required'})
   await Url.create({
        shortId:shortId,
        redirectUrl:body.url,
        clicks:[],
    })
    return res.render("home",{sid:shortId})
    // return res.status(201).json({id:shortId});
}

async function handleRedirecting(req,res){
    const shortId=req.params.shortid;
    const data=await Url.findOneAndUpdate({shortId},{
        $push: {clicks:Date.now()}
    })
    return res.redirect(data.redirectUrl);
}

async function handleDeleteDocument(req,res){
    const data=await Url.findOneAndDelete({redirectUrl:req.body.redirectUrl});
    return res.json({delete:data});
}

async function handleAnalytics(req,res){
    const shortId=req.params.shortid;
   const data= await Url.findOne({shortId});
   res.json({totalClicks:data.clicks.length,timeStamps:data.clicks})

}


module.exports={handleCreateShortUrl,handleRedirecting,handleDeleteDocument,handleAnalytics}
