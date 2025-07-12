const mongoose = require('mongoose');
const { string } = require('zod');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requierd: true,
        unique: true
    },
    password: {
        type: String,
        requied: true,
        min: 6,
    }
}, {
    timestamps: true
})



const User = mongoose.model("User", userSchema);

module.exports = User;
