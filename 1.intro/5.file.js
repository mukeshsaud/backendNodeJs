const fs=require("fs");
const os=require("os");
// sync
// fs.writeFileSync("./test.txt","hello bro");

// async
// fs.writeFile("./test.txt","hello bro async",(err)=>{})

    //read sync
    // const read=fs.readFileSync("./contacts.txt","utf-8");
    // console.log(read);

    //read async
    // fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    //     if(err){
    //         console.log("error",err);
    //     }
    //     else{
    //         console.log("result",result)
    //     }
    // })

    // append
    // fs.appendFileSync("./contacts.txt", Date.now().toLocaleString());

    //copy
    // fs.cpSync("./contacts.txt","copy.txt");
  
    //delete
    // fs.unlinkSync("./test.txt");

    //stats
    // console.log(fs.statSync("./copy.txt"));

    //make folder/directory
    // fs.mkdirSync("my-docs");
    // fs.mkdirSync("my-library/a/b",{recursive:true});
    // fs.writeFileSync("./my-library/a/math.txt","i'm math");

    console.log(os.cpus().length)