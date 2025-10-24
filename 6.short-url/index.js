const router=require('./routes/url');
const express=require('express');
const {Connectmongoose}=require('./connection');
// const path=require("path")
const staticRoute=require('./routes/staticRouter');
const userRoute=require("./routes/user")
const app=express();
const cookieParser=require("cookie-parser")
const {restrictToLoggedInUserOnly,checkAuth}=require("./middlewares/auth")
const {checkForAuthentication,restrictTo}=require("./middlewares/authorization")

//setting view enginge to ejs
app.set('view engine','ejs');
// app.set("views",path.resolve('./views'))


//connecting mongodb
Connectmongoose('mongodb://127.0.0.1:27017/urlShortner').then(()=>console.log("mongodb connected"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication);

//routes
// app.use("/url",restrictToLoggedInUserOnly,router);
// app.use("/user",userRoute)
// app.use("/",checkAuth,staticRoute);

app.use("/url",restrictTo(['normal','admin']),router);
app.use("/user",userRoute);
app.use("/",staticRoute);


//using res.render to load ejs viewFile
// app.get("/",(req,res)=>{
//     res.render('home')
// })

//listen port
app.listen(8000,()=>{console.log("port is running")});