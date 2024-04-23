import React ,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import {createCategory,getCategories,removeCategory} from '../../../functions/category.js';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm.js';
import LocalSearch from '../../../components/forms/LocalSearch.js';
function CategoryCreate() {
  const [loading,setLoading]=useState(false);
  const [name,setName]=useState("");
  const {user}=useSelector(state=>({...state}));

  const [categories,setCategories] =useState([]);
  //we are here using filter property
  //step 1
  const [keyword,setKeyword] = useState("");



  useEffect(()=>{
   loadCategories();
  },[])
  
  const loadCategories = ()=> getCategories().then(c=>setCategories(c.data)).catch(error=>console.log(error));

  const handleSubmit=(e)=>{

   e.preventDefault();
   setLoading(true);
   createCategory({name},user.token).then(res=>{console.log(res.data.name);setLoading(false);setName("");toast.success(`${res.data.name} is created`)
  loadCategories()}).catch(err=>{setLoading(false) ;
    console.log(err)
   toast.error(err.response.data)})
   console.log(name)
  }
  const handleRemove = async(slug)=>{
    if(window.confirm("Delete?")){
      setLoading(true)
      removeCategory(slug,user.token).then((res)=>{setLoading(false);
      toast.success(`${res.data.deleted.name}
      deleted`)
    loadCategories()}).catch(err=>{console.log(err);toast.err(err);setLoading(false)})
    }
  
  }
  //step 3

 //step 4
 const searched = (keyword) =>(c)=>c.name.toLowerCase().includes(keyword);
 

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                <AdminNav/>
            </div>
            <div className='col'>
               {loading?<h4>Loading...</h4> :<h4>Create Category</h4>}
                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                {/* step 2 */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                <hr/>
                {/* step 5 */}
                {categories.filter(searched(keyword)).map((c)=>(<div key={c._id} className='alert alert-secondary'>{c.name}
                <span className='btn btn-sm float-right' onClick={()=>handleRemove(c.slug)}><DeleteOutlined className='text-danger'/></span> <Link to={`/current-admin/category/${c.slug}`}>
                  <span className='btn btn-sm float-right'>
                  <EditOutlined className="text-warning"/>
                  </span>
                  </Link></div>))}
            </div>
        </div>
    </div>
  );
}

export default CategoryCreate;