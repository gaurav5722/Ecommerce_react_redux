import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';//we not need to install filesystem 
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import category from './routes/category.js'
import sub from './routes/sub.js'
import product from './routes/product.js'
import user from './routes/user.js'
import cloudinary from './routes/cloudinary.js'
import coupon from './routes/coupon.js';
import stripe from './routes/stripe.js'
import admin from './routes/admin.js'
import seller from './routes/seller.js'
// import * as name from "./routes/";
dotenv.config();
//import routes

//require('dotenv').config();

//app
const app=express();
//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,    useUnifiedTopology: true,
    family: 4,
}).then(()=>console.log("DB CONNECTED")).catch(error=>console.log(`DB CONNECTION ERROR ${error}`));

//middlewares
//use method is used to use the middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors())
//routes middleware
app.use('/api',stripe);
app.use('/api',coupon)
app.use('/api',user)
app.use('/api',authRoutes)
app.use('/api',category)
app.use('/api',sub)
app.use('/api',product)
app.use('/api',cloudinary)
app.use('/api',admin);
app.use('/api',seller)
// app.use('/api/user',userRoutes);
//fs.readdirSync('./routes').map((r)=>app.use("/api",`${name}+${r}`))
//now we are using the api

//port
const port = process.env.PORT||8000;
app.listen(port,()=>console.log(`Server is running on port ${port}`));