import React ,{useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckEmail } from '../../functions/auth';


const ForgotPassword=({history})=>{
 const [email,setEmail]=useState("");
 const [loading,setLoading]=useState(false);
 const { user } = useSelector((state) => ({ ...state }));
 const navigate= useNavigate();
 useEffect(()=>{
  if(user && user.token) history.push('/');
 },[user])
 const handleSubmit =async(e)=>{
e.preventDefault();
setLoading(true)
const config={
    url:'http://localhost:3000/login',
    handleCodeInApp:true,
  }
 
  try{
  CheckEmail(email).then((res)=>{
    if(res.data==="user does not exist")
    {
      toast.error("The email is not registered");
      navigate("/register");
    }
    else{
      toast.success("successfully found email");
       auth.sendPasswordResetEmail(email,config).then(()=>{setEmail('')
setLoading(false)
toast.success('Check your email for password reset link')}).catch((err)=>{setLoading(false) 
console.log(err.message+ " in Forgot Password")});
    }
  })
  
  }
  catch(err){console.log(err)
    toast.error("user does not exist so first register");
    setEmail('')
    navigate("/register")
  }
      
  // LoginUser(idTokenResult.token).then(res=>{
  //   if(res==="user does not exist")
  //   {
  //     toast .error("user does not exist first register");
  //     navigate("/register")
  //   }
  //   else{
  //     toast.success("user exist in database")
  //   }
  // }).catch(err=>{
  //   console.log(err);
  //   toast.err(err)
  // })

 }
 return(
    <div className='container col-md-6 offset-md-3 p-5'>
        {loading?(<h4 className='text-danger'>Loading</h4>):(<h4>Forgot Password</h4>)}
        <form onSubmit={handleSubmit}>
              <input type='email' 
              placeholder='enter your email'
              className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}
              autoFocus/>
              <br/>
              <button className='btn btn-raised' disabled={!email}>Submit</button>
        </form>
    </div>
 )
}
export default ForgotPassword;
