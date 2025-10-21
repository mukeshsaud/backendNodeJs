const express=require("express");
const {connectMongoDB}=require('./connnection');
const categoryRouter=require('./routes/category')
const expenseRouter=require('./routes/expense')
const staticRoute=require("./routes/staticRoute")
const category=require('./models/category')
const expense=require("./models/expense")
const app=express();
const path=require('path')
const flash=require('connect-flash')
const session=require('express-session')

//mongodb
connectMongoDB("mongodb://127.0.0.1:27017/expense-tracker")
.then(async()=>{
    console.log("mongodb connected");
    await category.syncIndexes();
    await expense.syncIndexes();
console.log("category and expense indexes synced to manage duplicacy")})
.catch(err=>console.error(err))

//setting ejs
app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

//middlewares
app.use(express.json());
app.use(express.static("views"));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'aplle-my',
    saveUninitialized:false,
    resave:false,
}))
app.use(flash());


//routes
app.use("/",categoryRouter);
app.use("/expenses",expenseRouter);
app.use("/frontend",staticRoute);

//port
app.listen(8000,()=>{
    console.log("port running");
})