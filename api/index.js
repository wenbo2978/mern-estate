import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from './routes/user-route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
//console.log("Mongo:"+process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('connect to MongoDB');
}).catch((err)=>{
  console.log('err: ' + err);
});


app.use('/api/user', userRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000!!!');
});