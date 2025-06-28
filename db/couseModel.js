const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./userModel');

const courseSchema = new Schema ( {
    title:{
        require:true,
        type:String,
    },
    description:{
        require:true,
        type:String,
    },
    amount:{
        require:true,
        type:Number
    },
    imageUrl:{
        require:true,
        type:String
    },
    courseCreater:user._id
    
})