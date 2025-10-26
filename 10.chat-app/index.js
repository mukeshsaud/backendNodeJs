const express= require("express");
const http=require("http");
const path=require("path")
const {Server}=require("socket.io")



const app=express()
const server=http.createServer(app);
const io= new Server(server);


//middleware
app.use(express.static(path.resolve("./public")));

//routes
app.get("/index",(req,res)=>{
  
})

io.on("connection",(socket)=>{
    console.log("a user connected")
    socket.on("message",(msg)=>{
        console.log("message: "+msg)
        // socket.emit("message",msg).  //sends back to that clients who sended that msg
        io.emit("message",msg).          //sends back to all connected to socket

    })
    socket.on("disconnect",()=>{
        console.log("disconnected")
    })
})

//listen
server.listen(8000,()=>{
    console.log("server connected at 8000");
})