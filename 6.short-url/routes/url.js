const express=require("express");
const {handleCreateShortUrl,handleRedirecting,handleDeleteDocument,handleAnalytics}=require('../controllers/url')
const Url=require('../models/url');
const router=express.Router();


router.route("/")
.post(handleCreateShortUrl)
.delete(handleDeleteDocument);

router.get("/:shortid",handleRedirecting);
router.get("/analytics/:shortid",handleAnalytics);


module.exports=router;