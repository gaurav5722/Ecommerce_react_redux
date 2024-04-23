   import React ,{useState,useEffect} from 'react'
   import AdminNav from '../../../components/nav/AdminNav';
   import {toast} from 'react-toastify';
   import slugify from 'slugify';
   import {  useSelector } from 'react-redux';
   import {getCategory,updateCategory} from '../../../functions/category.js';
   import { useParams,useNavigate } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm.js';
   function CategoryUpdate() {
   const [loading,setLoading]=useState(false);
   const [name,setName]=useState("");
   const {user}=useSelector(state=>({...state}));
   const navigate=useNavigate();
   let {slug} =useParams();
   useEffect(()=>{
      loadCategory();
   },[])
   
   const loadCategory = ()=> getCategory(slug).then(c=>setName(c.data.name)).catch(error=>console.log(error));

   const handleSubmit=(e)=>{

      e.preventDefault();
      setLoading(true);
      updateCategory(slug,name,user.token).then(res=>{console.log(res.data.name);setLoading(false);setName("");toast.success(`${res.data.name} is Updated`)
   //   loadCategories()
   navigate("/current-admin/category");
   }).catch(err=>{setLoading(false) ;
      console.log(err)
      toast.error(err.response.data)})
      console.log(name)
   }  
   return (
      <div className='container-fluid'>
         <div className='row'>
               <div className='col-md-2'>
                  <AdminNav/>
               </div>
               <div className='col'>
                  {loading?<h4>Loading...</h4> :<h4>UpdateCategory</h4>}
                   <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                  <hr/>
                  
               </div>
         </div>
      </div>
   );
   }

   export default CategoryUpdate;