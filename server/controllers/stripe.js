import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";
import { product } from "../models/product.js";
import { Coupon } from "../models/coupon.js";

import stripe from 'stripe';



const stripeInstance = stripe("sk_test_51P2QyvSHl6SW5TEODjjnDYfnlUrANGLy9nYzMx57Sn0cSn01voh1Ao7cMNJxParf33cdLvliZVsdhFVshHzSzvFP009S7KCpy4");


export const createPaymentIntent = async(req,res)=>{
    //later apply coupon
    //later calculate price
   console.log("stripeinstance-->",stripeInstance)
   console.log(req.body.couponApplied);
   const {couponApplied} =req.body;

   //1. find user
   const user = await User.findOne({email:req.user.email}).exec();
   //2. get user cart details
   const {cartTotal,totalAfterDiscount} = await Cart.findOne({orderdBy:user._id}).exec();
   

   console.log("Cart total Charged",cartTotal,"total after discount",totalAfterDiscount);
   let finalAmount=0;
   if(couponApplied && totalAfterDiscount)
   {
    finalAmount =Math.round(totalAfterDiscount*100) //13.5 --> 14
   }
   else{
    finalAmount = Math.round(cartTotal*100);
   }
    const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: finalAmount,//to convert from cent to doller(1doller=100cents)
        currency: 'usd',//usd for usa dollar and inr for indian
        description:'Example description for export transaction',
        shipping: {
            name: 'John Doe', // Customer name
            address: {
              line1: '123 Main Street', // Address line 1
              city: 'New York', // City outside India
              state: 'NY', // State outside India
              postal_code: '10001', // Postal code outside India
              country: 'US', // Country code (ISO 3166-1 alpha-2) outside India
            },
      }});
      res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable:finalAmount,
      });
}