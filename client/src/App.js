import React ,{useEffect}from "react";

import { Routes, Route} from "react-router-dom";
import SideDrawer from "./components/drawer/SideDrawer";

// import { Switch, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/nav/header"
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {auth} from './firebase';
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/Category/CategoryCreate";
import CategoryUpdate from "./pages/admin/Category/CategoryUpdate";
import SubCreate from "./pages/admin/Sub/SubCreate";
import SubUpdate from "./pages/admin/Sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import CheckOut from "./pages/Checkout";
import Shop from "./pages/Shop";
import CreateCouponPage from "./pages/coupon/CreateCouponPage";
import Payment from "./pages/Payment";
import SellerRoute from "./components/routes/SellerRoute";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerCreateProduct from "./pages/seller/SellerCreateProduct.js";
import SellerAllProducts from "./pages/seller/SellerAllProducts.js";
import SellerUpdateProduct from "./pages/seller/SellerUpdateProduct.js";
import VerifySellerOrders from "./pages/admin/verifySeller/VerifySellerOrders.js";

const App = () => {
  const dispatch=useDispatch();
useEffect(()=>{
  const unsubcribe = auth.onAuthStateChanged(async (user)=>{
    if(user){
      const idTokenResult=await user.getIdTokenResult();
      console.log("user",user);
      currentUser(idTokenResult.token)
      .then((res) =>
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          },
        })
      )
      .catch((err)=>console.log(err));
    }
  });
  return()=>unsubcribe();
},[])
  return (
    <>
    <Header/>
      <SideDrawer/>
      <ToastContainer/>
      <Routes>
        <Route path="/checkout" element={<CheckOut/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete/>}/>
        <Route path="/forgot/password" element={<ForgotPassword/>}/>
        <Route path='/product/:slug' element={<Product />}/>
        <Route path='/category/:slug' element={<CategoryHome/>}/>
        <Route path="/sub/:slug" element={<SubHome/>}/>
        <Route path="/admin/dasboard" element={<Login/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
        {/* user routes */}
        <Route path="/user" element={<PrivateRoute/>}>
        <Route path="history" element={<History/>}/>
        <Route path="password" element={<Password/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="payment" element={<Payment/>}/>
        </Route>  
        {/* admin routes */}
        <Route path="/current-admin" element={<AdminRoute/>}>
        <Route path="verify" element={<VerifySellerOrders/>}/>
        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="category" element={<CategoryCreate/>}/>
        <Route path="category/:slug" element={<CategoryUpdate/>}/>
        <Route path="sub" element={<SubCreate/>}/>  
        <Route path="sub/:slug" element={<SubUpdate/>}/>
        <Route path="product" element={<ProductCreate/
        >}/>
        <Route path="coupon" element={<CreateCouponPage/>}/>
        <Route path="products"element={<AllProducts/>}/>
        <Route path="product/:slug" element={<ProductUpdate/>}/>
        
        </Route>
        {/* seller */}
        <Route path="/seller" element={<SellerRoute/>}>
          <Route path="history" element={<SellerDashboard/>}/>
          <Route path="profile" element={<SellerProfile/>}/>
          <Route path="create-products" element={<SellerCreateProduct/>}/>
          <Route path="all-products" element= {<SellerAllProducts/>}/>
          <Route path="product/:slug" element={<SellerUpdateProduct/>}/>
        </Route>
      </Routes>
    
 
    </>
  );
};

export default App;
