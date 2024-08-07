const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
//console.log("Mongo:"+process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('connect to MongoDB');
}).catch((err)=>{
  console.log('err: ' + err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!!!');
});