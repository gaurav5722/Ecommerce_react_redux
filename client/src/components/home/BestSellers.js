import React,{useEffect,useState} from 'react';
import {getProductsCount,getProducts} from '../../functions/product.js'
import ProductCard from '../cards/ProductCard.js';

import LoadingCard from '../cards/LoadingCard.js';
import { Pagination } from 'antd';

const BestSellers = ()=>{
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        loadAllProducts();
    },[page])

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
      }, []);
    

    const loadAllProducts=()=>{
        setLoading(true);
        getProducts('sold','desc',page).then(res=>{console.log(res.data);
            setProducts(res.data);
        setLoading(false)})
    }
    return (
        <div>
            <div className='container'>
                {loading ? (<LoadingCard count={3}/>):(<div className='row'>
                    {products.map((product)=>(
                    <div key={product._id} className='col-md-4'>
                    <ProductCard product={product}/>
                    </div>
                    ))}    
                </div>)}
            </div>
            <div className="d-flex align-items-center justify-content-center">
        {/* <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          /> 
          
        </nav> */}
        {products && (page)< (productsCount/3) && (
                <button
                  className="m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Next Page 
                    </>
                  )}
                   </button>
              )}
              {products && page >1 && (
                <button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page - 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Previous Page 
                    </>
                  )}
                   </button>
              )}
      </div>
            
        </div>
    )
}
export default BestSellers;