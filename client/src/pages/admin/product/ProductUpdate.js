import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProduct ,updateProduct } from "../../../functions/product.js";
import {getCategories,getCategorySubs} from '../../../functions/category.js';
import FileUpload from "../../../components/forms/FileUpload.js";
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm.js";


import { useParams,useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  // categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black","Black","Yellow","Green","Red"],
  // brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};
const ProductUpdate = () => {
  //state
  const [values,setValues]=useState(initialState);
  const navigate=useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const {slug}=useParams();
  const [subOptions,setsubOptions]=useState([])
  const [showSub,setShowSub] =useState(false);
  const [categories,setCategories] =useState([]);
  const [arrayOfSubs,setArrayOfSubIds]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState("");
  const [loading,setLoading] =useState(false);
  useEffect(()=>{
    loadProduct()
    loadCategories()
  },[])

  const loadProduct=()=>{
    getProduct(slug).then((p)=>{
      // console.log('single product',p)
      //1. load single product
      setValues({...values,...p.data});
      //2. load single product category subs
      getCategorySubs(p.data.category._id).then((res)=>{
        setsubOptions(res.data); //on first load show default categories

      });
      //3. Prepare array of sub ids to show as default sub values in antd Select
      let arr=[];
      p.data.subs.map(s=>{
        arr.push(s._id)
      });
      console.log("Array ",arr)
      setArrayOfSubIds((prev)=>arr); //required for ant design to work
    })
  }
  const loadCategories = ()=>{
    getCategories().then((c)=>
    {
    setValues({...values,categories:c.data});
    setCategories(c.data)
    }
).catch((error)=>
{
  console.log(error);
  toast.error(error)})
};

  const handleCategoryChange=(e)=>{
    e.preventDefault();
    console.log("Previous category",values.category._id)
    console.log('Clicked Category',e.target.value);
    setValues({...values,subs:[]});
    
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res)=>{
      console.log(res.data)
      console.log("Sub Options On Category Click",res.data)
      // if user clicks back to the original category
      // show its sub categories in default
      if(values.category._id === e.target.value)
       { 
        console.log("you have loaded the previous products")
        loadProduct()
       }
       //clear old sub category ids
       setsubOptions(res.data);
      // toast.success(res.data,'set the sub category')
      // setShowSub(true)
      // console.log(showSub)
      setArrayOfSubIds([])

    }).catch((err)=>{
      console.log(err);
      toast.error(err)
    })
    
  }


  const handleSubmit =(e)=>{
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory?selectedCategory:values.category;
    updateProduct(slug,values,user.token).then((res)=>{
      setLoading(false);
      console.log('successfully updated',res)
      toast.success(`${res.data.title} is updated`);
      navigate('/current-admin/products')

    }).catch(err=>{
      console.log(err);
      toast.error(err);
      setLoading(false);
    })

  }
 const handleChange=(e)=>{
  setValues({ ...values, [e.target.name]: e.target.value });

 }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
        {loading?(<LoadingOutlined  className="text-danger" h1/>):(<h4>product Update </h4>)}
         <br/>
         <div className="p-3">
            <FileUpload values={values}
             setValues={setValues} setLoading={setLoading}/>
         </div>
         <br/>
         <ProductUpdateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} setValues={setValues} handleCategoryChange={handleCategoryChange}setShowSub={setShowSub} setsubOptions={setsubOptions}showSub={showSub} subOptions={subOptions} categories={categories}
         arrayOfSubs ={arrayOfSubs}
         setArrayOfSubIds={setArrayOfSubIds}
         selectedCategory={selectedCategory}
        />
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
