import axios from 'axios';
export const createProduct =async(product,authtoken,_id)=>
    await axios.post(`http://localhost:8000/api/product`,{product,_id},{
        headers:{
            authorization:authtoken,
        },
});
export const getProductsByCount =async(count)=>
    await axios.get(`http://localhost:8000/api/products/${count}`)

    export const removeProduct =async(slug,authtoken)=>
    await axios.delete(`http://localhost:8000/api/product/${slug}`,{
        headers:{
            authorization:authtoken,
        },
    })

export const getProduct =async(slug)=>
    await axios.get(`http://localhost:8000/api/product/${slug}`);

export const updateProduct =async(slug,product,authtoken)=>
   await axios.put(`http://localhost:8000/api/product/${slug}`,product,{
    headers:{
        authorization:authtoken,
    },
   })
   export const getProducts =async(sort,order,page)=>
   await axios.post(`http://localhost:8000/api/products`,{sort,order,page});

export const getProductsCount = async(slug)=>
   await axios.get(`http://localhost:8000/api/products/total`)
export const productStar = async(productId,star,authtoken)=>
    await axios.put(`http://localhost:8000/api/product/star/${productId}`,{star},{headers:{
        authorization:authtoken,
    }})

export const getRelated = async(productId)=>
    await axios.get(`http://localhost:8000/api/product/related/${productId}`)
export const getRelatedProduct =async(productId)=>
    await axios.get(`http://localhost:8000/api/product/related/${productId}`);

export const fetchProductByFilter = async(arg)=>
await axios.post(`http://localhost:8000/api/search/filters`,arg)