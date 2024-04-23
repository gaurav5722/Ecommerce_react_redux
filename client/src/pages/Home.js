import React from 'react';
import {getProductsByCount,getProducts} from '../functions/product.js'
import ProductCard from '../components/cards/ProductCard.js';
import Jumbotron from '../components/cards/Jumbotron.js';
import LoadingCard from '../components/cards/LoadingCard.js';
import NewArrivals from '../components/home/NewArrivals.js';
import BestSellers from '../components/home/BestSellers.js';
import CategoryList from '../components/category/CategoryList.js';
import SubList from '../components/sub/SubList.js';
const Home = ()=>{
    // const [products,setProducts] = useState([]);
    // const [loading,setLoading] = useState(false);

    return (
        <div>
        <div className='jumbotron text-center text-danger h1 font-weight-bold'>
            {/* jumbotron is the bootstrap classname that gives the apperance of very nice */}
            {/* {loading?<h4>Loading...</h4>:<h4>All Products</h4>} */}
            <Jumbotron texting={['Latest Products','New Arrivals','Best Sellers']}/>
        </div>
        <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>New Arrivals</h4>
       
            <NewArrivals />
            <br/>
            <br/>
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Best Sellers</h4>
            <BestSellers/>
            <br/>
            
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Categories</h4>
            <CategoryList/>
            <br/>
            
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Sub Categories</h4>
            <SubList/>
        </div>
    )
}
export default Home;