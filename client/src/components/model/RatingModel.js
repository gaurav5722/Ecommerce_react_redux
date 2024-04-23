import React,{useState} from 'react';
import {Modal,Button} from 'antd';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate ,useParams} from 'react-router-dom';
const RatingModel= ({children})=>{
    const navigate =useNavigate();
    let {slug} =useParams();
 const {user}=useSelector((state)=>({...state}));
 const [modelVisible,setModalVisible]=useState(false);
 const handleModel =()=>{
    if(user && user.token)
    {
       setModalVisible(true)
    }else{
       navigate('/login',
    {state:{from:`/product/${slug}`}});
    }
 }
 return(
    <>
    <div onClick={handleModel}>
        <StarOutlined className='text-danger'/>
        <br/>{" "}
        {user?"Leave Rating":"Login to leave rating"}
    </div>
    <Modal
    title="Leave your rating"
    centered
    visible={modelVisible}
    onOk={()=>{
        setModalVisible(false);
        toast.success("Thanks for your review. It will appear soon")
    }}
    onCancel={()=>setModalVisible(false)}>
       {children}
    </Modal>
    </>
 )
}
export default RatingModel;