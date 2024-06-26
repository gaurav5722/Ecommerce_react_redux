import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import {getOrders,changeStatus} from '../../functions/admin.js';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Orders from '../../components/order/Orders.js';

function AdminDashboard() {
  const [orders,setOrders] = useState([]);
  const {user} = useSelector((state)=>({...state}))
  useEffect(()=>{
    loadOrders();
  },[])  

  const loadOrders = ()=>{
    getOrders(user.token).then((res)=>{
      console.log(JSON.stringify(res.data,null,4));
      setOrders(res.data);}).catch(err=>console.log(err));
    }
    const handleStatusChange=(orderId,orderStatus)=>{
        changeStatus(orderId,orderStatus,user.token).then((res)=>{
          console.log('response is',res.data);
          toast.success('status updated',res.data.orderStatus)
          loadOrders();
        })
    }
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                <AdminNav/>
            </div>
            <div className='col'>
            Admin Dashboard
            {/* {JSON.stringify(orders)} */}
            <Orders orders={orders} handleStatusChange={handleStatusChange}/>
            </div>
        </div>
    </div>
  );
}

export default AdminDashboard
