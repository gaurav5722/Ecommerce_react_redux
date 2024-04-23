import express from 'express'
import {createOrUpdateUser,currentUser,LoginUser,CheckingEmail} from '../controllers/auth.js';
import  {authCheck,adminCheck} from  '../middlewares/auth.js'
const router=express.Router();
 //middlewares
 const myMiddleware =(req,res,next)=>{
    console.log("I AM MIDDLEWARE");
    next();
 }
router.post('/create-or-update-user',myMiddleware,authCheck,createOrUpdateUser);
router.post('/loginUser',myMiddleware,authCheck,LoginUser);
router.post('/current-user',authCheck,currentUser);
router.get('/current-admin',authCheck,adminCheck,currentUser);
router.post('/loginEmail',CheckingEmail);
router.get('/testing',myMiddleware,(req,res)=>{
    res.json({
        data:"YOU SUCCESSFULLY TRIED MIDDLEWARE"
    })
});


export default router;