const mongoose = require('mongoose');
const { string } = require('zod');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firtName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        requierd:true,
    },
    password:{
        type:String,
        requied:true,
        min: 6,
    }
},{
    timestamps:true})



    const user = mongoose.model("User",userSchema);

    module.exports = User;
