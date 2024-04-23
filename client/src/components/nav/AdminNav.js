import React from "react";
import { Link } from "react-router-dom";

const AdminNav =()=>(
    <nav>
         <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/current-admin/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link to="/current-admin/product" className="nav-link">Product</Link>
            </li>
            <li className="nav-item">
                <Link to="/current-admin/products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
                <Link to="/current-admin/category" className="nav-link">Category</Link>
            </li>
            <li className="nav-item">
                <Link to="/current-admin/sub" className="nav-link">Sub-Category</Link>
            </li>
            <li className="nav-item">
                <Link to="/current-admin/coupon" className="nav-link">Coupons</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/password" className="nav-link">Password</Link>
            </li>
            <li className="nav-item">
                <Link to="/current-admin/verify">
                    VerifySellerOrders
                </Link>
            </li>
         </ul>
    </nav>
)

export default AdminNav;