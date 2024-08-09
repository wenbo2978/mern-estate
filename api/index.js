import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from './routes/user-route.js';
import authRouter from './routes/auth-route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
//console.log("Mongo:"+process.env.MONGO_URL);
app.use(express.json());


//get info from cookie
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('connect to MongoDB');
}).catch((err)=>{
  console.log('err: ' + err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!!!');
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

//Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});