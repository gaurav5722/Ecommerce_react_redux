import React from "react";
import { Link } from "react-router-dom";

const SellerNav =()=>(
    <nav>
         <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/seller/history" className="nav-link">History</Link>
            </li>
            <li className="nav-item">
                <Link to="/seller/all-products" className="nav-link">AllProducts</Link>
            </li>
            <li className="nav-item">
                <Link to="/seller/create-products" className="nav-link">CreateProducts</Link>
            </li>
            <li className="nav-item">
                <Link to="/seller/profile" className="nav-link">
                    Profile
                </Link>
            </li>
            
         </ul>
    </nav>
)

export default  SellerNav ;