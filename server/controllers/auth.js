 
 import {User} from '../models/user.js';

 export const createOrUpdateUser =async(req,res)=>{
    //you get the request from client and server send the response
    
    // res.json({data:'hey you hit auth node API'});

    const {name,email,picture} =req.user;
    let role="subscriber";
    const {seller,address} = req.body;
     console.log("req.body --->",req.body);
    if(seller === 'yes')
    {
        role="seller"
        console.log("seller is clicked")
    }
    else{
        console.log("seller is not clicked");
    }
    
    try{
        
    const user=await User.findOneAndUpdate({email},{name:email.split("@")[0],picture,role,address},{new:true});
    if(user)
    {
        console.log("User Updated",user)
        res.send(user); 
  
    }
    else{
        const newUser=await new User(
            {
                email,name:email.split("@")[0],picture,role,address
            }
        ).save();
        console.log("User created",newUser)
        res.json(newUser);
    }
    }
    catch(err)
    {
        console.log(err)
    }
}
export const currentUser =async (req,res)=>{
    try{
const user=await User.findOne({email:req.user.email});
console.log("sending the user ",user)
if(user)
{
res.status(200).json(user)
}
else{
    console.log("user does not exist")
    res.json("user does not exist");
}
    }catch(err)
    {
        console.log(err)
    }
}
export const LoginUser=async(req,res)=>{
    const {name,email,picture} =req.user;
    try{
    const user= await User.findOne({email});
    console.log("user is --->",user)
    if(user)
    {
        console.log("user exists and sending it");
        res.json(user)
    }
    else{
        console.log("user does not exist")
        res.json("user does not exist");
    }
}
catch(err){
    console.log(err)
    console.log("got error")
    res.json(err);
}
}

export const CheckingEmail =async(req,res)=>{
    const {email}=req.body;
    console.log("req.body is",req.body)
    const user=await User.findOne({email:email});
    if(user)
    {
        console.log(user)
        console.log("got the user")
        res.json("got")
    }
    else{
        console.log("user does not exist")
        res.json("user does not exist")
    }
}
