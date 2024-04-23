import React,{useEffect,useState} from "react";
import { getSub } from "../../functions/sub";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";
const SubHome =()=>{
    const {slug} =useParams();
    const [sub,setSub]=useState({});
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
useEffect(()=>{
    setLoading(true);
    getSub(slug).then((res)=>{
        console.log(JSON.stringify(res.data.sub,null,4));
        setSub(res.data.sub);
        setProducts(res.data.products);
        setLoading(false);
    });
},[]);
return (<div className="container">
    <div className="row">
        <div className="col">
            {loading?(<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading...</h4>):(<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">{products.length}Products in  "{sub.name}" SubCategory</h4>)}
        </div>
    </div> 
            <div className="row">
             {products.map((p)=><div className="col-md-4" key={p._id}>
                <ProductCard product={p}/>
                </div>)}
            </div>
         </div>);     
   
}
export default SubHome;