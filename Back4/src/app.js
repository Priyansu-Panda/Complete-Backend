const express = require("express")
const authRoutes = require("./routes/auth.routes")  //impoted the router exported in the routes file
const cookieParser = require("cookie-parser")

const postRoutes = require("./routes/post.routes")

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes)     // prefix + routes   

app.use("/api/posts",postRoutes)


module.exports = app;