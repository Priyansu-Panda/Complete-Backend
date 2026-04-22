const express = require('express');
const cors = require('cors');
const multer = require("multer");
const uploadFile = require("./services/storage.service")
const postModel = require("./models/post.model")

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})


app.post("/create-post", upload.single("image"), async (req,res)=>{
    // console.log(req.file)    // contains buffer
    // console.log(req.body)

    const result = await uploadFile(req.file.buffer)
    // console.log(result)  // contains urls

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption 
    })

    return res.status(201).json({
        message: "Post created Successfuly ",
        post

    })
})

app.get("/posts", async (req,res)=>{
    const posts = await postModel.find();

    res.status(201).json({
        message:"Posts fetched succesfully",
        posts
    })
})



module.exports = app;