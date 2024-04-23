import express from 'express'
import {create,read,update,remove,list} from '../controllers/sub.js';
import  {authCheck,adminCheck} from  '../middlewares/auth.js'
const router=express.Router();
 //middlewares

router.post('/sub',authCheck,adminCheck,create);
router.get('/subs',list);
router.get('/sub/:slug',read);
router.put('/sub/:slug',authCheck,adminCheck,update);
router.delete('/sub/:slug',authCheck,adminCheck,remove);


export default router;