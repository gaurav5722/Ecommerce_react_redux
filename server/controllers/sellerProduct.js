import slugify from 'slugify'
import { Sellerproduct } from '../models/SellerProduct.js';
export const createSellerProduct=async(req,res)=>{
    try {
        console.log(req.body);
        req.body.product.slug=slugify(req.body.product.title+req.body._id);
        const newProduct = await new Sellerproduct(req.body.product).save();
        res.json(newProduct)
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
}
export const  getSellerProductByCount= async(req,res)=>{
    try {
         const {_id} = req.body;
         let products= await Sellerproduct.find({
            postedBy:_id}).limit(parseInt(req.params.count)).populate('category')
            .populate('subs').sort([['createdAt','desc']]).populate('postedBy').exec();
             console.log(products)
            res.json(products)
         

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
export const deleteSellerProduct = async(req,res)=>{
    try {
        const deleted = await Sellerproduct.findOneAndDelete({slug:req.params.slug}).exec();
       console.log(deleted);
       res.json(deleted)
    } catch (error) {
        console.log(error)
        res.status(400).json("SellerProductDelete Failed")
    }
}
export const getSellerProduct = async(req,res)=>{
try {
    console.log("slug is",req.params.slug);
   const product = await Sellerproduct.findOne({slug:req.params.slug}).populate('category').populate('postedBy').exec();
   console.log("product of seller is",product)
   res.json(product)

} catch (error) {
    console.log(error);
    res.status(400).json("Seler Product cannot be updated")
}
}
export const updateSellerProduct = async(req,res)=>{
    try {
       console.log("i am from update seller product",req.params.slug);
       console.log("req.body is ",req.body)
       const updated = await Sellerproduct.findOneAndUpdate({slug:req.params.slug},req.body.product,{new:true}).exec();
       console.log(updated)
       res.json(updated)

    } catch (error) {
        console.log("Product Update Error",error);
        return res.status(400).send('Product update failed');
    }
}