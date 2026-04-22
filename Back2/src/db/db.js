// logic behind connecting server to db 

const mongoose = require("mongoose");

async function connectDB(){

    await mongoose.connect("mongodb+srv://yt-back:0123456789@yt-compl-backend.gg0toau.mongodb.net/kanpri")    // connecting server to cluster/:DB_NAME     (#URI)

    console.log("connected to db");
}

module.exports = connectDB