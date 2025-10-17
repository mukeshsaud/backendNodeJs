const http=require("http");
const express=require("express");

const app=express();
app.get("/",(req,res)=>{
    res.send("hello");
})
app.get("/search",(req,res)=>{
    res.send("hello "+req.query.info);
})

app.listen(8000,()=>{
    console.log("server listening to app");
})

// const server=http.createServer(app);

// server.listen(8000,()=>{
//     console.log("server started");
// })