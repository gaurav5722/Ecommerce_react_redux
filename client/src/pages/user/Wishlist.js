import React,{useState,useEffect} from "react";
import { getWishlist,removeWhislist } from "../../functions/user";
import {useSelector ,useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import {toast} from 'react-toastify'
import {DeleteOutlined} from '@ant-design/icons'
const Wishlist=()=>{
    const [wishlist,setWishlist] = useState([]);
    const {user} = useSelector((state)=>({...state}));

 useEffect(()=>{
    loadWishlist();
 },[])
 const loadWishlist = ()=>getWishlist(user.token).then(res=>{
    console.log(res.data);
    setWishlist(res.data.wishlist)
 })
 const handleRemove =(productId)=>{
    removeWhislist(productId,user.token).then(res=>{
       toast.success('successfully removed from the wishlist')
        loadWishlist();
    })
 }
   return( <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav/>
            </div>
            <div className="col"><h4>WishList</h4>
            {wishlist.map((p)=>{
                return(<div key={p._id} className="alert alert-secondary">
                    <Link to={`/product/${p.slug}`}>{p.title}</Link>
                    <span className="btn btn-sm float-right" onClick={()=>handleRemove(p._id)}><DeleteOutlined className="text-danger"/></span>
                </div>)
            })}
            </div>
        </div>
    </div>)
}
export default Wishlist