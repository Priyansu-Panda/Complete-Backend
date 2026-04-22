// server ko create karna
const express = require('express');

const app = express();

app.use(express.json())


/*
note ={
    title:
    descprition
}
const notes = [
    {
        title:"note1",
        descprition:"description1"
    },
    {
        title:"note2",
        descprition:"description2"
    }
]    // multiple notes 
*/

const notes = [];

app.get("/note",(req,res)=>{
    console.log("req.body", req.body);
    // res.send(notes);
    res.status(200).json({
        message:"Notes fetched successfully",
        AllNotes:notes
    })
})

app.get("/note/:ind", (req,res)=>{
    const id = req.params.ind;
    res.status(200).json({
        Note: notes[id]
    })
})

app.post("/note",(req,res)=>{
    // console.log(req.body);   // {"title":"21st Post","description":"created my 1st ever post"}
    notes.push(req.body);
    console.log(notes);
    
    res.status(201).json({
        message:"Note created successfully",
        note:req.body,
        AllNotes:notes
    })
    // res.send("Note Created");
})

/*
let {title,description} = req.body;
const note = req.body;
notes.push(note)
*/

app.delete("/note/:ind", (req,res)=>{
    // console.log(req.params.ind)  
    // console.log(req.params)  
    const index = req.params.ind;   
    // notes.splice(index,1);  
    delete notes[index]; 
    res.status(200).json({  
        message: "Note deleted successfully",   
        AllNotes:notes  
    })  
})  

app.patch("/note/:ind",(req,res)=>{
    const index = req.params.ind;
    console.log(req.body);

    const descprition = req.body.descprition;
    notes[index].descprition = descprition;
    
    res.status(200).json({
        message: "Note Updated Succesfully"
    })

})



// exported the server
module.exports = app;