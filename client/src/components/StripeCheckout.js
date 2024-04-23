import React,{useEffect,useState} from 'react';
import { CardElement,useStripe, useElements} from '@stripe/react-stripe-js';
import { useSelector,useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {Card} from 'antd';
import { DollarOutlined  ,CheckOutlined} from '@ant-design/icons';
import laptop from '../images/laptop.jpeg';
import { createOrder, emptyUserCart } from '../functions/user';
const StripeCheckout =()=>{
 const navigate=useNavigate();
 const dispatch= useDispatch();
 const {user,coupon}=useSelector((state)=>({...state}));
 const [succeeded,setSucceeded] = useState(false);
 const [err,setErr]=useState(null);
 const [processing,setProcessing]=useState('');
 const [disabled,setDisabled]=useState(true);
 const [clientSecret,setClientScret] = useState('');
 const [cartTotal,setCartTotal]=useState(0);
 const [totalAfterDiscount,setToatalAfterDiscount] =useState(0);
 const [payable,setPayable]=useState(0);
 const stripe =useStripe();
 const elements  = useElements();
 useEffect(()=>{
    createPaymentIntent(user.token,coupon).then((res)=>{console.log('create payment intent',res.data);
    toast.success('got the client secret');
setClientScret(res.data.clientSecret)
//additional response receive on successfull payment
setCartTotal(res.data.cartTotal);
setToatalAfterDiscount(res.data.totalAfterDiscount);
setPayable(res.data.payable);});

 },[]);
 const handleSubmit =async(e)=>{
    //
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
         card:elements.getElement(CardElement),
         billing_details:{
            name:e.target.name.value,
         }
      }
    });
    console.log("payload -->",payload)
    if(payload.error)
    {
     setErr(`Payment Failed ${payload.error.message}`);
     setProcessing(false)
    }else{

      //here you get the result after the successfull payment
      //create order and save in database for admin to process
      createOrder(payload,user.token).then((res)=>{
         if(res.data.ok)
         {
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
            emptyUserCart(user.token).then((res)=>{toast.success('empty the user cart')}).catch((err)=>{toast.error('some error to clear user item',err)})
         }
      })
      //empty user cart from redux store and local store
      console.log(JSON.stringify(payload,null,4));
      setErr(null);
      setSucceeded(true)
      setProcessing(false);
    }


 }
 const handleChange =async(e)=>{
    //listen for changes in the card element
    //and display the error as the customer types their card details
    setDisabled(e.empty) //disable pay button if error
     setErr(e.error?e.error.message:"");//show error message

 }
 const cartStyle = {
   style: {
     base: {
       color: "#32325d",
       fontFamily: "Arial, sans-serif",
       fontSmoothing: "antialiased",
       fontSize: "16px",
       "::placeholder": {
         color: "#32325d",
       },
     },
     invalid: {
       color: "#fa755a",
       iconColor: "#fa755a",
     },
   },
 };
 return(
    <>
    {!succeeded && (<div>{coupon && setToatalAfterDiscount !== undefined? (
      <p className='alert alert-success'>{`Total after discount:${totalAfterDiscount}`}</p>):(<p>No Coupon Applied</p>)}</div>)}
    
    <div className='text-center pb-5'>
      <Card 
        cover={<img src={laptop} alt={'image'} style={{objectFit:'cover',height:'200px',marginBottom:'-50px'}}/>}
        actions={[<><DollarOutlined className='text-info'/><br/>Total:${cartTotal}
        </>,<>
        <CheckOutlined className='text-info' /><br/>TotalPayable:
        ${(payable/100).toFixed(2)}</>]}
      />

    </div>
    <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
     <CardElement  id='card-element' options={cartStyle} onChange={handleChange}/>  
     <button className='stripe-button' disabled={processing ||disabled||succeeded}>
        <span id='button-text'>
            {processing?(<div className='spinner' id='spinner'>

            </div>):("PAY")}</span>
        </button>   
        <br/>
        <p className={succeeded?'result-message':'result-message hidden'}>PaymentSuccessfull,<Link to="/user/history">See it in your purchase history</Link></p>   
    </form>
    {err && <div className='card-error' role='alert'>{err}</div>}
    </>
 )


}
export default StripeCheckout;