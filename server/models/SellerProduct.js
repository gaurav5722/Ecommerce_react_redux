import mongoose from 'mongoose';
const {ObjectId} =mongoose.Schema;

const SellerProductSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        text:true
    },
    slug:
    {
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    index:true,
    },
    description:{
        type:String,
        require:true,
        maxlength:2000,
        text:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32,
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    subs:[{
        type:ObjectId,
        ref:"Sub",
    }],
    quantity:{
        type:Number,
    }
    ,sold:{
        type:Number,
        default:0
    
     },
    images:{
        type:Array,
    },
    shipping:{
        type:String,
        enum:['yes','no'],
    },color:
    {
        type:String,
        enum:["Black","Green","Red","Yellow","Orange"],
    },
    // brand:
    // {
    //     type:String,
    //     enum:["Apple","Samsung","Microsoft","Lenovo","Asus"],
    // },
    ratings:
    [{star:Number,
    postedBy:{type:ObjectId,ref:"User"},
    }],
  
    verified:{type:String,
        default:"no",
    enum:["yes","no"]},
    postedBy:{type:ObjectId,ref:"User"},
    //we are using enum in shipping so that shipping accept the other value except only yes or no
    // we use text:true to search in  database
},{timestamps:true}
);
export const Sellerproduct=mongoose.model('SellerProduct',SellerProductSchema);