import {Category }from '../models/category.js';
import slugify from 'slugify'
import { Sub } from '../models/sub.js';
import {product} from '../models/product.js'
export const create =async(req,res)=>{
//To create category
try{
     const {name} = req.body;
     const category = await new Category({name,slug:slugify(name)}).save();
     res.status(201).json(category)
}catch(err)
{
    console.log(err)
    res.status(400).send("create category failed")
}
}
export const list =async(req,res)=>
    //listing the category
    res.json(await Category.find({}).sort({createdAt: -1}).exec());

export const read=async(req,res)=>
{
   
   let category = await Category.findOne({slug:req.params.slug}).exec();
  const products =await product.find({category}).populate('category').populate('postedBy','_id name').exec();
   res.json({category,products});

}
export const update=async(req,res)=>{
    const {name} =req.body; 
    console.log(name)
    console.log(req.params.slug)
    try {
        const updated = await Category.findOneAndUpdate({slug:req.params.slug},{name,slug:slugify(name)},{new:true});
        console.log(updated)
        res.json(updated)
    } catch (error) {
        console.log(error)
        res.status(400).send("Create update failed")
    }
}
export const remove=async(req,res)=>{
  try{
     const deleted= await Category.findOneAndDelete({slug:req.params.slug});
        res.json({
            deleted
        })
  }catch(err){
     res.status(400).send('Category delete failed')
  }
}
export const getSubs =async(req,res)=>{
try{
const subs =await Sub.find({parent:req.params._id});
console.log(subs)
res.json(subs)
}catch(err){
res.status(400).json(err)
}
}