import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'; 
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout.js';
import { userCart } from '../functions/user.js';
import {toast} from 'react-toastify';
const Cart=()=>{
    const navigate= useNavigate();
    const {user,cart} = useSelector((state)=>({...state}));
    const dispatch = useDispatch();
     const getTotal=()=>{
        return(
            cart.reduce((currentValue,nextValue)=>{
                return (currentValue+nextValue.count * nextValue.price)
            },0)
        )
     }
     const saveOrderToDb=()=>{ 
        userCart(cart,user.token).then(res=>{console.log("CART POST RESPONSE",res)
        if(res.data.ok){
            toast.success("successfully saved cart");
            navigate('/checkout');
        }}).catch((err)=>{console.log("cart save error",err);
    toast.error("unabled to save  due to ",err)})
        } 
        const saveCashOrderToDb=()=>{ 
            dispatch({
                type:'COD',
                payload:true,
            })
            userCart(cart,user.token).then(res=>{console.log("CART POST RESPONSE",res)
            if(res.data.ok){
                toast.success("successfully saved cart");
                navigate('/checkout');
            }}).catch((err)=>{console.log("cart save error",err);
        toast.error("unabled to save  due to ",err)})
            } 
     //current value is first 0 
    

     const showCartItems =()=>(
        <table className='table table-bordered'>
            <thead className='thead-light'>
                <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Price</th>
                    <th scope='col'></th>
                   
                    <th scope='col'>Count</th>
                    <th scope='col'>Shipping</th>
                    <th scope='col'>Remove</th>
                </tr>
            </thead>
            {cart.map((p)=>(
                <ProductCartInCheckout key={p._id} p={p}/>
            ))}
        </table>
     )
    return(
     <div className='container-fluid pt-2'>
            <div className='row'>
                <div className='col-md-8'>
                    <h4>Cart/{cart.length} Product</h4>
                    {!cart.length ?(<h4>No products in cart. <Link to= '/shop'>Continue Shopping
                    </Link></h4>):(showCartItems())}
                </div>
                <div className='col-md-4'>
                   <h4>Order Summary</h4>
                   <hr/>
                   <p>Products</p>
                   {cart.map((c,i)=>(<div key={i}>
                    <p>{c.title} x {c.quantity} = ${c.price*c.count}</p>
                   </div>))}
                   <hr/>
                   Total :<b>₹{getTotal()}</b>
                   <hr/>
                   {user ? (<><button onClick={saveOrderToDb}className='btn btn-sm btn-primary mt-2'
                   disabled={!cart.length}>Procced to Checkout</button>
                   <button onClick={saveCashOrderToDb}className='btn btn-sm btn-warning mt-2'
                   disabled={!cart.length}>Pay Cash On Delivery</button></>):(<button className='btn btn-sm btn-primary mt-2'>
                    <Link to={{
                    pathname:"/login",
                    state:{from:"cart"}
                   }}>Login to Checkout
                   </Link>
                   </button>)}
                </div>
            </div>
        </div>)
}
export default Cart;

//166