import {useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector} from "react-redux";
import {Outlet} from 'react-router-dom';//it allows to perform nexted routing
import Spinner from './Spinner';
export default function PrivateRoute(){
  
    const {user}=useSelector((state)=>({...state}));
    const[ok,setOk]= useState(false);
 useEffect(()=>{
    
    const authCheck= async()=>{
        
        if(user?.token)
        {
            setOk(true);
        }
        else{
            setOk(false);
        }
    }
    if(user?.token) authCheck();//if token is there in auth;
 },[user?.token]);
 return ok ? <Outlet/>:<Spinner />;
}