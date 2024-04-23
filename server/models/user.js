import mongoose from "mongoose";
const {ObjectId} =mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        index:true,
    },
    role:{
        type:String,
        default:'subscriber',
    },
    cart:{
        type:Array,
        default:[],
    },
    address:{type:String,
    default:"shiv nagar colony"},
   wishlist:[{type:ObjectId,ref:"Product"}],

},{timestamps:true});
export const  User=mongoose.model("User",userSchema);