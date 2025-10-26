const express=require("express");
const fs=require("fs");
const status=require("express-status-monitor");
const zlib=require("zlib")


const app=express();

//middleware
app.use(status());

// fs.createReadStream("./MOCK_DATA.json","utf-8").pipe(zlib.createGzip().pipe(fs.createWriteStream("./MOCK_DATA.gz")))
//routes
app.get("/",(req,res)=>{
  
//   fs.readFile("./MOCK_DATA.json","utf-8",(err,data)=>{
//         res.json((data));
//     })
      const stream=fs.createReadStream("./MOCK_DATA.json","utf-8");
      stream.on("data",(chunk)=>res.write(chunk));
      stream.on("end",()=>res.end())
})

app.listen(8000,()=>{
    console.log("listening to port 8000")
})