import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {toast } from 'react-toastify';
import StripeCheckout from '../components/StripeCheckout'
import '../stripe.css'
//load stripe outside of component to avoid reacreating stripe object on every render
const promise=loadStripe('pk_test_51P2QyvSHl6SW5TEO6yKdGCVZlRfCFa6gIRLqBSOYK3NJY4ul4ySAXhiRpgTV7qNRnbICXL2LAMUVzXmyWdCgqZiQ00aBIdWz5D').then(toast.success('successfully loaded stripe')).catch(err=>{toast.success("not able to load stripe",err);console.log(err)});
const Payment = ()=>{
   return(
    <div className="container p-5 text-center">
        <Elements stripe={promise}>
            <h4>Complete your purchase</h4>
        <div className="col-md-8 offset-md-2">
        <StripeCheckout/>
        </div>
        </Elements>
    </div>
   )
}
export default Payment;