// server.js -> server ko start karna 

const app = require("./src/app");
const connectDB = require("./src/db/db");




connectDB()

app.listen(3000,()=>{
    console.log("runnonh on PORT : 3000")
})