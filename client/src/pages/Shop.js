import React,{useEffect,useState} from 'react';
import { getProductsByCount,fetchProductByFilter } from '../functions/product';
import { useSelector ,useDispatch} from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { DollarOutlined,DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import {getCategories} from '../functions/category';
import {getSubs} from '../functions/sub';
import {Menu,Slider,Checkbox,Radio} from 'antd';
import Star from '../components/forms/Star';

const Shop =()=>{
    const [products,setProducts] =useState([]);
    const [loading,setLoading] =useState(false);
    const [price,setPrice] =useState([0,0])
    const [ok,setOk] =useState(false);
    const [categories,setCategories] = useState([]);
    const [categoryIds,setCategoryIds] =useState([]);
    const [star,setStar]=useState("");
    const [subs,setSubs]=useState([]);
    const [sub,setSub] =useState('');
    const [brand ,setBrand]=useState()
    // const [brands,setBrands]=useState(["Apple","Samsung","Microsoft","Lenovo","Asus"]);
    const [shipping,setShipping] =useState('');
    const [colors,setColors]=useState(["Black","Brown","Yellow","Green"]);
    const [color,setColor]=useState("");
    let {search}= useSelector((state)=>({...state}));
    let {text} =search;
    let dispatch = useDispatch();
    const {SubMenu,ItemGroup} = Menu;
useEffect(()=>{
    loadAllProducts();
    //fetch categories
    getCategories().then(res=>setCategories(res.data))
    //fetch subcategories
    getSubs().then((res)=>setSubs(res.data));
},[])
//1.load products by default on page load
const loadAllProducts =()=>
{

    getProductsByCount(12).then((p)=>{
        setProducts(p.data);
        setLoading(false);
    })
}
//2.load products on user search input
useEffect(()=>{//we delay it by few second 
    const delayed= setTimeout(()=>{
        fetchProducts({query:text});
        if(!text){
            loadAllProducts();
        }
    },300)
return()=>clearTimeout(delayed);
},[text])

useEffect(()=>{
    //delay the request by using ok
console.log('ok to request');
fetchProducts({price});
},[ok]);
const fetchProducts = (arg)=>{
    fetchProductByFilter(arg).then((res)=>{
        console.log('fetching products',res.data)
        setProducts(res.data)})
}

//3.load products based on price range

const handleSlider =(value)=>{
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""},
    })
setPrice(value);
setCategoryIds([]);
setStar("");
setSub('');
setShipping('')
setBrand('')
setColor('')
setTimeout(()=>{
    setOk(!ok)
},300)
}
//4. load products based on Category
//show Categories in  a list of checkbox
const showCategories =()=>categories.map((c)=><div key={c._id}><Checkbox className='pb-2 pl-4 pr-4' value={c._id} name="category" onChange={handleCheck}checked={categoryIds.includes(c._id)}>{c.name}</Checkbox></div>)
//handle check for category
const handleCheck=(e)=>{
   //reset
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""},
    });
    setPrice([0,0])
    setBrand('');
    setShipping('')
    setColor('')
    setStar("");
   //console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked) //index , -1
    //indexOf method ?? if found returns -1 else returns index

    if(foundInTheState === -1)
    {
        inTheState.push(justChecked);
    }
    else{
        //if found pull out one item from index
        inTheState.splice(foundInTheState,1)//1 index and 1element to take out 
    }
   setCategoryIds(inTheState);
//    console.log(inTheState)
fetchProducts({category:inTheState});
}
const handleStarClick=(num)=>{
    // console.log(num)
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""},
    });
    setPrice([0,0]);
    setCategoryIds([]);
    setStar(num);
    setBrand('')
    setColor('')
    setShipping('')
    fetchProducts({stars:num})
}
//7. show products based on brand name
// const showBrands=()=>brands.map((b)=><div key={b}><Radio value={b} name={b} checked={b === brand} onChange={handleBrand} className="pb-1 pl-1 pr-4">{b}</Radio></div>)
 
// const handleBrand=(e)=>{
//     setSub('')
//     dispatch({
//         type:"SEARCH_QUERY",
//         payload:{text:""},
//     });
//     setPrice([0,0]);
//     setCategoryIds([]);
//     setStar('');
//     setShipping('')
//     setColor('')
//     setBrand(e.target.value)
//     fetchProducts({brand:e.target.value});
// }

const showStars=()=>(
   
    <div className='pr-4 pb-2 pt-4 pl-4'> 
        <Star starClick={handleStarClick} numberOfStars={5}/>
        <Star starClick={handleStarClick} numberOfStars={4}/>
        <Star starClick={handleStarClick} numberOfStars={3}/>
        <Star starClick={handleStarClick} numberOfStars={2}/>
        <Star starClick={handleStarClick} numberOfStars={1}/>
    </div>
)
//6.show product by shubcategories
const showSubs=()=>subs.map((s)=><div  key={s._id}
 onClick={()=>handleSub(s)} className='p-1 m-1 badge badge-secondary' style={{cursor:'pointer'}}>{s.name}</div>)
const handleSub = (sub) =>{
    console.log('SUB',sub);
    setSub(sub)
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""},
    });
    setPrice([0,0]);
    setCategoryIds([]);
    setStar('');
    setBrand('')
    setColor('')
    fetchProducts({sub})
}
const showColors=()=>colors.map((c)=>(<Radio value={c} name={c} checked={c===color} onChange={handleColor} className='pb-1 pt-4 pr-4' key={c}>
    {c}
</Radio>));
const handleColor=(e)=>{
    console.log('Color',color);
    setSub('')
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""},
    });
    setPrice([0,0]);
    setCategoryIds([]);
    setStar('');
    setShipping('');
    setBrand('')
    setColor(e.target.value)
    fetchProducts({color:e.target.value});
}
// 9.Show products based on shipping (yes/no)
const showShipping=()=>(
    <>
    <Checkbox className='pb-2 pl-4 pr-4' onChange={handleShippingChange} value="yes" checked={shipping==="yes"}>
        Yes
    </Checkbox>
    <Checkbox className='pb-2 pl-4 pr-4' onChange={handleShippingChange} value="no" checked={shipping==="no"}>No</Checkbox>
    </>

)
const handleShippingChange=(e)=>{
   console.log(e.target.value)
    setSub('')
    dispatch({
        type:"SEARCH_QUERY",
        payload:{text:""},
    });
    setPrice([0,0]);
    setCategoryIds([]);
    setStar('');
    setBrand('')
    setColor('')
    setShipping(e.target.value)
    fetchProducts({shipping:e.target.value});
}
return(
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3 pt-2'>
                <h4>Search/Filter</h4>
                <hr/>
                <Menu  defaultOpenKeys={['1','2','3','4','5','6','7']} mode='inline'>
                    <SubMenu key="1" title={<span className='h6'>₹ Price</span>}>
                        {/* price */}
                       <div className=''>
                        <Slider className='ml-4 mr-4' tipFormatter={(v)=>`$ ${v}`} range 
                        value={price} onChange={handleSlider} max={4999}/>
                       </div>
                    </SubMenu>
                    {/* category */}
                    <SubMenu key="2" title={<span className='h6'>
                        <DownSquareOutlined/>Categories</span>}>
                       <div className='mt-1'>
                        {showCategories()}
                       </div>
                    </SubMenu>
                    {/* stars */}
                    <SubMenu key="3" title={<span className='h6'>
                        <StarOutlined/> Rating</span>}>
                       <div className='mt-1pl-4'>
                        {showStars()}
                       </div>
                    </SubMenu>
                    {/* sub categories */}
                    <SubMenu key="4" title={<span className='h6'>
                        <DownSquareOutlined/>
                        Sub Categories</span>}>
                       <div className='mt-1 pl-4 pr-4'>
                        {showSubs()}
                       </div>
                    </SubMenu>
                     {/* Brands */}
                     {/* <SubMenu key="5" title={<span className='h6'>
                        <DownSquareOutlined/>
                        Brands</span>}>
                       <div className='mt-1 pr-5 pl-2'>
                        {showBrands()}
                       </div>
                    </SubMenu> */}
                    {/* colors */}
                    <SubMenu key="6" title={<span className='h6'>
                        <DownSquareOutlined/>
                        Colors</span>}>
                       <div className='mt-1 pr-5 pl-2'>
                        {showColors()}
                       </div>
                    </SubMenu>
                    {/* shipping */}
                    <SubMenu key="7" title={<span className='h6'>
                        <DownSquareOutlined/>
                        Shipping</span>}>
                       <div className='mt-1 pr-5 pl-2'>
                        {showShipping()}
                       </div>
                    </SubMenu>
                </Menu>
            </div>
            <div className='col-md-9 pt-2'>
                {loading?(<h4 className='text-danger'>Loading...</h4>):(<h4 className='text-danger'>Products</h4>)}
                {products.length < 1 && <p>No Products find</p>}
                <div className='row'>
                    {products.map((p)=>(
                        <div key={p._id} className='col-md-4 mt-3'>
                            <ProductCard product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
}
export default Shop;