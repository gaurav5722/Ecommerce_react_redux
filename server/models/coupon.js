import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const couponSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        uppercase:true,
        required:'Name is required',
        minlength:[6,"Too short"],
        maxlength:[12,"Too long"],
        // we want to only use capital letter in the coupon
    },
    expiry:{
        type:Date,
        require:true,
    },
    discount:{
        type:Number,
        required:true,
    },
},{timestamps:true});
export const Coupon = mongoose.model("Coupon",couponSchema);