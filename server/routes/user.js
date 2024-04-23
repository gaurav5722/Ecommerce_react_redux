//we are using the user route for cart route

import express from 'express';
//middleware
 import {authCheck} from '../middlewares/auth.js'; 
 //controller
import { userCart ,getUserCart,emptyCart,saveAddress,applyCouponToUseCart,createOrder,orders, addToWishlist, wishlist, removeFromWishlist,createCashOrder} from '../controllers/user.js';
const router=express.Router();

// router.get('/user',(req,res)=>{
//     //you get the request from client and server send the response
//     res.json({data:'hey you hit user node API'});
// });

router.post('/user/cart',authCheck,userCart); //save cart
router.get('/user/cart',authCheck,getUserCart); //get cart
router.delete('/user/cart',authCheck,emptyCart); //empty cart
router.post('/user/address',authCheck,saveAddress);
router.post('/user/order',authCheck,createOrder);
router.get('/user/orders',authCheck,orders);
//coupon
router.post('/user/cart/coupon',authCheck,applyCouponToUseCart);
//Cod
router.post('/user/cash-order',authCheck,createCashOrder);

//Add to wishlist
router.post('/user/wishlist',authCheck,addToWishlist);
//get the wishlist
router.get('/user/wishlist',authCheck,wishlist);
//remove from wishlist
router.put('/user/wishlist/:productId',authCheck,removeFromWishlist);

export default router;