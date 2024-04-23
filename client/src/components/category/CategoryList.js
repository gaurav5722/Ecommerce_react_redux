import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {getCategories} from '../../functions/category';

const CategoryList =()=>{
    const [categories,setCategories] =useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        getCategories().then((c)=>{setCategories(c.data);
            console.log('categories are--->',c.data)
        setLoading(false);})
    },[]);
    // const showCategories =()=>{
    //     // console.log("i entered into showCategories",categories);
    //       categories.map((c)=>(<div key={c._id}className='btn btn-outlined-primary btn-lg btn-black btn-raised m-3'>
    //           {c.name}
    //       </div>));
    // }
    return(<div className='container'>
        <div className='row'>
            {loading?(<h4 className='text-center'>Loading...</h4>):(categories.map((c)=>(<div key={c._id}className='col btn btn-outlined-primary btn-lg btn-black btn-raised m-3'>
                <Link to={`/category/${c.slug}`}> {c.name}</Link>
             
          </div>)))}
        </div>
    </div>)
}
export default CategoryList;