import express from 'express';
import {upload,remove} from '../controllers/cloudinary.js'
const router=express.Router();

//middleware
import {authCheck,adminCheck} from '../middlewares/auth.js';
// router.post('/uploadimages',authCheck,adminCheck,upload);
// router.post('/removeimage',authCheck,adminCheck,remove);
router.post('/uploadimages',authCheck,upload);
router.post('/removeimage',authCheck,remove);

export default router;