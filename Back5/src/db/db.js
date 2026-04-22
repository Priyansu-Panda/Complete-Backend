const mongoose = require("mongoose")


async function dbConnect(){
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("Database connected successfully");
    }
    catch(e){
        console.log("Database connection err ",e);
        process.exit(1)
    }
}

module.exports = dbConnect