import React,{useState,useEffect} from 'react';
import { getProduct ,productStar} from '../functions/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import {getRelated} from '../functions/product'
import ProductCard from '../components/cards/ProductCard';
const Product = () => {
    const {slug}=useParams();
    const [product,setProduct] =useState({});
    const [star,setStar]=useState(0);
    const [related ,setRelated] =useState("");
    //redux
    const {user} =useSelector((state)=>({...state}));
    useEffect(()=>{
       loadSingleProduct()
    },[slug]);

    useEffect(()=>{
      let existingRatingObject;
      if(product.ratings && user)
      {
       existingRatingObject = product.ratings.find((ele)=>ele.postedBy.toString() === user._id.toString());
      }
      existingRatingObject && setStar(existingRatingObject.star)  //current user's star
    })
    const loadSingleProduct=()=>{
    getProduct(slug).then((res)=>
    {setProduct(res.data);
      //get the related product
      getRelated(res.data._id).then(res=>setRelated(res.data));
    });
    }

  

    const onStartClick=(newRating,name)=>{
      setStar(newRating);
      productStar(name,newRating,user.token)
      .then((res)=>{
        console.table("rating Clicked",res.data);
        loadSingleProduct(); //if you want to show reloading in real time
      })
     
    }

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct  product={product} onStartClick={onStartClick}
        star={star}/>
      </div>
      <div className='row p-5'>
        <div className='col text-center pt-5 pb-5'>
           <hr/>
           <h1>Related Products</h1>
           <hr/>
        </div>
      </div>
      <div className='row pb-5'>
      {related.length ? related.map((r)=>(<div key={r._id} className='col-md-4'><ProductCard  product={r}/></div>)):<div className='text-center'>{"No products found"}</div>
      } 
      </div>
    </div>
  )
}

export default Product;

