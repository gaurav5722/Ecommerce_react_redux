import React,{useEffect,useState} from 'react'
import SellerNav from '../../components/nav/SellerNav'
import ProductCreateForm from '../../components/forms/ProductCreateForm';
import FileUpload from '../../components/forms/FileUpload';
import { createSellerProduct } from '../../functions/Seller';
import {useSelector} from 'react-redux';
import { getCategories,getCategorySubs } from '../../functions/category';
import {toast} from 'react-toastify';
import {LoadingOutlined} from '@ant-design/icons'
const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black","Green","Red","Yellow","Orange"],
    // brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
    postedBy:"",
  };
const SellerCreateProduct = () => {
   
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const [subOptions,setsubOptions]=useState([])
    const [showSub,setShowSub] =useState(false);
    const [loading,setLoading] =useState(false);
    useEffect(()=>{
      loadCategories();
      values.postedBy=user._id;
      console.log("posted By Updated successfully",values.postedBy);
     },[])
  
     //seting the categories value
     const loadCategories = ()=> getCategories().then(c=>setValues({...values,categories:c.data})).catch(error=>console.log(error));
   
    const handleSubmit = (e) => {
      e.preventDefault();
      createSellerProduct(values, user.token,user._id)
        .then((res) => {
         console.log(res.data)
          window.alert(`"${res.data.title}" is created`)
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
           toast.error(err.response.data.error);
        });
      //
    };
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
  
      //
    };
    const handleCategoryChange=(e)=>{
      e.preventDefault();
      console.log('Clicked Category',e.target.value);
      setValues({...values,category:e.target.value,subs:[]});
      getCategorySubs(e.target.value).then((res)=>{
        console.log(res.data)
        console.log("Sub Options On Category Click",res.data)
        setsubOptions(res.data);
        toast.success(res.data,'set the sub category')
        setShowSub(true)
        console.log(showSub)
  
      }).catch((err)=>{
        console.log(err);
        toast.error(err)
      })
      
    }


  return (

    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
            <SellerNav/>
        </div>
        <div className='col-md-10'>
        {loading?(<LoadingOutlined  className="text-danger" h1/>):(<h4>product Create form</h4>)}
          <hr />
          <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          </div>
         
          <ProductCreateForm  handleChange={handleChange} handleSubmit={handleSubmit} handleCategoryChange={handleCategoryChange}
          values={values}
          subOptions={subOptions}
          showSub={showSub}
          setValues={setValues}

    />
        </div>
      </div>
    </div>
  )
}

export default SellerCreateProduct
