const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    stars : {
        type : Number,
        min : 1,
        max : 5,
        required : true,
    },
    comments : {
        type : String, 
        required : true,
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
});

module.exports = mongoose.model("Review" , reviewSchema);