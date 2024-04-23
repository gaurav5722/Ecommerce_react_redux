import React,{useState,useEffect}from 'react'
import SellerNav from '../../components/nav/SellerNav'
import {useSelector} from 'react-redux';
import {toast } from 'react-toastify'
import { currentUser } from '../../functions/auth';
import { createOrUpdateUser } from '../../functions/auth';
const SellerProfile = () => {
    const {user} = useSelector((state)=>({...state}));
    const [currentSeller,setCurrentSeller] = useState([]);
 useEffect(()=>{
 getCurrentUser();
    },[]);
    const getCurrentUser=async()=>{
    
            console.log("user token form the seller Profile is ",user.token)
             await currentUser(user.token).then((res)=>{console.log(res.data);
            toast.success("successfully got the current user");
        setCurrentSeller(res.data)})
            .catch((error)=>{console.log(error);toast.error("The error was",error)})
           
       

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("some information changed")
        console.log("updataed name is",currentSeller.name);
        console.log("updated email is",currentSeller.email);
        console.log("updated address is ",currentSeller.address);
        // await currentUser(user.token).then((res)=>{console.log(res.data)})
        createOrUpdateUser(user.token,"yes",currentSeller.address).then((res)=>{console.log("user updated successfully");
        getCurrentUser();
    toast.success("updated the user succesfully")}).catch((err)=>{
        console.log("Error faced is",err);
        toast.error("Error faced")
    })
    }
    const handleChange=(e)=>{
        setCurrentSeller({...currentSeller,[e.target.name]:e.target.value})
    }

  return (
    <div className='container-fluid'>
        <div className='row'>
           <div className='col-md-2'>
            <SellerNav/>
           </div>
           <div className='col-md-10 text-center'>
            Seller Profile
            <form onSubmit={handleSubmit} className='form-group mt-2'>
                <lable for="email">Email</lable>
               <input type='email' id='email' value={currentSeller.email} className='form-control mt-2' disabled onChange={handleChange} name='email'/>
               <label for="name">Name</label>
                <input type='text' value={currentSeller.name} 
                className='form-control mt-2' onChange={handleChange} name='name'/>
                <label for="address">Address</label>
                <input type='text'className='form-control mt-2' value={currentSeller.address} onChange={handleChange}
                name='address'/>
                <input type="submit" value="Update profile" />
            </form>
           </div>
        </div>
      
    </div>
  )
}

export default SellerProfile
