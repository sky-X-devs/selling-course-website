const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OjbectId = mongoose.Types.ObjectId;

const courseSchema = new Schema ( {
    title:{
        require:true,
        type:String,
    },
    description:{
        require:true,
        type:String,
    },
    price:{
        require:true,
        type:Number
    },
    imageUrl:{
        require:true,
        type:String
    },
    creatorId:OjbectId
})
const courseModel = mongoose.model("course",courseSchema);
module.exports = { 
    courseModel
}