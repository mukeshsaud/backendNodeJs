const serverless= require ("serverless-http");
const express=require("express");
const path=require("path");
const mongoose=require("mongoose")
const staticRouter=require("../../routes/staticRouter");
const userRouter=require("../../routes/user");
const blogRouter=require("../../routes/blog");
const commentRouter=require("../../routes/comment");
const {checkForAuthentication,restrictTO}=require("../../middlewares/auth")
const cookieParser=require("cookie-parser");

require("dotenv").config();
const app=express();
// const PORT=process.env.PORT 

//mongoose connect
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongodb connected"));

app.set('view engine','ejs');
// app.set("views",path.resolve("./views"))
app.set("views", path.join(__dirname, "../../views"));


//middleware
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication);
const publicpath=path.resolve("./public")
app.use(express.static(publicpath));


// routes
app.use("/",staticRouter)
app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)


// app.listen(PORT,()=>{
//     console.log(`${PORT} is listening`);
// })
// if (process.env.NODE_ENV !== "netlify") {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }
//netlify serveless function
module.exports.handler=serverless(app);