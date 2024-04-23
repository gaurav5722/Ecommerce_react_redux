import express from 'express'

import  {authCheck,sellerCheck} from  '../middlewares/auth.js'
import {createSellerProduct,getSellerProductByCount,deleteSellerProduct,getSellerProduct,updateSellerProduct} from '../controllers/sellerProduct.js'
const router = express.Router();

import {currentUser} from '../controllers/auth.js';

//routes

router.get('/seller',authCheck,sellerCheck,currentUser);
router.post('/sellerProduct',authCheck,sellerCheck,createSellerProduct);
router.post('/sellerProducts/:count',getSellerProductByCount)
router.delete('/sellerProduct/:slug',deleteSellerProduct)
router.get('/sellerproduct/:slug',
getSellerProduct)
router.put('/sellerproduct/:slug',updateSellerProduct);

export default router;