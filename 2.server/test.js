const http=require("http");

let server=http.createServer((req,res)=>{
    if(req.url){
    res.end(`${req.url}`);}

})
server.listen(8000,()=>{
    console.log("server is listening");
})