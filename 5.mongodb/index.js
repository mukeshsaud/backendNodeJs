const express=require("express");
const mongoose=require("mongoose");
const fs=require("fs");
const userRouter=require('./routes/user')
const {connectmongoose}=require('./connection');
const { logs } = require('./middlewares/index');


//Connection
connectmongoose('mongodb://127.0.0.1:27017/userData').then(()=>console.log("mongoDb connected"));

const app=express();

//middleware-plugin
app.use(express.urlencoded({  extended: false,}));
app.use(logs);

//routes
app.use("/users",userRouter);

//listen
app.listen(8000,()=>{
    console.log("server started");
})