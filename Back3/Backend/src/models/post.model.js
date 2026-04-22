const mongoose = require("mongoose");

// db structure defined
const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
})

// db collection created
const postModel = mongoose.model("post",postSchema);

module.exports = postModel;