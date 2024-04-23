import React from 'react';


const ShowPaymentInfo=({order,showStatus=true})=>{
    return(
    <div>
        <p><span>OrderId:{order.paymentIntent.id}</span>{" / "}
        <span>Amount:{(order.paymentIntent.amount/=100).toLocaleString('inr',{style:'currency',
    currency:'INR'})}</span>{" / "}
    <span>Currency:{order.paymentIntent.currency.toUpperCase()}</span>
    {" / "}
    <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
    </p>
    <span>Payment:{order.paymentIntent.status.toUpperCase}</span>
    {" / "}
    <span>Orderd on :{new Date(order.paymentIntent.created *1000).toLocaleString()}</span>
    {" / "}
    <br/>
    {showStatus && (<span className='badge bg-primary text-white'>OrderStatus:{order.orderStatus}</span> )}
    
    </div>)

}
export default ShowPaymentInfo;