const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');



app.use(express.json());
app.use('/user',userRouter);
app.use('/course',courseRouter);


mongoose.connect(process.env.MONGOOSE_URL)
.then(() => {
    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
        console.log("Server is active at port 3000");
    });
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});
