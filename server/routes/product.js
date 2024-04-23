import express from 'express'
import {create,listAll,remove,read,update,list,productsCount,productStar, listRelated,searchFilters} from '../controllers/product.js';
import  {authCheck,adminCheck} from  '../middlewares/auth.js'
const router=express.Router();
 //middlewares

router.post('/product',authCheck,adminCheck,create);
router.get('/products/total',productsCount);
router.get('/products/:count',listAll);
router.delete('/product/:slug',authCheck,adminCheck,remove);
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update);
router.post('/products',list)
//rating
router.put('/product/star/:productId',authCheck,productStar);
//related
router.get('/product/related/:productId',listRelated)
//search
router.post('/search/filters',searchFilters)
export default router;