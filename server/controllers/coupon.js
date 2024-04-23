    import { Coupon } from "../models/coupon.js";
    //create ,remove,list
    export  const create =async(req,res)=>{
    try {
        const {name,expiry,discount} = req.body.coupon;
        console.log(req.body)
        
        res.json(await new Coupon({name,expiry,discount}).save());
    } catch (error) {
        console.log(error)
    }
    }
    export const remove =async(req,res)=>{
    try {
        const coupons=await Coupon.findByIdAndDelete(req.params.couponId).exec()
        res.json(coupons);
    } catch (error) {
        console.log(error);
    }
    }
    export const list= async(req,res)=>{
    try {
        res.json(await Coupon.find({}).sort({createdAt:-1}).exec());
    } catch (error) {
        console.log(error);
    }
    }