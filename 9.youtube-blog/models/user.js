const {Schema,model,models}=require('mongoose');
const {createHmac,randomBytes}=require("crypto")
const {setUser}=require("../service/auth")
const userSchema=new Schema({
        fullName:{
            type:String,required:true
        },
        email:{
            type:String,required:true,unique:true
        },
        salt:{
                type:String
        },
        password:{
             type:String,required:true
        },
        profileImgUrl:{
            type:String,default:'/images/default.jpg'
        },
        role:{
            type:String,
            enum:["USER","ADMIN"],
            default:"USER",
        }

},{timestamps:true})

userSchema.pre("save",function (next){
    const user=this;
    if(!user.isModified("password")) return;
    const salt= randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).
    digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
    next();
})

//static function
userSchema.static('matchpassword',async function ({email,password}) {
        const user=await this.findOne({email});
        if(!user) throw new Error('wrong email!');

        const hashedPassword=createHmac('sha256',user.salt).update(password).digest("hex");
        if(hashedPassword !== user.password) throw new Error('wrong password');
         const token=setUser(user);
    return token;
})

const User=models.user|| model("user",userSchema);

module.exports=User;
