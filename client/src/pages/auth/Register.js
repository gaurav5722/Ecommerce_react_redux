import React ,{useState,useEffect} from 'react'
import {auth,googleAuthProvider} from '../../firebase'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const Register =({history})=>{
    const [email,setEmail] =useState("");
    const {user} = useSelector((state)=>({...state}));
    useEffect(()=>{
        if(user && user.token) history.push('/');
       },[user])
    const handleSubmit =async(e)=>{
      e.preventDefault();
     // console.log("Env->",process.env.REACT_APP_REGISTER_REDIRECT_URL)
     try{
      const config={
        url:'http://localhost:3000/register/complete',
        handleCodeInApp:true,
      }
      await auth.sendSignInLinkToEmail(email,config)
      toast.success(`Email is sent to ${email} .Click the link to complete your registration`);
       console.log("send successfully");
      //save the user in local storage
      window.localStorage.setItem('emailForRegistration',email);
    //   to clear the state
     }catch(error)
     {
        console.log(error)
     }
      setEmail("");
    }
    const registerForm =()=>{
        return(<form onSubmit={handleSubmit}>
            <input type="email"className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}placeholder='Your Email' autoFocus/>
            <button type='submit' className='btn btn-raised mt-3'>Register</button>
         </form>)

    }
    return (
        <div className="container p-5">
            <div className='row'>
                <div className='col-md-6 offset-md-3 '>
                    <h4>Register</h4>
                    
                    {registerForm()}
                </div>
            </div>
                
        </div>
    )
}
export default Register;