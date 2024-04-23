import React,{useEffect,useState} from 'react'

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SellerNav from '../../components/nav/SellerNav';
import { getSellerProductsByCount, removeSellerProduct } from '../../functions/Seller';
import AdminProductCard from '../../components/cards/AdminProductCard';

function SellerAllProducts() {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false);
  const {user} = useSelector((state)=>({...state}));
  useEffect(()=>{
    loadAllProducts();
  },[]);
  const loadAllProducts=()=>{
    setLoading(true)
    console.log("user id is --->",user._id);
    getSellerProductsByCount(100,user._id).then((res)=>{setProducts(res.data);
    setLoading(false)}).catch((err)=>{console.log(err);
    setLoading(false)});
  }

  const handleRemove= (slug)=>{
    let answer=window.confirm('Delete?');
    if(answer){
        // console.log('send delete request',slug)
        removeSellerProduct(slug,user.token).then(res=>{

         loadAllProducts();
         toast.success(`${res.data.title} is deleted`)
        }).catch(err=>{toast.error('cannot delete the product');
    console.log(err)})
    }
  }
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                <SellerNav/>
            </div>
            <div className='col-md-10'>
              
              <div className='col'>
              {loading?(<h4 className='text-danger'>Loading...</h4>):(<h4>All Products</h4>)}
                <div className='row'>
                {products.map((product)=>(
               <div className='col-md-4 pb-3' key={product._id} >
                 <AdminProductCard product={product} handleRemove={handleRemove}
                 seller={"yes"}/>
                </div>
              ))}
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default SellerAllProducts
