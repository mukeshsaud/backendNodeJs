const express=require("express");
const os=require("os")
const cluster=require("cluster");

const totalCpus=os.cpus().length;


if(cluster.isPrimary){
   console.log (`primary pid is running: ${process.pid}`)
    for(let i=0;i<totalCpus;i++){
        cluster.fork();
    }
}
else{
    const app=express()
app.get("/",(req,res)=>{
    res.end(`hi: ${process.pid}`)
})

app.listen(8000,()=>{
   console.log(" port is listening to 8000")
})
}
//routes
