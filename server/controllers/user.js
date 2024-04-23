import {User} from '../models/user.js';
import {product} from '../models/product.js';
import { Cart } from '../models/cart.js';
import { Coupon } from '../models/coupon.js';
import { Order } from '../models/order.js';
import uniqueid from 'uniqueid';
import { nanoid } from 'nanoid';
export const userCart= async(req,res)=>{
    console.log(req.body)
const {cart} = req.body;
console.log("i am going to print cart--->",cart)
 let products=[];
 const user =await User.findOne({email:req.user.email}).exec();
 //check if cart with user id already exists
 let cartExistByThisUser= await Cart.findOne({orderBy:user._id}).exec();
 if(cartExistByThisUser)
 {
    cartExistByThisUser.remove();
    console.log("removed old cart");
 }
 
 for(let i=0;i<cart.length;i++)
 {
    let object = {};
    object.product = cart[i]._id;
    object.count=cart[i].count;
    //get price for creating total
    let productFromDb = await product.findById(cart[i]._id).select('price').exec();
    
    object.price = productFromDb.price;

    products.push(object);
 }
   console.log('products',products);
   let cartTotal =0;
   for(let i=0;i<products.length;i++)
   {
    cartTotal = cartTotal + (products[i].price *products[i].count);
   }
   //console.log('cartTotal',cartTotal);
   let newCart = await new Cart({
    products,
    cartTotal,
    orderBy:user._id,

   }).save();

   console.log('new cart',newCart);
   res.json({ok:true})
};

export const getUserCart =async(req,res)=>{
    console.log('get user cart entered')
    const user= await User.findOne({email:req.user.email}).exec();
    let cart=await Cart.findOne({orderBy:user._id}).populate('products.product','id title price totalAfterDiscount color').exec();
    console.log('cart in server is--->',cart);
    const {products,cartTotal,totalAfterDiscount}=cart;
    res.json({products,cartTotal,totalAfterDiscount});

} 
export const emptyCart = async(req,res)=>{
   console.log("empty Cart")
   const user= await User.findOne({email:req.user.email}).exec();
   const cart = await Cart.findOneAndRemove({orderBy:user._id}).exec();
   res.json(cart);
}
export const saveAddress =async(req,res)=>{
   console.log('savedAddress');
   try {
      const userAddress=await User.findOneAndUpdate({email:req.user.email},{address:req.body.address}).exec();
      res.json({ok:true});
   } catch (error) {
      res.json(error)
   }
   
}
//Apply coupon to user cart
export const applyCouponToUseCart=async(req,res)=>{
 const {coupon}=req.body;
 console.log("coupon",coupon);

 const validCoupon =await Coupon.findOne({name:coupon}).exec();
 if(validCoupon === null)
 {
   return res.json({err:'Invalid coupon'})
 }
 console.log('Valid coupon',validCoupon);
 const user=await User.findOne({email:req.user.email}).exec();
 let {products,cartTotal} = await Cart.findOne({orderBy:user._id}).populate("products.product","_id title price").exec();
 console.log('cartTotal ',cartTotal,"discount% ",validCoupon.discount);
//calculate total after discount
let totalAfterDiscount = (cartTotal - (cartTotal*validCoupon.discount)/100).toFixed(2);//99.99
Cart.findOneAndUpdate({orderBy:user._id},{totalAfterDiscount},{new:true}).exec();

res.json(totalAfterDiscount)

}
export const createOrder =async(req,res)=>{
   const {paymentIntent} = req.body.stripeResponse;
   const user = await User.findOne({email:req.user.email}).exec();
   const {products} = await Cart.findOne({orderdBy:user._id}).exec();
   let newOrder= await new Order({
      products,
      paymentIntent,
      orderdBy:user._id
   }).save();
   //decrement the quantity , increment sold
   let bulkOption = products.map((item)=>{
      return {
         updateOne:{
             filter:{_id:item.product._id},// important item.product
             update:{$inc:{quantity:-item.count,sold:+item.count}}
         },
      };
   });
   let updated = await product.bulkWrite(bulkOption,{});
   console.log('Product Quantity-- And Sold ++',updated);
//Product.bulkWrite() --> update many products
   console.log('New Order Saved',newOrder);
   res.json({ok:true});
}
export const orders = async(req,res)=>{
 let user = await User.findOne({email:req.user.email}).exec();
 let userOrders = await Order.find({orderdBy:user._id}).populate('products.product').exec();
 console.log("user/orders--->",userOrders);
 res.json(userOrders);
}
//add to Wishlist get the wishlist delete the wishlist
export const addToWishlist= async(req,res)=>{
  const {productId} = req.body;
  const user = await User.findOneAndUpdate({email:req.user.email},{$addToSet:{wishlist:productId}}).exec();
  res.json({ok:true})
//   addToSet is used to add the productId in mongoose

}
//return all the wishlist products
export const wishlist = async(req,res)=>{

    const list = await User.findOne({email:req.user.email}).select('wishlist').populate('wishlist').exec();
    res.json(list);
}
//remove from wishlist
export const removeFromWishlist=async(req,res)=>{
   const {productId}  = req.params;
   const user= await User.findOneAndUpdate({email:req.user.email},{$pull:{wishlist:productId}}).exec();
   res.json({ok:true});
}
export const createCashOrder = async(req,res)=>{
   const {COD,couponApplied} = req.body;
   if(!COD) return res.status(400).send("Create cash order failed");
   const user = await User.findOne({email:req.user.email}).exec();
   const userCart = await Cart.findOne({orderdBy:user._id}).exec();
   let finalAmount=0;
   if(couponApplied && userCart.totalAfterDiscount)
   {
    finalAmount =Math.round(userCart.totalAfterDiscount*100) //13.5 --> 14
   }
   else{
    finalAmount = Math.round(userCart.cartTotal*100);
   }
   const newId=uniqueid();
   console.log(`uniqueId---------------> ${newId}`)
   console.log(`nanoId----------------->${nanoid()}`)
   let newOrder= await new Order({
      products:userCart.products,
      paymentIntent:{
       id:nanoid(),
       amount:userCart.products,
       amount:finalAmount,
       currency:'usd',
       status:'Cash On Delivery',
       created:Date.now(),
       payment_method_types:['COD']
      },
      orderdBy:user._id,
      orderStatus:"Cash On Delivery"
   }).save();
   //decrement the quantity , increment sold
   let bulkOption = userCart.products.map((item)=>{
      return {
         updateOne:{
             filter:{_id:item.product._id},// important item.product
             update:{$inc:{quantity:-item.count,sold:+item.count}}
         },
      };
   });
   let updated = await product.bulkWrite(bulkOption,{});
   console.log('Product Quantity-- And Sold ++',updated);
//Product.bulkWrite() --> update many products
   console.log('New Order Saved',newOrder);
   res.json({ok:true});
}