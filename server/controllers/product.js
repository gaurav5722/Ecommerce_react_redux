import { product } from "../models/product.js";
import slugify from 'slugify';
import { User } from "../models/user.js";

export const create=async(req,res)=>{
    try {
        console.log(req.body.product)
        req.body.product.slug=slugify(req.body.product.title);
        console.log("user id is ",req.body._id)
        req.body.product.postedBy=req.body._id;
        const newProduct=await new product(req.body.product).save();
        res.json(newProduct);
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message,});
    }
}
export const listAll = async(req,res)=>{
    try{
     let products =await product.find({}).limit(parseInt(req.params.count)).populate('category').populate('subs').sort([['createdAt','desc']]).exec();
     res.json(products);
    }catch(err){
        console.log(err)
     res.status(400).json(err);
    }
}
export const remove =async(req,res)=>{
    try{
       const deleted = await product.findOneAndDelete({slug:req.params.slug}).exec();
       console.log(deleted)
       res.json(deleted);
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json('Product delete failed')
    }
}
export const read =async(req,res)=>{
    const singleProduct =await product.findOne({slug:req.params.slug}).populate('category').populate('subs').populate('postedBy').exec();
    res.json(singleProduct);
}
export const update = async(req,res)=>{
    try {
       if(req.body.title){
        req.body.slug = slugify(req.body.title);
       }
       const updated = await product.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec();
       res.json(updated)

    } catch (error) {
        console.log("Product Update Error",error);
        return res.status(400).send('Product update failed');
    }
}
//Without Paggination
// export const list = async(req,res)=>{
//     try {
//         const {sort,order,limit} =req.body;
//         const products = await product.find({}).populate('category')
//         .populate('subs')
//         .sort([[sort,order]])
//         .limit(limit)
//         .exec();
//         res.json(products)
//     } catch (error) {
//         console.log(error)
//     }
// }
export const productsCount = async(req,res)=>{
    try{
    let total = await product.find({}).estimatedDocumentCount().exec();
    //we get the total amount of product counts
    res.json(total);
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
}
 export const list = async (req, res) => {
    console.table(req.body);
    try {
      // createdAt/updatedAt, desc/asc, 3
      const { sort, order, page } = req.body;
      const currentPage = page || 1;
      const perPage = 3; // 3
  
      const products = await product.find({})
        .skip((currentPage - 1) * perPage)
        .populate("category")
        .populate("subs")
        .sort([[sort, order]])
        .limit(perPage)
        .exec();
  
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  };
  
export const productStar=async(req,res)=>{
 const products = await product.findById(req.params.productId).exec();
 console.log(products,"--->products")
 const user= await User.findOne({email:req.user.email}).exec();

//who is updating
//check if currently logged in user have already added rating to this product?
 const {star} = req.body;
 let existingRatingObject = products.ratings.find((ele)=>ele.postedBy.toString() === user._id.toString());
 if(existingRatingObject === undefined)
 {
    let ratingAdded = await product.findByIdAndUpdate(products._id,{
        $push:{ratings:{star,postedBy:user._id}},
    },{new:true}).exec();
    console.log("rating Added",ratingAdded);
    res.json(ratingAdded)
 }
 else{
    const ratingUpdated = await product.updateOne(
       {ratings:{$elemMatch:existingRatingObject},},{$set:{"ratings.$.star":star}},{new:true}).exec();
        console.log(ratingUpdated);
        res.json(ratingUpdated)
    }
}
export const listRelated = async(req,res)=>{
    const products = await product.findById(req.params.productId).exec();
    const related = await product.find({
        _id:{$ne:products._id},
        category:products.category,
    }).limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec();
    res.json(related);
}
//search /filter
const handleQuery = async(req,res,query)=>{
    const products = await product.find({$text:{$search:query}}).populate('category','_id name').populate('subs','_id name').populate('postedBy',"_id name").exec();
    res.json(products)
}
const handlePrice = async(req,res,price)=>{
    try {
        let products = await product.find({price:{$gte:price[0],$lte:price[1]},}).populate('category','_id name')
        .populate('subs','_id name')
        .populate('postedBy','_id name')
        .exec();
        res.json(products)
    } catch (error) {
        console.log("error for price",error)
        res.json(error)
    }
}
const handleStar = async(req,res,stars)=>{
   await product.aggregate([
        {
            $project:{
                document:"$$ROOT",
                floorAverage:{
                    $floor:{$avg:"$ratings.star"}
                },
                // title:"$title",
                // description:"$description",
                // averageRating:"$"
            },
        },{$match:{floorAverage:stars}}
    ]).limit(12)
    .exec((err,aggregates)=>{
        if(err) console.log('AGGREGATE ERROR',err);  
             product.find({_id:aggregates})
            .populate('category','_id name')
            .populate('subs','_id name')
            .populate('postedBy','_id name')
            .exec((err,products)=>{
                if(err) console.log("PRODUCT AGGREGATES ERROR",err);
                res.json(products)
            });
      
    });
};
const handleSub= async(req,res,sub)=>{
    const products = await product.find({subs:sub})
    .populate('category','_id name')
    .populate('subs','_id name')
    .populate('postedBy','_id name')
    .exec();
    res.json(products)
}
const handleCategory =async(req,res,category)=>{
    try {
        let products = await product.find({category})
        .populate('category','_id name')
        .populate('subs','_id name')
        .populate('postedBy','_id name')
        .exec();
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}
const handleShipping =async(req,res,shipping)=>{
     const products = await product.find({shipping})
     .populate('category','_id name')
     .populate('subs','_id name')
     .populate('postedBy','_id name')
     .exec();
     res.json(products);
}
const handleColor=async(req,res,color)=>{
    const products = await product.find({color})
    .populate('category','_id name')
    .populate('subs','_id name')
    .populate('postedBy','_id name')
    .exec();
    res.json(products);
}
const handleBrand= async(req,res,brand)=>{
    const products = await product.find({brand})
     .populate('category','_id name')
     .populate('subs','_id name')
     .populate('postedBy','_id name')
     .exec();
     res.json(products);

}
export const searchFilters = async(req,res)=>{
const {query,price,category,stars,sub,shipping,color,brand} =req.body;
if(query){
    console.log('query',query);
    await handleQuery(req,res,query);
};
//price [20,200]
if(price !== undefined)
{
  console.log('price--->',price);
  await handlePrice(req,res,price);
}
if(category)
{
    console.log("category--->",category);
    await handleCategory(req,res,category);
}
if(stars)
{
    console.log("stars--->",stars);
    await handleStar(req,res,stars);
}
if(sub)
{
    console.log("sub---->",sub);
    await handleSub(req,res,sub);
}
if(shipping)
{
    console.log('shipping--->',shipping);
    await handleShipping(req,res,shipping);
}
if(color)
{
    console.log('color--->',color);
    await handleColor(req,res,color);
}
if(brand)
{
    console.log('brand--->',brand);
    await handleBrand(req,res,brand)
}
};
