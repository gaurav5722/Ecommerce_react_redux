import React, { useEffect ,useState} from 'react';
import {Card,Tabs,Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import { HeartOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from '../../images/laptop.jpeg'
import ProductListItems from './ProductListItems';
import StarRating  from 'react-star-ratings';
import RatingModel from '../model/RatingModel';
import { showAverage } from '../../functions/rating';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../functions/user';
import {toast} from 'react-toastify';
import {useNavigate } from 'react-router-dom';

const {TabPane} =Tabs;
const {Meta} =Card;
//This is the children component of Product Page
 const SingleProduct =({product,onStartClick,star})=>{
   const [tooltip,setTooltip]=useState("Click to add");

  const navigate= useNavigate();
   const handleAddToCart=()=>{
      //create cart array
      let cart =[];
      if(typeof(window !== 'undefined'))
      {
        //if cart is in localStorage GET it
        if(localStorage.getItem('cart'))
        {
          cart = JSON.parse(localStorage.getItem('cart'));

        }
         //push new product to cart
         cart.push({
          ...product,
          count:1,
         });
         //remove duplicates
          let unique= _.uniqWith(cart,_.isEqual);
         //save to local Storage
         console.log('unique',unique);
         localStorage.setItem('cart',JSON.stringify(unique));
         //show tooltip
        setTooltip('Added');
        //Add to redux state
        dispatch({
          type:'ADD_TO_CART',
          payload:unique,
        });
        dispatch({
          type:'SET_VISIBLE',
          payload:true
        })
      }
   }
   const {user,cart}=useSelector((state)=>({...state}));
   const dispatch =useDispatch();
    const {title,images,description,_id} =product;

 const handleAddToWishList=(e)=>{
     e.preventDefault();
     addToWishlist(product._id,user.token).then(res=>{console.log(res.data);toast.success("Added To Wishlist");
     navigate('/user/wishlist');
    })
 }
  return(
    <>
    <div className='col-md-7'>
        {images && images.length ?<Carousel showArrows={true} autoPlay infiniteLoop>
        {images && images.map((i)=><img src={i.url} key={i.public_id}/>)}
       </Carousel>:<Card cover={<img src={laptop}className='p-2 mb-3 card-img'/>}></Card>}
       <Tabs type='card'>
        <TabPane tab="Description" key="1">
           {description && description}
        </TabPane>
        <TabPane tab="More" key="2">
           Call us on xxxx xxxx xxxx to learn more about this product.
        </TabPane>
       </Tabs>
    </div>
    <div className='col-md-5'>
     
    <h1 className='bg-info p-3'>{title}</h1>
       {product && product.ratings && product.ratings.length >0 ?showAverage(product):<div className='text-center'>{"No rating yet"}</div>}
        <Card  actions={[
           <a onClick={handleAddToCart}><ShoppingCartOutlined className='text-danger' /><br/>Add to Cart</a>,
            < a onClick={handleAddToWishList}><HeartOutlined className='text-info'/><br/>Add To WishList
            </a>,
    <RatingModel>
    <StarRating
     name={_id}
     numberOfStars={5}
     rating={star}
     changeRating={onStartClick}
   //   changeRating={(newRating,name)=>(console.log("newRating",newRating,"name",name))}
     isSelectable={true}
     starRatedColor='red'/>
     </RatingModel>
        ]}>
            {/* <Meta title={title} description={description}/> */}
         <ProductListItems product={product} />
        </Card>
    </div>
    </>
  )
}
export default SingleProduct;