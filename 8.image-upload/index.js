const express=require("express");
const multer=require("multer");

// const upload=multer({dest:'Uploads/'})

const storage=multer.diskStorage({
    destination: function(req,file,cb) {
       return cb(null,'./upload')
    },
    filename: function (req,file,cb) {
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload=multer({storage});

const app=express();

app.set('view enginge','ejs');

app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    return res.render("index.ejs");
}) 
app.post("/postimg",upload.single('img'),(req,res)=>{
    console.log (req.body);
console.log (req.file);
return res.redirect("/")
})

app.listen(8000,()=>{
    console.log("8000 port is listining")
})