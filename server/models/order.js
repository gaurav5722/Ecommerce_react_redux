import mongoose from "mongoose";
const Schema = mongoose.Schema;
const {ObjectId} =mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products:[{
        product:{
            type:ObjectId,
            ref:'Product'
        },
        count:Number,
        color:String,
    }],
    paymentIntent:{},
    orderStatus:{
        type:String,
        default:'Not Processed',
        enum:["Not Processed","Processing","Dispatched","Cancelled","Completed","Cash On Delivery"]
    },
    orderdBy:{type:ObjectId,ref:"User"}
},{timestamps:true});
export const Order=mongoose.model('Order',orderSchema)