import React,{useEffect,useState} from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";
const CategoryHome =()=>{
    const {slug} =useParams();
    const [category,setCategory]=useState({});
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
useEffect(()=>{
    setLoading(true);
    getCategory(slug).then((res)=>{
        console.log(JSON.stringify(res.data.category,null,4));
        setCategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
    });
},[]);
return (<div className="container">
    <div className="row">
        <div className="col">
            {loading?(<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading...</h4>):(<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">{products.length}Products in  "{category.name}"Category</h4>)}
        </div>
    </div> 
            <div className="row">
             {products.map((p)=><div className="col-md-4" key={p._id}>
                <ProductCard product={p}/>
                </div>)}
            </div>
         </div>);     
   
}
export default CategoryHome;