const http=require("http");
const fs=require("fs");
const url=require("url");
myServer=http.createServer((request,response)=>{
      let myUrl=url.parse(request.url,true);
    if(myUrl.pathname==='/favicon.ico'||myUrl.pathname==='/.well-known/appspecific/com.chrome.devtools.json')
        return response.end();
  
    console.log(myUrl);
    let log=Date.now();
fs.appendFile("log.txt",`${log}:: new req in the server path ${request.url}\n`,(err,res)=>{
    switch(myUrl.pathname){
        case '/':
            response.end("home");
            break;
        case '/about':
            response.end(`my name is ${myUrl.query.name}`);
            break;case '/search':
            response.end(`here are your search results for ` + `${myUrl.query.search_query}`);
            break;
            default:
                response.end("404 not found");
    }
// response.end("hello from server");
})
// console.log(request.headers);

})

myServer.listen(8000,()=>{
    console.log("server started");
})