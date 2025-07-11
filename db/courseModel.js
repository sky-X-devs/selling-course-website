const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const course = new Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number
    },
    imageUrl: {
        required: true,
        type: String
    },
    creatorId: ObjectId
});

const courseModel = mongoose.model("course", course);

module.exports = {
    courseModel
};
