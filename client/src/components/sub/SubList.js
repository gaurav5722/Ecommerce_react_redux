import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {getSubs} from '../../functions/sub';

const SubList =()=>{
    const [subs,setSubs] =useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        getSubs().then((c)=>{setSubs(c.data);
            console.log('categories are--->',c.data)
        setLoading(false);});
    },[]);
   
    return(<div className='container'>
        <div className='row'>
            {loading?(<h4 className='text-center'>Loading...</h4>):(subs.map((s)=>(<div key={s._id}className='col btn btn-outlined-primary btn-lg btn-black btn-raised m-3'>
                <Link to={`/sub/${s.slug}`}> {s.name}</Link>
             
          </div>)))}
        </div>
    </div>)
}
export default SubList;