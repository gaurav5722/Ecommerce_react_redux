import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const LoadingToRedirect =()=>{
    console.log("entered loading")
    const [count,setCount]=useState(5);
    let navigate=useNavigate();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((count)=> --count);
        },1000);
        //redirect once count is equal to 0
        count ===0 && navigate("/home");
        //cleanup
        return()=>clearInterval(interval);
    },[count]);
    return (<div className='container p-5 text-center'>
               {console.log("hello")}
               <p>Redirecting you in {count} seconds</p>
    </div>)
}
export default LoadingToRedirect;