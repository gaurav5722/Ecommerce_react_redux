import React,{useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getAllSellerProduct,changeSellerStatus } from '../../../functions/Seller';
import {toast} from 'react-toastify'
 import {useSelector} from 'react-redux';
import ProductsVerify from './ProductsVerify.js';
const VerifySellerOrders = () => {
  const [products,setProducts]=useState([]);
  const {user} = useSelector((state)=>({...state}));
  useEffect(()=>{
    getAllSellerOrders();
  },[])
  const getAllSellerOrders=()=>{
    getAllSellerProduct(user._id,user.token).then((res)=>{setProducts(res.data)}).catch((err)=>{
    toast.error("error was",err)
  })
  }
  const handleStatusChange=(productId,status)=>{
     changeSellerStatus(productId,status,user.token).then((res)=>{
      console.log('response is',res.data);
      toast.success('status updated',res.data.verified);
      getAllSellerOrders();
     })
  }
  const showProducts=()=>(
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope = 'col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Color</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>shipping</th>
          <th scope='col'>ShippingAddress</th>
          <th scope='col'>SellerName</th>
          <th scope='col'>Approve/Not Approve</th>
        </tr>
      </thead>
      {products.map((p)=>(
        <ProductsVerify key={p._id} p={p} handleStatusChange={handleStatusChange}/>
      ))}
    </table>
   
  )
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'><AdminNav/></div>
         <div className='col-md-10'>
          verify seller orders
          {!products.length ? (<h4>No products Found to approve</h4>):(showProducts())}
          </div>
      </div>
    </div>
  )
}

export default VerifySellerOrders
