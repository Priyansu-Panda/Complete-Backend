require("dotenv").config()           
const app = require("./src/app");
const connectDB = require("./src/db/db")



// connectDB()
// app.listen(process.env.PORT,()=>{
//     console.log(`Server is running on port ${process.env.PORT}`)
// })

connectDB()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err)=>{
        console.log(`Error in connecting : `,err)
    })