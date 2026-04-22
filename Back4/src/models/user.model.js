const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel

// mongoose -> Schema Structure -> model -> exports 