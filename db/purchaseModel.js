const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const purchase = new Schema ({
    courseId : ObjectId,
    userId : ObjectId,
    creatorId : ObjectId
})

const purchaseModel = mongoose.model("purchase",purchase);

module.exports = {
    purchaseModel
}