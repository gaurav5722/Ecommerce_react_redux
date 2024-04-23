import admin from '../firebase/index.js';
import { User } from '../models/user.js';
export const authCheck =async(req,res,next)=>{
    console.log(req.headers); //token must be got
     console.log("helo i am middleware")
     try{
     const firebaseUser= await admin.auth().verifyIdToken(req.headers.authorization);
    // const firebaseUser= await admin.auth().verifyIdToken(req.headers.authtoken);
     console.log("Firebase user in authCheck",firebaseUser);
     req.user=firebaseUser; 
     console.log("passed till here")
     next();
     }catch(err)
     {
     res.status(401).json({
        err:"Invalid or expired token",
     });
     }
    
}
export const adminCheck = async(req,res,next)=>{
   const {email}=req.user
   const adminUser=await User.findOne({email}).exec();
   if(adminUser.role !== "admin")
   {
      res.status(403).json({
         err:"Admin resource. Access denied",
      });
   }
   else{
      console.log("passed the admin test ")
      next();
   }
}
export const sellerCheck = async(req,res,next)=>{
   const {email}=req.user
   const SellerUser=await User.findOne({email}).exec();
   if(SellerUser.role !== "seller")
   {
      res.status(403).json({
         err:"Seller resource. Access denied",
      });
   }
   else{
      console.log("passed the seller test ")
      next();
   }
}