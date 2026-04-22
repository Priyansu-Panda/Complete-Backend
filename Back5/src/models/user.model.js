const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ["artist", "user"],
        default: "user"
    }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;