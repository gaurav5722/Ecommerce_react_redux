import { Sellerproduct } from '../models/SellerProduct.js';
import { Order} from '../models/order.js';
import { product } from '../models/product.js';
import {mongoose} from 'mongoose';
//to get the all orders
export const orders=async(req,res)=>{
    let allOrders= await Order.find({}).sort("-createdAt").populate("products.product").exec();
    res.json(allOrders);
};
//fetch and update the order status
export const orderStatus =async(req,res)=>{
    const {orderId,orderStatus} = req.body;
    let updated = await Order.findByIdAndUpdate(orderId,{orderStatus},{new:true}).exec();
    res.json(updated);
}
export const getSellerProducts = async(req,res)=>{
    const {_id}= req.body;
    console.log(_id);
    let getSellerProduct = await Sellerproduct.find(
        { postedBy: { $nin: [_id]} },
    ).populate('postedBy').populate('category').exec();
    console.log("got the seller product",getSellerProduct);
    res.json(getSellerProduct);
}
export const changeSellerProductStatus=async(req,res)=>{
    const {productId,status}= req.body;
    console.log("Changes made --->")
    const sellerStatus=await Sellerproduct.findByIdAndUpdate(productId,{verified:status},{new:true}).exec();
     const seller = await Sellerproduct.find({_id:productId}).exec();
     console.log("seller is",seller[0])
     if(status==='no')
     {
        product.findByIdAndDelete(productId, (err, doc) => {
            if (err) {
                console.error("Error:", err);
                // Handle error
                return;
            }
            if (doc) {
                console.log("Document deleted:", doc);
                // Document was found and deleted
            } else {
                console.log("Document not found");
                // Document with the given id does not exist
            }
        });
     }
   else{
    product.findOne({ _id:productId }, (err, existingProduct) => {
        if (err) {
            console.error("Error:", err);
            // Handle error
            return;
        }
    
        if (existingProduct) {
            console.log("Product already exists:", existingProduct);
            // Product already exists, do something if needed
        } else {
            // Product does not exist, create and save a new document
            const {_id,title,slug,description,price,category,subs,quantity,sold,images,shipping,color,verified,postedBy,ratings} = seller[0];
            // const newProduct = new product(_id,title,slug,description,price,category,subs,quantity,sold,images,shipping,color,verified,postedBy,ratings);
            // newProduct.save((err, savedProduct) => {
            //     if (err) {
            //         console.error("Error:", err);
            //         // Handle error
            //     } else {
            //         console.log("New product saved successfully:", savedProduct);
            //         // New product saved successfully
            //     }
            (new product({_id,title,slug,description,price,category,subs,quantity,sold,images,shipping,color,verified,postedBy,ratings
            
               }).save()).then((res)=>console.log("successfully done")).catch((err)=>console.log(err));
            
        
           
           
            
        }
    });    
   }
    
   res.json(sellerStatus)
}