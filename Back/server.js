// server ko start karna hai
const app = require("./src/app.js") // contain intsance f server

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


// 0123456789