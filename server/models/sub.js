import mongoose from 'mongoose';
const {ObjectId}= mongoose.Schema;
const subSchema= new mongoose.Schema({
    name:{type:String,
    trim:true,
    require:"Name is required",
    minlength:[2,"Too short"],
    maxlength:[32,"Too long"],
},slug:{
    type:String,
    unique:true,
    lowercase:true,
    index:true,
},
parent:{
    type:ObjectId,
    ref:"Category",
    required:true
},
},{timestamps:true});
export const  Sub = mongoose.model("Sub",subSchema);