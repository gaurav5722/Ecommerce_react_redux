import express from 'express'
import {create,remove,list} from '../controllers/coupon.js';
import  {authCheck,adminCheck} from  '../middlewares/auth.js'
const router=express.Router();
 //middlewares

router.post('/coupon',authCheck,adminCheck,create);
router.get('/coupons',list);

router.delete('/coupons/:couponId',authCheck,adminCheck,remove);


export default router;