// Load environment variables first
require('dotenv').config();

// app.js -> server ko create karna
const noteModel = require("./models/note.model")
const express = require("express");

const app = express();
app.use(express.json());

/*          APi
    Post /notes - create a note 
    get /notes - get all notes 
    get /notes/:id - get a notes 
    delete /notes/:id - delete a note
    patch /notes/:id - update a note
*/


app.post("/notes", async (req,res)=>{
    const data = req.body;  // data wont come until used a middleware- {express.json()}
    /*  {title, description} */
    
    // noteModel.create(data)
    await noteModel.create({
        title: data.title,
        description: data.description
    })
    
    res.status(201).json({
        message: "Note Created",
        Note: data
    })
})


app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find()  // returns []
    
    // const notes = await noteModel.findOne(
    // const notes = await noteModel.find(
    //     {
    //         title:"3rd Post"
    //     }
    // )  // returns []
    //  find => [{},{}] or []
    //  findOne => {} or NULL


    res.status(200).json({
        message: "Notes fetched !!",
        notes: notes,
    })
} )

app.delete("/notes/:ind", async (req,res)=>{
    const id = req.params.ind;
    
    // res.status(200).json({
    //     message: "Note deleted",
    //     Note: await noteModel.findOne({_id:id})
    // })
    const deletedNote = await noteModel.findOneAndDelete({
        _id : id
    })
    res.status(200).json({
        message: "Note deleted",
        Note: deletedNote
    })  
})

app.patch("/notes/:ind", async (req,res)=>{
    const id = req.params.ind;

    // console.log(req.body)   //  { description: '4rd Post' }
    // console.log(req.body.description)   //  4rd Post
    
    const descr = req.body.description;

    const updat = await noteModel.findOneAndUpdate({_id:id},{description:descr})

    if(!updat){
        res.status(400).json({
            message: "Note Absent",
            Note: updat
        }) 
    }
    res.status(200).json({
        message: "Note Updated",
        BNote: updat,
        ANote: (await noteModel.findById({_id:id})).description
    }) 
    
})

module.exports = app;