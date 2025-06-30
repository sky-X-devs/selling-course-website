const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');


app.use(express.json());
app.use('/user',userRouter);
app.use('/course',courseRouter);


app.listen(function(){
    mongoose.connect()
    console.log("server is acitve at port 3000")
},3000)