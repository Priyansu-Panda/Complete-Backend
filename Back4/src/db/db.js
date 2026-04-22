const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database connected successfully")
    }
    catch(e){
        console.log(`Error in connecting : `,e)
    }
}

module.exports = connectDB;