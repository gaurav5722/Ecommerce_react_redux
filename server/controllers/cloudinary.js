import cloudinary from 'cloudinary';
//config
cloudinary.config({
    // cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    // api_key:process.env.CLOUDINARY_API_KEY,
    // api_secret:process.env.CLOUDINARY_API_SECRET
    cloud_name: 'dsfiwlypf', 
    api_key: '695179281946721',
    api_secret: 'a3v5vrLZSjWIpC2oocwzTe0BP-g'
});

export const upload=async(req,res)=>{
    console.log("going  to upload image")
   
    try{
   let result=await cloudinary.uploader.upload(req.body.image,{public_id:`${Date.now()}`,resource_type:'auto'});
   console.log("reached to uploading the image")
   res.json({
    public_id:result.public_id,
    url:result.secure_url, 
   });
}catch(err){console.log(err)}
}
export const remove =(req,res)=>{
    let image_id=req.body.public_id;
    cloudinary.uploader.destroy(image_id,(err,r)=>{
        if(err){return res.send({success:false,err})}
        res.status(200).send("ok")
    });
}