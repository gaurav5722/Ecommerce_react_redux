import { product } from '../models/product.js';
import {Sub }from '../models/sub.js';
import slugify from 'slugify'

export const create =async(req,res)=>{
//To create category
try{
     const {name,parent} = req.body;
     const sub = await new Sub({name,slug:slugify(name),parent}).save();
     res.status(201).json(sub)
}catch(err)
{
    console.log(err)
    res.status(400).send("create sub failed")
}
}
export const list =async(req,res)=>
    //listing the category
    res.json(await Sub.find({}).sort({createdAt: -1}).exec());

export const read=async(req,res)=>
{
   let sub = await Sub.findOne({slug:req.params.slug}).exec();
   const products = await product.find({subs:sub}).populate('category').exec();
   res.json({sub,products});

}
export const update=async(req,res)=>{
    const {name,parent} =req.body; 
    console.log(name)
    console.log(req.params.slug)
    try {
        const sub = await Sub.findOneAndUpdate({slug:req.params.slug},{name,parent,slug:slugify(name)},{new:true});
        console.log(sub)
        res.json(sub)
    } catch (error) {
        console.log(error)
        res.status(400).send("Sub Create update failed")
    }
}
export const remove=async(req,res)=>{
  try{
     const deleted= await Sub.findOneAndDelete({slug:req.params.slug});
        res.json({
            deleted
        })
  }catch(err){
     res.status(400).send(' Sub Category delete failed')
  }
}
