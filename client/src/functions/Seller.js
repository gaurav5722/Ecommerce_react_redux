import axios from 'axios';
export const createSellerProduct =async(product,authtoken,_id)=>
    await axios.post(`http://localhost:8000/api/sellerProduct`,{product,_id},{
        headers:{
            authorization:authtoken,
        },
});
export const getSellerProductsByCount= async(count,_id)=>(
    await axios.post(`http://localhost:8000/api/sellerproducts/${count}`,{_id})
)
export const removeSellerProduct =async(slug,authtoken)=>
    await axios.delete(`http://localhost:8000/api/sellerproduct/${slug}`,{
        headers:{
            authorization:authtoken,
        },
    })
export const getSellerProduct =async(slug)=>
    await axios.get(`http://localhost:8000/api/sellerproduct/${slug}`);
    export const updateSellerProduct =async(slug,product,authtoken)=>
    await axios.put(`http://localhost:8000/api/sellerproduct/${slug}`,{slug,product},{
     headers:{
         authorization:authtoken,
     },
    })
    export const getAllSellerProduct= async(_id,authtoken)=>(
        await axios.post(`http://localhost:8000/api/admin/sellerproducts`,{_id},{
            headers:{
                authorization:authtoken,
            },
        })
    )
    export const changeSellerStatus = async(productId,status,authtoken)=>
    await axios.put(`http://localhost:8000/api/admin/seller/order-status`,{productId,status},{
        headers:{
            authorization:authtoken,
        }
    })
