import React ,{useState,useEffect}from "react";
import { useNavigate,useLocation } from "react-router-dom";
const Spinner = ({path="home"}) => {
    const [count,setCount] = useState(5);
    const navigate= useNavigate();
    const location = useLocation();
    useEffect(()=>{
    const interval= setInterval(()=>{
        setCount((prevValue)=>--prevValue)
    },1000);
    count==0 && navigate(`/${path}`,{
        state:location.pathname
    });//state is used to store the location pathname in it that can be used in login 
    return ()=>clearInterval(interval);
    },[count,navigate,location,path]);

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <h1 className="text-center"> redirecting to you in {count} sec</h1>
        <div className="spinner-border" role="status">
          
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
