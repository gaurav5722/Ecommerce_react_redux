import express from 'express'

import  {authCheck,adminCheck} from  '../middlewares/auth.js'
const router = express.Router();

import {orders,orderStatus,getSellerProducts,changeSellerProductStatus} from '../controllers/admin.js';

//routes

router.get('/admin/orders',authCheck,adminCheck,orders);
router.put('/admin/order-status',authCheck,adminCheck,orderStatus);
router.post('/admin/sellerproducts',authCheck,adminCheck,getSellerProducts);
router.put('/admin/seller/order-status',authCheck,adminCheck,changeSellerProductStatus);

export default router;