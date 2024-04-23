import axios from 'axios';

export const userCart = async(cart,authtoken)=> await axios.post(`http://localhost:8000/api/user/cart`,{cart},{ 
    headers:{
        authorization: authtoken
    }
});
export const getUserCart = async(authtoken)=> await axios.get(`http://localhost:8000/api/user/cart`,{ 
    headers:{
        authorization: authtoken
    }
});

export const emptyUserCart = async(authtoken)=>
    await axios.delete(`http://localhost:8000/api/user/cart`,{
        headers:{
            authorization:authtoken
        }
    });
export const saveUserAddress =async(authtoken,address)=>{
 return(
    await axios.post(`http://localhost:8000/api/user/address`,{address},{
        headers:{
            authorization:authtoken,
        }
    })
 )
}
export const ApplyCoupon  =async(authtoken,coupon)=>{
    return(
        await axios.post(`http://localhost:8000/api/user/cart/coupon`,{coupon},{
            headers:{
                authorization:authtoken,
            }
        })
     )
} 
export const createOrder = async(stripeResponse,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/user/order`,{stripeResponse},{
            headers:{
                authorization:authtoken,
            }
        })
    )
}
export const getUserOrders = async(authtoken)=>{
    return(
        await axios.get(`http://localhost:8000/api/user/orders`,{
            headers:{
                authorization:authtoken,
            },
        })
    )
}
export const getWishlist = async(authtoken)=>{
    return(
        await axios.get(`http://localhost:8000/api/user/wishlist`,{
            headers:{
                authorization:authtoken,
            },
        })
    )
}
export const removeWhislist = async(productId,authtoken)=>{
    return(
        await axios.put(`http://localhost:8000/api/user/wishlist/${productId}`,{},{
            headers:{
                authorization:authtoken,
            },
        })
    )
}
export const  addToWishlist= async(productId,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/user/wishlist`,{productId},{
            headers:{
                authorization:authtoken,
            },
        })
    )
}
export const createCashOrderForUser = async(authtoken,COD,coupon)=>{
    return(
        await axios.post(`http://localhost:8000/api/user/cash-order`,{COD,couponApplied:coupon},{
            headers:{
                authorization:authtoken,
            }
        })
    )
}