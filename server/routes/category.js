import express from 'express'
import {create,read,update,remove,list,getSubs} from '../controllers/category.js';
import  {authCheck,adminCheck} from  '../middlewares/auth.js'
const router=express.Router();
 //middlewares

router.post('/category',authCheck,adminCheck,create);
router.get('/categories',list);
router.get('/category/:slug',read);
router.put('/category/:slug',authCheck,adminCheck,update);
router.delete('/category/:slug',authCheck,adminCheck,remove);
router.get('/category/subs/:_id',getSubs);

export default router;