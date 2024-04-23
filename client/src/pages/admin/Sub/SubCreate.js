import React ,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import {getCategories} from '../../../functions/category.js';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm.js';
import LocalSearch from '../../../components/forms/LocalSearch.js';
import { createSub, removeSub ,getSub,getSubs} from '../../../functions/sub.js';
function SubCreate() {
  const [loading,setLoading]=useState(false);
  const [name,setName]=useState("");
  const {user}=useSelector(state=>({...state}));

  const [categories,setCategories] =useState([]);
  const [subs,setSubs] =useState([]);
  const [category,setCategory]=useState("")
  //we are here using filter property
  //step 1
  const [keyword,setKeyword] = useState("");



  useEffect(()=>{
   loadCategories();
   loadSubs();
  },[])
  
  const loadCategories = ()=> getCategories().then(c=>setCategories(c.data)).catch(error=>console.log(error));
  
  const loadSubs = ()=> getSubs().then(c=>setSubs(c.data)).catch(error=>console.log(error));

  const handleSubmit=(e)=>{

   e.preventDefault();
   setLoading(true);
   createSub({name,parent:category},user.token)
   .then((res)=>{
    console.log(res.data.name);
    setLoading(false);setName("");toast.success(`${res.data.name} is created`)
   loadSubs();
   }).catch((err)=>{setLoading(false) ;
    console.log(err)
   toast.error(err.response.data)})
   console.log(name)
  }
  const handleRemove = async(slug)=>{
    if(window.confirm("Delete?")){
      setLoading(true)
      removeSub(slug,user.token).then((res)=>{setLoading(false);
      toast.success(`${res.data.deleted.name}
      deleted`)
      loadSubs();
  }).catch(err=>{console.log(err);toast.err(err);setLoading(false)})
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
               {loading?<h4>Loading...</h4> :<h4>Create Sub Category</h4>}
               
                <div className='form-group'>
                    <label>Category</label>
                    <select name="category" className='form-control' onChange={(e)=>setCategory(e.target.value)}>
                        <option>Please Select Any Category</option>
                        {categories.length >0 && categories.map((c)=>
                        (<option value={c._id} key={c._id}>{c.name}</option>))}
                    </select>
                </div>

                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                {/* step 2 */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                <hr/>
                {/* step 5 */}
                {subs.filter(searched(keyword)).map((s)=>(<div key={s._id} className='alert alert-secondary'>{s.name}
                <span className='btn btn-sm float-right' onClick={()=>handleRemove(s.slug)}><DeleteOutlined className='text-danger'/></span> <Link to={`/current-admin/sub/${s.slug}`}>
                  <span className='btn btn-sm float-right'>
                  <EditOutlined className="text-warning"/>
                  </span>
                  </Link></div>))}

            </div>
        </div>
    </div>
  );
}

export default SubCreate;