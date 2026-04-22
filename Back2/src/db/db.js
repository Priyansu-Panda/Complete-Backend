// logic behind connecting server to db 

const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect(process.env.DB_URI)    // connecting server to cluster/:DB_NAME     (#URI)

    console.log("connected to db");
}

module.exports = connectDB