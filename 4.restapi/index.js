const express = require("express");
let users=require("./MOCK_DATA.json");
const fs=require("fs");
const app=express();

//middleware-plugin
app.use(express.urlencoded({extended:false}));

// app.use((req,res,next)=>{
//     console.log(__dirname)
//     console.log("hlo from 1");
//     fs.appendFile("./log.txt",
//         `\n${Date.now()}::${req.ip}::${req.method}::${req.path}`,()=>{
//              next();
//         })
//     req.class=5;
// })
// app.use((req,res,next)=>{
//     console.log("hlo from 2",req.class);
//     // res.send("hi from 2");
//     next();
// })

//Routes

//get users in html
app.get("/users",(req,res)=>{
const html=`
<ul>
${users.map((user)=> `<li>${user.first_name}</li>`
).join("")}
</ul>`
res.send(html);
})


//Rest API
//get users in Json
app.get("/api/users",(req,res)=>{
   console.log(req.query.name);
    res.setHeader("x-name","mukeshsaud");  //custom Header response
    console.log(req.headers) //request header
    res.json(users);
})

//get,patch and delete user with id  using route
app.route("/api/users/:id")
.get((req,res)=>{
    console.log("hloeeeeejy");
    const id=Number(req.params.id);
    // res.send(users[id-1].first_name);
    const user=users.find((user)=>user.id===id)
    if(!user){  
        res.status(404).json({error:"user not found"})
    }
    res.json(user);
})
.patch((req,res)=>{
    const updates=req.body;
    const id=Number(req.params.id);
    const index=users.findIndex((user)=>user.id===id);

    if(index<0){
        return res.status(404).json({error:"user not found"});
    }
    updatedUser={...users[index],...updates}
    users[index]=updatedUser;
  
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err)
            return res.status(500).json({error:"write failed"});

    return res.json({user:updatedUser});
})
})
.delete((req,res)=>{
    const id=Number(req.params.id);
    //  users = users.filter(u => u && typeof u === "object");
    const index=users.findIndex((user)=>user.id===id);
   
    if(index<0)
        return res.status(404).json({error:"user not found"});
    
        users.splice(index,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if (err) return res.status(500).json({error:"read failed"});
        else{
            return res.json({users:users})
        }
    })
    
    

})

//create new user
app.post("/api/users",((req,res)=>{
    const body=req.body;
    console.log("body",body);
    if(!body||!body.first_name || !body.last_name || !body.email || ! body.gender || !body.ip_address)
        return res.status(400).json({msg:"all  field are required"});
   users.push({...body,id:users.length+1});
    // users.push(body);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(error)=>{
        return res.status(201).json({status:"sucess",id:users.length})
        })
}))


app.listen(8000,()=>{
    console.log("server started");
})