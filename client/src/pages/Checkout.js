import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getUserCart ,emptyUserCart ,saveUserAddress,ApplyCoupon,createCashOrderForUser} from '../functions/user';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CheckOut=()=>{
    const dispatch = useDispatch();
    const {user,coupon,COD} = useSelector((state)=>({...state}));
    const [products,setProducts]=useState([]);
    const [total,setTotal] =useState(0);
    const [address,setAddress]=useState("");
    const [addressSaved,setAddressSaved] =useState(false);
    const [Coupon,setCoupon] =useState('');
    const [totalAfterDiscount,setToatalAfterDiscount] = useState(0);
    const [discountError,setDiscountError]=useState("");
    const navigate =useNavigate();
    useEffect(()=>{
        console.log("hello going to get the user with cart value")
        getUserCart(user.token).then((res)=>{console.log('user cart res',JSON.stringify(res.data,null,4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);

    })
    },[])
    const emptyCart =()=>{
        if(typeof(window)!== 'undefined')
        {
            localStorage.removeItem('cart');//remove from local storage
            //remove from redux
            dispatch({
                type:'ADD_TO_CART',
                payload:[],
            });
            //remove from backend
          emptyUserCart(user.token).then((res)=>{
            setProducts([]);
            setTotal(0);
            setToatalAfterDiscount(0);
            setDiscountError('');
            setCoupon('')
            toast.success('Cart is empty . Continue Shopping')
          }).catch((err)=>{
            toast.error('error',err)
          })
        }
    }
    const saveAddressToDb =()=>{
      //
       saveUserAddress(user.token,address).then((res)=>{
        if(res.data.ok){
        console.log(res);
        setAddressSaved(true)
        toast.success("Added successfully");
        }
       }).catch((err)=>{console.log('error',err);toast.error(err)});
       

    }
    
    const showAddress=()=>{
     return( <>
      <ReactQuill  theme="snow" value={address} onChange={setAddress}/> 
      <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>Save</button>
      </>);
    }
    const showProductSummary = (products)=>(
      products.map((p,i)=>(
        <div key={i}>
            <p>{p.product.title} ({p.product.color}) *({p.count})={" "}{p.product.price *p.count}</p>

            </div>
      ))
    )
 const showApplyCoupon=()=>(
  <>
  <input type='text' className='form-control' 
  onChange={(e)=>{
    setCoupon(e.target.value);
  setDiscountError('')} }
  value={Coupon}/>
  <button className='btn btn-primary m-2' onClick={applyDiscountCoupon}>Apply</button>
  </>
 )
 const applyDiscountCoupon=()=>{
  console.log('send coupon to backend',Coupon);
  //applyCoupon
   ApplyCoupon(user.token,Coupon).then((res)=>{
    console.log('res on coupon applied',res.data);
    if(res.data)
    {
      setToatalAfterDiscount(res.data);
      //update redux coupon applied true/false
         dispatch({
          type:"COUPON_APPLIED",
          payload:true,
         })
    }
    if(res.data.err)
    {
      setDiscountError(res.data.err);
      //update redux coupon applied true/false
      dispatch({
        type:"COUPON_APPLIED",
        payload:false
      })
    }
   })
 }
 const createCashOrder=()=>{
createCashOrderForUser(user.token,COD,coupon).then(res=>{
  console.log("user cash order created",res);
  //empty cart from redux,local Storage,resetCod,dispatch Coupon
  if(res.data.ok)
  {
    //empty cod redux state

    dispatch({
      type:"COD",
      payload:false,
    })
     // empty cart from local storage
     if(typeof(window)!=='undefined')
     {
        localStorage.removeItem('cart');
     }
     //empty cart from redux
     dispatch({
        type:"ADD_TO_CART",
        payload:[]
     });
     //reset coupon to false
     dispatch({
        type:"COUPON_APPLIED",
        payload:false,
     })
     //empty cart from database
     emptyUserCart(user.token).then((res)=>{toast.success('empty the user cart')}).catch((err)=>{toast.error('some error to clear user item',err)});
     toast.success("redirecting to history of user");
     setTimeout(()=>{
      navigate('/user/history');
     },2000);
  }
  
})
 }
    
 return(
  <div className='container-fluid'>
 <div  className='row'>
    <div className='col-md-6'>
       <h4>Delivery Address</h4>
       <br/>
       <br/>
       {/* textarea */}
      {showAddress()}
       <hr/>
       <h4>Got Coupon ?</h4>
       <br/>
       {showApplyCoupon()}
       <br/>
       {discountError && <p className='bg-danger p-2'>{discountError}</p>}
    </div>
    <div className='col-md-6'>
      <h4>order summary</h4>
      <hr/>
      <p>Products {products.length}</p>
      <hr/>
      {showProductSummary(products)}
      <hr/>
      <p>Cart total : {total}</p>
      {totalAfterDiscount > 0 && (<p className='bg-success'>Discount Applied :Total Payable ${totalAfterDiscount}</p>) }
    </div>
     <div className='row'>
        <div className='col-md-6'>
            {COD ? (<button className='btn btn-primary' disabled={!addressSaved||!products.length} onClick={createCashOrder}>Place Order</button>):(<button className='btn btn-primary' disabled={!addressSaved||!products.length} onClick={()=>navigate('/user/payment')}>Place Order</button>)}
        </div>
        <div className='col-md-6'>
            <button onClick={emptyCart} disabled={!products.length} className='btn btn-primary'>Empty Cart</button>
        </div>
     </div></div>
 </div>)
}
export default CheckOut;