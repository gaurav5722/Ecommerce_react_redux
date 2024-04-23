import {useState,useEffect} from 'react';
import axios from 'axios';
import Spinner from '../../pages/auth/Spinner';
import { useSelector} from "react-redux";
import {Outlet} from 'react-router-dom';//it allows to perform nexted routing
export default function SellerRoute(){
    const[ok,setOk]= useState(false);
    const {user}=useSelector((state)=>({...state}));
    let User="";
 useEffect(()=>{
    console.log(user)
    const authCheck= async()=>{
        console.log(user.token)
        const res= await axios.get('http://localhost:8000/api/seller',{
            headers:{
                "Authorization": user?.token
            },
        });
        console.log(res.data)
      
        console.log(res.data.role)
        User=res.data.user;
        if(res.data.role==="seller")
        {
            setOk(true);
        }
        else{
            setOk(false);
        }
    }
    if(user?.token) authCheck();//if token is there in auth;
 },[user?.token]);
 return ok? <Outlet/>:<Spinner />;
}